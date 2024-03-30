import { AppModule } from "@/app.module"
import { Test } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service"
import { hash } from "bcryptjs"

describe('Authenticate user', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)

        await app.init()
        await prisma.user.create({
            data: {
                name: 'Lucas',
                email: "lucas.magaldi@hotmail.com",
                password: await hash("1234576", 8)
            }
        })
    })

    test('[POST] /session', async () => {
        const response = await request(app.getHttpServer())
            .post('/session')
            .send({
                email: "lucas.magaldi@hotmail.com",
                password: "1234576"
            })

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({
            access_token: expect.any(String)
        })
    })
})

