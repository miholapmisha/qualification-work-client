import { InputHTMLAttributes, PropsWithChildren, RefObject, useRef, useState } from "react"
import { Survey } from "../../../types/survey"
import { useEditable } from "../../../hooks/useEditable"
import Button from "../../../components/common/Button";
import QuestionForm from "./question-form/QuestionForm";

type EditDescriptionAreaProps = PropsWithChildren<InputHTMLAttributes<HTMLTextAreaElement> & { ref?: RefObject<HTMLTextAreaElement | null> }>;

const EditDescriptionArea = ({ ref, ...props }: EditDescriptionAreaProps) => {
    return <textarea
        autoFocus
        ref={ref}
        {...props}
        className="w-full border border-primary-300 rounded-xl p-4 resize-none outline-none font-main text-primary-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all min-h-24"
    />
}

const CreateSurveyPage = () => {
    const [survey, setSurvey] = useState<Survey>({
        _id: crypto.randomUUID(),
        title: 'Your Survey',
        questions: []
    })
    const { editInputRef: editNameInputRef, edit, setEdit } = useEditable()
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null)
    const [editDescription, setEditDescription] = useState(false)

    const handleDescriptionBlur = () => {
        if (!descriptionInputRef.current) return

        const newValue = descriptionInputRef.current.value

        if (newValue === '') {
            setSurvey(prevSurvey => ({ ...prevSurvey, description: undefined }))
        } else {
            setSurvey(prevSurvey => ({ ...prevSurvey, description: newValue }))
        }

        setEditDescription(false);
    }

    const handleTitleBlur = () => {
        if (!editNameInputRef.current) return

        const newValue = editNameInputRef.current.value
        if (newValue === '') {
            setSurvey(prevSurvey => ({ ...prevSurvey, title: 'Your Survey' }))
        } else {
            setSurvey(prevSurvey => ({ ...prevSurvey, title: newValue }))
        }
        setEdit(false);
    }

    const handleAddDescription = () => {
        setSurvey(prev => ({ ...prev, description: '' }));
        setEditDescription(true);
    }

    return (
        <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto py-12 px-32 space-y-10 flex">
            <div className="overflow-auto flex-auto w-full bg-white rounded-xl shadow-md p-8">
                <div className="h-full space-y-6 flex flex-col">
                    <div className="border-b border-primary-300">
                        <div className="flex items-center">
                            {edit ? (
                                <input
                                    onBlur={handleTitleBlur}
                                    ref={editNameInputRef}
                                    defaultValue={survey.title}
                                    className="text-5xl font-secondary font-bold flex-auto outline-none border-b-1 border-primary-400 h-[64px] leading-none focus:border-primary-600 transition-colors"
                                />
                            ) : (
                                <h1
                                    onClick={() => setEdit(true)}
                                    className="hover:cursor-text py-2 text-5xl font-secondary font-bold flex-auto h-[64px] leading-none hover:text-primary-600 transition-colors"
                                >
                                    {survey.title}
                                </h1>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        {survey.description !== undefined ? (
                            <>
                                <h1 className="text-gray-700 font-medium">Description</h1>
                                {editDescription || survey.description === '' ? (
                                    <EditDescriptionArea
                                        ref={descriptionInputRef}
                                        defaultValue={survey.description}
                                        onBlur={handleDescriptionBlur}
                                        placeholder="Enter survey description..."
                                    />
                                ) : (
                                    <h1
                                        onClick={() => setEditDescription(true)}
                                        className="cursor-pointer hover:text-primary-600 transition-colors font-secondary"
                                    >
                                        {survey.description}
                                    </h1>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={handleAddDescription}
                                className="w-fit cursor-pointer border-b border-primary-600 text-primary-600 hover:text-primary-500 hover:border-primary-500 font-main transition-colors flex items-center gap-2"
                            >
                                + Add description
                            </button>
                        )}
                    </div>

                    <div className="flex-grow px-32" >
                        <QuestionForm />
                    </div>
                    <div className="self-center">
                        <Button>
                            Add question
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSurveyPage