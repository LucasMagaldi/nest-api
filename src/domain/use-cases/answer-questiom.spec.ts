import { test } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"
import { AnswerRepository } from "../repositories/answer-repository"
import { Answer } from "../entities/answer"

const fakeAnswerRepository: AnswerRepository = {
    create: async (answer: Answer) => {
        return
    }
}

test('Create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
        content: 'Test', questionId: '1', instructorId: '1'
    })

    expect(answer.content).toBe('Test')
})