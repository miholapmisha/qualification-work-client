import { Survey } from "./survey"

export type AssignId = {
    surveyId: string,
    userId: string
}

export type Assign = {
    assignedAt: Date
    survey: Survey,
    answers: number
}