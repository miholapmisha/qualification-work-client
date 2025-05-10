import { CheckboxGridAnswer, MultipleChoiceGridAnswer } from "./survey";

export type QuestionAnswer = string | string[] | CheckboxGridAnswer | MultipleChoiceGridAnswer

export type AnswersObject = {
    [questionId: string]: QuestionAnswer;
}

export type AnswersMap = Map<string, QuestionAnswer>