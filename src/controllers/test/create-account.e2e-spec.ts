import { AppModule } from "@/app.module"
import { Test } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service"

describe('Create account', () => {

    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)

        await app.init()

        await prisma.user.create({
            data: {
                name: 'Lucas',
                email: "lucas.magaldi@hotmail.com",
                password: "1234576"
            }
        })
    })

    test('[POST] /accounts', async () => {
        const response = await request(app.getHttpServer()).post('/accounts').send({
            name: 'Lucas',
            email: "lucas.magaldii@hotmail.com",
            password: "1234576"
        })

        expect(response.statusCode).toBe(201)
    })
})