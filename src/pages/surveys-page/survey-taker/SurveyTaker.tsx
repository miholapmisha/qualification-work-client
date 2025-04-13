import { useParams } from "react-router-dom"
import QuestionTaker from "./question-taker/QuestionTaker"
import { CheckboxGrid, CheckboxGridAnswer, MultipleChoiceGrid, MultipleChoiceGridAnswer, MultipleChoiceQuestion, QuestionState, QuestionType, SingleChoiceQuestion, Survey, TextQuestion } from "../../../types/survey"
import { useState } from "react"
import Button from "../../../components/common/Button"
import { useAlerts } from "../../../components/alert/AlertsProvider"

const survey = {
    "_id": "4746ba75-904d-435b-84a6-b08f0b813c6b",
    "title": "Your Survey",
    "description": "Some description of survey",
    "questions": [
        {
            "_id": "636a763c-f046-4afc-9dc3-dfdc7bf5a17e",
            "questionText": "Some question",
            "type": "single_choice",
            "required": true,
            "options": [
                {
                    "_id": "e4104fa0-673c-46a4-850e-15fcc31e726d",
                    "text": "Option 1"
                },
                {
                    "_id": "787fba81-caa6-4047-a1f5-073cbda305fc",
                    "text": "Option 2"
                },
                {
                    "_id": "5b457491-0c77-46b4-b912-cce3e88692b4",
                    "text": "Option 3"
                },
                {
                    "_id": "194e418e-0018-4c9a-b319-c9cfefbaae47",
                    "text": "Option 4"
                }
            ]
        },
        {
            "_id": "4de319d5-0f39-4169-b184-bed7f7db022a",
            "questionText": "Some question",
            "type": "multiple_choice",
            "required": true,
            "options": [
                {
                    "_id": "e4104fa0-673c-46a4-850e-15fcc31e726d",
                    "text": "Option 1"
                },
                {
                    "_id": "787fba81-caa6-4047-a1f5-073cbda305fc",
                    "text": "Option 2"
                },
                {
                    "_id": "5b457491-0c77-46b4-b912-cce3e88692b4",
                    "text": "Option 3"
                },
                {
                    "_id": "194e418e-0018-4c9a-b319-c9cfefbaae47",
                    "text": "Option 4"
                }
            ]
        },
        {
            "_id": "4e2602bd-7ccf-4c70-a361-d4667eb15d4f",
            "questionText": "Some text question",
            "type": "text",
            "required": true,
            "options": [
                {
                    "_id": "2bd7dda5-a12b-4698-bb71-fc41cae4bcc2",
                    "text": "Option 1"
                }
            ]
        },
        {
            "_id": "2df80136-368f-42bb-b199-0430a57c3e48",
            "questionText": "",
            "type": "checkbox_grid",
            "required": false,
            "options": [
                {
                    "_id": "19b6f373-fae5-4266-9bf7-5c1a1a842ab7",
                    "text": "Option 1"
                },
                {
                    "_id": "cbd721d1-c2f5-4747-a2c7-9399efb16a80",
                    "text": "Option 2"
                },
                {
                    "_id": "8976efea-e144-407c-9ee1-3a54c03ce139",
                    "text": "Option 3"
                },
                {
                    "_id": "90a03eec-bd43-4504-9b8e-f313a3bcb9fd",
                    "text": "Option 4"
                },
                {
                    "_id": "ccf5a16f-71aa-4e1e-8da9-415df384852e",
                    "text": "Option 5"
                },
                {
                    "_id": "98613069-309b-4e73-b5ef-b4df094e9756",
                    "text": "Option 6"
                }
            ],
            "rows": [
                {
                    "_id": "cac0a41e-934a-438b-8367-fe98a8d0bd79",
                    "text": "Row 1"
                },
                {
                    "_id": "042e9178-8759-41f6-af06-c23c96a4519c",
                    "text": "Row 2"
                },
                {
                    "_id": "3e011c9a-f272-42b2-b96c-755f6d5df5ba",
                    "text": "Row 3"
                },
                {
                    "_id": "ac80dd08-d830-4fed-b835-bae3d8e22eb2",
                    "text": "Row 4"
                }
            ]
        },
        {
            "_id": "c7ce0a73-47e6-4424-baae-bca1d2e7ddce",
            "questionText": "Grid question",
            "type": "multiple_choice_grid",
            "required": true,
            "options": [
                {
                    "_id": "64f07e19-c642-4a20-9e58-11d77b879fd6",
                    "text": "Option 1"
                },
                {
                    "_id": "4a8ed8d6-68f6-4e1e-806c-8d0e3b33713c",
                    "text": "Option 2"
                },
                {
                    "_id": "91ed23e8-689b-428e-b933-99984c692b3e",
                    "text": "Option 3"
                },
                {
                    "_id": "74a0ab89-440f-41f7-8286-cbc30ecf174d",
                    "text": "Option 4"
                },
                {
                    "_id": "94251040-1ae0-402b-ad3c-fc0046cd742a",
                    "text": "Option 5"
                },
                {
                    "_id": "f5629405-27e0-4389-b667-500dda04be76",
                    "text": "Option 6"
                }
            ],
            "rows": [
                {
                    "_id": "d7f925d2-ba31-4fee-813a-4445836f8b38",
                    "text": "Row 1"
                },
                {
                    "_id": "0d80ecce-5534-4b33-a057-2e583b7f1acd",
                    "text": "Row 2"
                },
                {
                    "_id": "6dde69ed-7e67-45aa-8772-b2c1ec519f4e",
                    "text": "Row 3"
                },
                {
                    "_id": "7c9be8da-e2b9-40c0-9598-91c398dba09a",
                    "text": "Row 4"
                },
                {
                    "_id": "276f183c-5d76-49da-ad40-7a5b723bc5b3",
                    "text": "Row 5"
                },
                {
                    "_id": "ac7633f8-5ef0-4f36-846e-61cd5fd24044",
                    "text": "Row 6"
                }
            ]
        }
    ]
} as Survey

const SurveyTaker = () => {

    const { id } = useParams()

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
                            <QuestionTaker onChooseAnswer={chooseAnswer} error={invalidSubmit && invalidQuestionsIds.includes(question._id)} key={`${question._id}-${survey._id}`} question={question as QuestionState} />
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