import QuestionTaker from "./question-taker/QuestionTaker"
import { CheckboxGridAnswer, MultipleChoiceGridAnswer, GeneralQuestionType, QuestionType, Survey } from "../../../../types/survey"

import { useState } from "react"
import Button from "../../../../components/common/Button"
import { useAlerts } from "../../../../components/alert/AlertsProvider"
import { AnswersMap, QuestionAnswer } from "../../../../types/answer"
import { useSurveyAnswersCache } from "../../../../hooks/useSurveysAnswersCache"

type SurveyTakerProps = {
    survey: Survey,
    onSubmit: (surveyId: string, answers: AnswersMap) => void
}

const SurveyTaker = ({ survey, onSubmit }: SurveyTakerProps) => {

    const { addAlert } = useAlerts()
    const { answers, updateAnswer, resetAnswers } = useSurveyAnswersCache(survey._id)
    const [invalidSubmit, setInvalidSubmit] = useState(false)

    const invalidQuestionsIds = survey.questions
        .filter((question) => question.required && !answers.has(question._id))
        .map((question) => question._id)

    const chooseAnswer = (questionId: string, answer: QuestionAnswer | undefined) => {
        const question = survey.questions.find(q => q._id === questionId);
        if (!question) return;

        if (answer === undefined) {
            updateAnswer(questionId, undefined);
        } else {
            switch (question.type) {
                case QuestionType.SINGLE_CHOICE:
                case QuestionType.TEXT:
                    updateAnswer(questionId, answer as string);
                    break;

                case QuestionType.MULTIPLE_CHOICE:
                    updateAnswer(questionId, answer as string[]);
                    break;

                case QuestionType.CHECKBOX_GRID:
                    updateAnswer(questionId, answer as CheckboxGridAnswer);
                    break;

                case QuestionType.MULTIPLE_CHOICE_GRID:
                    updateAnswer(questionId, answer as MultipleChoiceGridAnswer);
                    break;

                default:
                    break;
            }
        }
    };

    const handleSubmit = () => {
        if (invalidQuestionsIds.length > 0) {
            addAlert({
                id: crypto.randomUUID(),
                type: 'warning',
                message: 'Please fill all required questions.'
            })
            setInvalidSubmit(true)
        } else {
            setInvalidSubmit(false)
            onSubmit(survey._id, answers)
            resetAnswers()
        }
    }

    const clearForm = () => {
        resetAnswers();
    }

    return (
        <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto py-12 px-8 md:px-16 lg:px-32 flex">
            <div className="w-full bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8 overflow-auto">
                <div className="flex flex-col space-y-6 min-h-full">
                    <div className="border-b border-primary-300 pb-2">
                        <div className="flex items-center">
                            <h1
                                className="py-2 text-3xl md:text-4xl lg:text-5xl font-secondary font-bold flex-auto h-16 leading-none "
                            >
                                {survey.title || "Untitled Survey"}
                            </h1>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {survey.description !== undefined &&
                            <p className="transition-colors font-secondary py-2">
                                {survey.description}
                            </p>
                        }
                        <div className="flex items-center space-x-2 text-sm text-red-600">
                            <span className="text-xl font-bold">*</span>
                            <span>Indicates required question</span>
                        </div>
                    </div>

                    <div className="flex-grow flex-col items-center flex w-full space-y-8 py-6">
                        {survey.questions.map((question) => (
                            <QuestionTaker
                                onChooseAnswer={chooseAnswer}
                                error={invalidSubmit && invalidQuestionsIds.includes(question._id)}
                                key={`${question._id}-${survey._id}`}
                                question={{
                                    ...question,
                                    answer: answers.get(question._id)
                                } as GeneralQuestionType}
                            />
                        ))}

                        <div className="self-center py-4 space-x-4">
                            <Button onClick={handleSubmit}>
                                Submit
                            </Button>
                            <button
                                className="ml-auto hover:bg-primary-300 text-primary-600 rounded cursor-pointer px-4 py-2 bg-primary-200"
                                onClick={clearForm}
                            >
                                Clear form
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SurveyTaker