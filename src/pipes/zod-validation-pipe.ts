import { PipeTransform, BadRequestException } from '@nestjs/common';
import { env } from 'process';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown) {
        console.log(value)
        try {
            return this.schema.parse(value)
        } catch (error) {
            if (env.ENVIRONMENT = 'Development') console.log(error)
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    error,
                    message: "Validation Error",
                    statusCode: 400
                })
            }

            throw new BadRequestException('Validation failed');
        }
    }
}