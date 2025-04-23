import { useMemo, useRef, useState } from "react"
import { GeneralQuestionType, QuestionType, SingleChoiceQuestion, Survey, SurveyPayload } from "../../../types/survey"
import { useEditable } from "../../../hooks/useEditable"
import QuestionForm from "./question-form/QuestionForm";
import InactiveEditableQuestion from "./inactive-question/InactiveEditableQuestion";
import EditDescriptionArea from "./EditDescriptionArea";
import Button from "../../../components/common/Button";
import { useAuth } from "../../../components/AuthProvider";

const getDefaultQuestion = () => {
    return {
        _id: crypto.randomUUID(),
        questionText: '',
        type: QuestionType.SINGLE_CHOICE,
        required: false,
        options: [
            { _id: crypto.randomUUID(), text: 'Option 1' },
        ]
    } as SingleChoiceQuestion
}

type SurveyFormProps = {
    surveyData?: Survey
    onSave: (survey: SurveyPayload) => void
}

const SurveyForm = ({ surveyData, onSave }: SurveyFormProps) => {

    const defaultQuestion = useMemo(() => getDefaultQuestion(), [])
    const { currentUser } = useAuth()

    const [surveyState, setSurveyState] = useState<SurveyPayload>(surveyData ? surveyData : {
        title: 'Your Survey',
        questions: [defaultQuestion],
        authorId: currentUser?._id || '',
    })



    const [editQuestionId, setEditQuestionId] = useState<string | null>(surveyState.questions[0]._id)

    const { editInputRef: editNameInputRef, edit, setEdit } = useEditable()
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null)
    const [editDescription, setEditDescription] = useState(false)

    const handleDescriptionBlur = () => {
        if (!descriptionInputRef.current) return

        const newValue = descriptionInputRef.current.value

        if (newValue === '') {
            setSurveyState(prevSurvey => ({ ...prevSurvey, description: undefined }))
        } else {
            setSurveyState(prevSurvey => ({ ...prevSurvey, description: newValue }))
        }

        setEditDescription(false);
    }

    const handleTitleBlur = () => {
        if (!editNameInputRef.current) return

        const newValue = editNameInputRef.current.value
        if (newValue === '') {
            setSurveyState(prevSurvey => ({ ...prevSurvey, title: 'Your Survey' }))
        } else {
            setSurveyState(prevSurvey => ({ ...prevSurvey, title: newValue }))
        }
        setEdit(false);
    }

    const updateQuestion = (question: GeneralQuestionType) => {
        const updateQuestions = surveyState.questions
        const updateIndex = surveyState.questions.findIndex(q => q._id === question._id)

        if (updateIndex === -1)
            return
        updateQuestions[updateIndex] = question
        setSurveyState(prev => ({
            ...prev,
            questions: updateQuestions
        }))
    }

    const handleAddDescription = () => {
        setSurveyState(prev => ({ ...prev, description: '' }));
        setEditDescription(true);
    }

    const handleAddQuestion = () => {
        const defaultQuestion = getDefaultQuestion()
        setSurveyState(prev => ({ ...prev, questions: [...prev.questions, defaultQuestion] }))
        setEditQuestionId(defaultQuestion._id)
    }

    const handleQuestionDelete = (questionId: string) => {
        setSurveyState(prev => ({
            ...prev,
            questions: prev.questions.filter(question => question._id !== questionId)
        }))

        const deleteQuestionIndex = surveyState.questions.findIndex(question => question._id === questionId)
        if (deleteQuestionIndex - 1 > 0) {
            setEditQuestionId(surveyState.questions[deleteQuestionIndex - 1]._id)
        } else {
            setEditQuestionId(surveyState.questions[0]._id)
        }
    }

    const handleQuestionCopy = (questionToCopy: GeneralQuestionType) => {

        const questionIndex = surveyState.questions.findIndex((q) => q._id === questionToCopy._id);

        if (questionIndex === -1) return;

        const copiedQuestion = {
            ...questionToCopy,
            _id: crypto.randomUUID(),
        };
        const updatedQuestions = [
            ...surveyState.questions.slice(0, questionIndex + 1),
            copiedQuestion,
            ...surveyState.questions.slice(questionIndex + 1),
        ];

        setEditQuestionId(copiedQuestion._id)

        setSurveyState((prev) => ({
            ...prev,
            questions: updatedQuestions,
        }));
    };

    return (
        <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto py-12 px-8 md:px-16 lg:px-32 flex">
            <div className="w-full bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8 overflow-auto">
                <div className="flex flex-col space-y-6 min-h-full">
                    <div className="border-b border-primary-300 pb-2">
                        <div className="flex items-center">
                            {edit ? (
                                <input
                                    onBlur={handleTitleBlur}
                                    ref={editNameInputRef}
                                    defaultValue={surveyState.title}
                                    className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold flex-auto outline-none border-b border-primary-400 h-16 leading-none focus:border-primary-600 transition-colors"
                                    placeholder="Survey Title"
                                />
                            ) : (
                                <h1
                                    onClick={() => setEdit(true)}
                                    className="hover:cursor-text py-2 text-3xl md:text-4xl lg:text-5xl font-secondary font-bold flex-auto h-16 leading-none hover:text-primary-600 transition-colors"
                                >
                                    {surveyState.title || "Untitled Survey"}
                                </h1>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        {surveyState.description !== undefined ? (
                            <div className="space-y-2">
                                <h2 className="text-gray-700 font-medium">Description</h2>
                                {editDescription || surveyState.description === '' ? (
                                    <EditDescriptionArea
                                        ref={descriptionInputRef}
                                        defaultValue={surveyState.description}
                                        onBlur={handleDescriptionBlur}
                                        placeholder="Enter survey description..."
                                        className="w-full min-h-24 p-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                    />
                                ) : (
                                    <p
                                        onClick={() => setEditDescription(true)}
                                        className="cursor-pointer hover:text-primary-600 transition-colors font-secondary py-2"
                                    >
                                        {surveyState.description}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleAddDescription}
                                className="w-fit cursor-pointer border-b border-primary-600 text-primary-600 hover:text-primary-500 hover:border-primary-500 font-main transition-colors flex items-center gap-2"
                            >
                                <span className="inline-block">+</span> Add description
                            </button>
                        )}
                    </div>

                    <div className="flex-grow flex-col items-center flex w-full space-y-8 py-6">
                        {surveyState.questions && surveyState.questions.length > 0 ? (
                            surveyState.questions.map((question) =>
                                question._id === editQuestionId ? (
                                    <QuestionForm
                                        key={question._id}
                                        question={question}
                                        onQuestionCopy={handleQuestionCopy}
                                        onQuestionDelete={handleQuestionDelete}
                                        onQuestionChange={updateQuestion}
                                    />
                                ) : (
                                    <InactiveEditableQuestion
                                        key={question._id}
                                        onSetEditable={setEditQuestionId}
                                        question={question}
                                    />
                                )
                            )
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No questions yet. Add your question below.
                            </div>
                        )}

                    </div>
                    <div className="flex justify-between py-4">
                        <button
                            className=' hover:bg-primary-300 text-sm text-primary-600 rounded-2xl cursor-pointer px-4 py-2 bg-primary-200'
                            onClick={handleAddQuestion}
                        >
                            <span className="hidden sm:inline">+</span> Add question
                        </button>

                        <Button onClick={() => onSave(surveyState)}>
                            Save Changes
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SurveyForm