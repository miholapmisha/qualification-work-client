import { Category } from "./category"
import { Survey } from "./survey"

export const COLORS = [
    '#4ade80', '#f87171', '#60a5fa', '#fbbf24', '#a78bfa', '#f472b6',
    '#34d399', '#facc15', '#38bdf8', '#f472b6', '#818cf8', '#fb7185',
    '#fcd34d', '#fca5a5', '#c084fc', '#fbbf24', '#bef264', '#fda4af',
    '#5eead4', '#f9a8d4', '#a3e635', '#fca5a5', '#fbbf24', '#7dd3fc',
    '#fef08a', '#f87171', '#a7f3d0', '#f472b6', '#fcd34d', '#fca5a5',
    '#fbbf24', '#6ee7b7', '#f472b6', '#facc15', '#60a5fa', '#fbbf24',
    '#a78bfa', '#f472b6', '#f87171', '#4ade80', '#f59e42', '#6366f1',
    '#e879f9', '#f87171', '#fbbf24', '#38bdf8', '#f472b6', '#818cf8',
    '#fb7185', '#fcd34d', '#fca5a5', '#c084fc', '#fbbf24', '#bef264',
    '#fda4af', '#5eead4', '#f9a8d4', '#a3e635', '#fca5a5', '#fbbf24',
    '#7dd3fc', '#fef08a', '#f87171', '#a7f3d0', '#f472b6', '#fcd34d'
];

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