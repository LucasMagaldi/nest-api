import { randomUUID } from "crypto"

export class Answer {
    public id: string
    public content: string
    public authorId: string
    public questionId: string

    constructor(content: string, authorId: string, questionId: string, id?: string) {
        this.id = id ?? randomUUID()
        this.content = content
        this.authorId = authorId
        this.questionId = questionId
    }
}