import { Body, ConflictException, Controller, HttpCode, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthGuard } from "@nestjs/passport"
import { compare } from "bcryptjs"
import { Request } from "express"
import { PrismaService } from "src/prisma/prisma.service"
import { z } from "zod"

const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string()
})

type AuthenticateBody = z.infer<typeof authenticateBodySchema>

@Controller("/question")
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    async handler(@Req() request: Request) {
        console.log(request)
        return 'Ok'
    }
}