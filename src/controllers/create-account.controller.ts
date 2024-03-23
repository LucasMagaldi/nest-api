import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common"
import { hash } from "bcryptjs"
import { z } from "zod"
import { PrismaService } from "src/prisma/prisma.service"
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe"

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

type CreateAccountBody = z.infer<typeof createAccountBodySchema>

@Controller("/accounts")
export class CreateAccountController {
    constructor(private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handler(@Body() body: CreateAccountBody) {
        const { name, email, password } = body

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userWithSameEmail) throw new ConflictException('User with same e-mail address already exists.')
        const hashedPassword = await hash(password, 8)

        await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    }
}