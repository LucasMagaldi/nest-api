import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/value-objects/unique-entity-id";
import { Slug } from "./object-values/slug";
import { Optional } from "@/core/types/optional";

interface QuestionProps {
    authorId: UniqueEntityID
    bestAnswerId?: UniqueEntityID
    title: string
    content: string
    slug: Slug
    createdAt: Date
    updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
    static create(props: Optional<QuestionProps, 'createdAt'>, id: UniqueEntityID) {
        return new Question({
            ...props,
            createdAt: new Date()
        }, id)
    }
}