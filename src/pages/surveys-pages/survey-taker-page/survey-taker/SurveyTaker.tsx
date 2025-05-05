import QuestionTaker from "./question-taker/QuestionTaker"
import { CheckboxGrid, CheckboxGridAnswer, MultipleChoiceGrid, MultipleChoiceGridAnswer, MultipleChoiceQuestion, GeneralQuestionType, QuestionType, SingleChoiceQuestion, Survey, TextQuestion } from "../../../../types/survey"
import { useState } from "react"
import Button from "../../../../components/common/Button"
import { useAlerts } from "../../../../components/alert/AlertsProvider"

type SurveyTakerProps = {
    survey: Survey
}

const SurveyTaker = ({ survey }: SurveyTakerProps) => {

    const { addAlert } = useAlerts()
    const [surveyState, setSurveyState] = useState<Survey>(survey)
    const [invalidSubmit, setInvalidSubmit] = useState(false)
    const invalidQuestionsIds = surveyState.questions
        .filter((question) => question.required && !question.answer)
        .map((question) => question._id)

    const chooseAnswer = (questionId: string, answer: string | string[] | MultipleChoiceGridAnswer[] | CheckboxGridAnswer[] | undefined) => {

        const questionIndex = surveyState.questions.findIndex(
            (questionItem) => questionItem._id === questionId
        );
        if (questionIndex === -1) return;

        const question = surveyState.questions[questionIndex];
        const updatedSurvey = { ...surveyState };

        switch (question.type) {
            case QuestionType.SINGLE_CHOICE:
                updatedSurvey.questions[questionIndex] = {
                    ...question,
                    answer: answer as string,
                } as SingleChoiceQuestion;
                break;

            case QuestionType.MULTIPLE_CHOICE:
                updatedSurvey.questions[questionIndex] = {
                    ...question,
                    answer: answer as string[],
                } as MultipleChoiceQuestion;
                break;

            case QuestionType.TEXT:
                updatedSurvey.questions[questionIndex] = {
                    ...question,
                    answer: answer as string,
                } as TextQuestion;
                break;

            case QuestionType.CHECKBOX_GRID:
                updatedSurvey.questions[questionIndex] = {
                    ...question,
                    answer: answer as CheckboxGridAnswer[],
                } as CheckboxGrid;
                break;

            case QuestionType.MULTIPLE_CHOICE_GRID:
                updatedSurvey.questions[questionIndex] = {
                    ...question,
                    answer: answer as MultipleChoiceGridAnswer[],
                } as MultipleChoiceGrid;
                break;

            default:
                break;
        }

        setSurveyState(updatedSurvey);
    };

    const handleSubmit = () => {
        if (invalidQuestionsIds.length > 0) {
            addAlert({ id: crypto.randomUUID(), type: 'warning', message: 'Please fill all required questions.' })
            setInvalidSubmit(true)
        } else {
            setInvalidSubmit(false)
        }
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
                                {surveyState.title || "Untitled Survey"}
                            </h1>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {surveyState.description !== undefined &&
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

                        {surveyState.questions.map((question) => (
                            <QuestionTaker onChooseAnswer={chooseAnswer} error={invalidSubmit && invalidQuestionsIds.includes(question._id)} key={`${question._id}-${survey._id}`} question={question as GeneralQuestionType} />
                        ))}

                        <div className="self-center py-4 space-x-4">
                            <Button onClick={handleSubmit}>
                                Submit
                            </Button>
                            <button
                                className="ml-auto hover:bg-primary-300 text-primary-600 rounded cursor-pointer px-4 py-2 bg-primary-200"
                                onClick={() => {
                                    setSurveyState({
                                        ...surveyState,
                                        questions: surveyState.questions.map((question) => ({
                                            ...question,
                                            answer: undefined
                                        })),
                                    });
                                }}
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