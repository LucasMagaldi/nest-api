import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ["query"]
        })
    }
    onModuleInit() {
        // throw new Error("Method not implemented.");
        return this.$connect()
    }
    onModuleDestroy() {
        //throw new Error("Method not implemented.");
        return this.$disconnect()
    }
}