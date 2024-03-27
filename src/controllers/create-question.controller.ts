import { Body, ConflictException, Controller, HttpCode, Post, Req, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthGuard } from "@nestjs/passport"
import { compare } from "bcryptjs"
import { Request } from "express"
import { CurrentUser } from "src/aurh/current-user-decorator"
import { TokenSchema } from "src/aurh/jwt-strategy"
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe"
import { PrismaService } from "src/prisma/prisma.service"
import { z } from "zod"

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string()
})

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>

@Controller("/question")
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ZodValidationPipe(createQuestionBodySchema))

export class CreateQuestionController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    async handler(
        @CurrentUser() user: TokenSchema,
        @Body() body: CreateQuestionBody,
    ) {
        const userId = user.sub
        const { title, content } = body

        await this.prisma.question.create({
            data: {
                authorId: userId,
                title,
                content,
                slug: this.convertToSlug(title)
            }
        })
    }

    private convertToSlug(title: string): string {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
    }
}