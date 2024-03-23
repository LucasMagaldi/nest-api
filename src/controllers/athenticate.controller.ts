import { Controller, HttpCode, Post } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"


@Controller("/session")
export class AuthenticateController {
    constructor(private jwt: JwtService) { }

    @Post()
    //@HttpCode(201)
    async handler() {
        const token = this.jwt.sign({ sub: "user-id" })

        return token
    }
}