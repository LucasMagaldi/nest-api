import { Body, ConflictException, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compare } from "bcryptjs"
import { PrismaService } from '@/prisma/prisma.service'
import { z } from "zod"

const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string()
})

type AuthenticateBody = z.infer<typeof authenticateBodySchema>

@Controller("/session")
export class AuthenticateController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    async handler(@Body() body: AuthenticateBody) {
        const { email, password } = body

        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!user) throw new UnauthorizedException('User credentials do not match')

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) throw new UnauthorizedException('User credentials do not match')

        const accessToken = this.jwt.sign({ sub: user.id })

        return { access_token: accessToken }
    }
}