import { Category } from "./category"
import { Survey } from "./survey"

export const COLORS = ['#4ade80', '#f87171', '#60a5fa', '#fbbf24', '#a78bfa', '#f472b6'];

export type AnalyticsData = {
    survey: Survey,
    categories?: Category[]
    analytics: AnalyticsResult
}

export type AnalyticsResult = {
    completed: number
    uncompleted: number
    questionsDistributions: QuestionDistibution[]
}

export type QuestionDistibution = {
    questionId: string
    answered: number
    unanswered: number
    analytics?: OptionDistribution[] | GridCheckboxAnalytics
}

export type GridCheckboxAnalytics = {
    mostSelectedColumn?: { _id: string, selectedCount: number }
    gridOptionsDistribution: GridOptionsDistribution[]
}

export type OptionDistribution = {
    _id: string
    percentage: number
    selectedCount: number
}

export type GridOptionsDistribution = {
    rowId: string;
    rowOptionsDistribution: OptionDistribution[]
}

export type OptionAnalisysData = {
    name: string,
    count: number,
    percentage: number,
    color: string
}

export type SurveyTextAnswers = {
    _id: string,
    questionText: string,
    answers: string[]
}