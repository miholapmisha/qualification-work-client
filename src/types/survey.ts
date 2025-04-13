export type Survey = {
    _id: string,
    title: string,
    description?: string,
    questions: QuestionState[],
}

export type QuestionState = TextQuestion | SingleChoiceQuestion | MultipleChoiceQuestion | CheckboxGrid | MultipleChoiceGrid

export enum QuestionType {
    MULTIPLE_CHOICE = 'multiple_choice',
    SINGLE_CHOICE = 'single_choice',
    MULTIPLE_CHOICE_GRID = 'multiple_choice_grid',
    CHECKBOX_GRID = 'checkbox_grid',
    TEXT = 'text'
}

export interface BaseQuestion {
    _id: string
    questionText: string
    type: QuestionType,
    required: boolean
}

export interface TextQuestion extends BaseQuestion {
    type: QuestionType.TEXT
    answer?: string
}

export interface SingleChoiceQuestion extends BaseQuestion {
    type: QuestionType.SINGLE_CHOICE
    options: Option[],
    answer?: string
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: QuestionType.MULTIPLE_CHOICE
    options: Option[],
    answer?: string[]
}

export interface MultipleChoiceGrid extends BaseQuestion {
    type: QuestionType.MULTIPLE_CHOICE_GRID,
    rows: TableRow[],
    options: Option[],
    answer?: MultipleChoiceGridAnswer[]
}

export interface CheckboxGrid extends BaseQuestion {
    type: QuestionType.CHECKBOX_GRID,
    rows: TableRow[],
    options: Option[],
    answer?: CheckboxGridAnswer[]
}

export type TableColumns = {
    _id: string
    text: string
}

export type TableRow = {
    _id: string
    text: string
}

export type MultipleChoiceGridAnswer = {
    row: string,
    column: string,
}

export type CheckboxGridAnswer = {
    row: string,
    columns: string[],
}

export type Option = {
    _id: string
    text: string
}