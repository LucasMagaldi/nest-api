import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthGuard } from "@nestjs/passport"
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

export class CreateQuestionController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    async handler(
        @CurrentUser() user: TokenSchema,
        @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBody,
    ) {
        const userId = user.sub
        const { title, content } = body
        const slug = this.convertToSlug(title)

        await this.prisma.question.create({
            data: {
                authorId: userId,
                title,
                content,
                slug
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