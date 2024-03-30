import { AppModule } from "@/app.module"
import { Test } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service"
import { hash } from "bcryptjs"
import { JwtService } from "@nestjs/jwt"

describe('Create Question', async () => {
    let app: INestApplication
    let prisma: PrismaService
    let jwt: JwtService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        jwt = moduleRef.get(JwtService)

        app.init()
    })

    test('[POST] /question', async () => {
        const user = await prisma.user.create({
            data: {
                name: 'Lucas',
                email: "lucas.magaldi@hotmail.com",
                password: "1234576"
            }
        })

        const accessToken = jwt.sign({ sub: user.id })

        const response = await request(app.getHttpServer())
            .post('/question')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: "hahxsahxxa",
                content: "haxx-mdleshaha"
            })

        expect(response.statusCode).toBe(201)
    })

})