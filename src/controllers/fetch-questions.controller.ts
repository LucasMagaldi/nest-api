import { Controller, Get, HttpCode, Query } from "@nestjs/common"
import { PrismaService } from '@/prisma/prisma.service'
import { z } from "zod"

const pageQueryParametersSchema = z.object({
    page: z.string()
        .optional()
        .default('1')
})

type PageQueryParameters = z.infer<typeof pageQueryParametersSchema>


@Controller('/questions')
export class FetchQuestionsController {
    constructor(private prisma: PrismaService) { }

    @Get()
    @HttpCode(200)
    async Handler(@Query('page') queryParameter: PageQueryParameters) {
        const page = queryParameter == undefined ? 1 : Number(queryParameter)
        const skip = (page - 1) * 1

        return this.prisma.question.findMany({
            take: 1,
            skip,
            orderBy: { createdAt: 'desc' }
        })
    }
}