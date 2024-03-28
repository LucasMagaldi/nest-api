import { Controller, Get, HttpCode } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/questions')
export class FetchQuestionsController {
    constructor(private prisma: PrismaService) { }

    @Get()
    @HttpCode(200)
    async Handler() {
        return this.prisma.question.findMany({
            orderBy: { createdAt: 'desc' }
        })
    }
}