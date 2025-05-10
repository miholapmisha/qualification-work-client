import { useState } from "react";
import { SurveyTextAnswers } from "../../../types/analytics";
import TextAnswer from "./TextAnswer";

type QuestionTextAnswersProps = {
    question: SurveyTextAnswers
}

const QuestionTextAnswers = ({ question }: QuestionTextAnswersProps) => {
    const [expanded, setExpanded] = useState(false);
    const { questionText, answers } = question;

    const displayAnswers = expanded ? answers : answers.slice(0, 3);
    const hasMoreAnswers = answers.length > 3;

    return (
        <div className="mb-8 bg-white p-6 rounded-lg shadow border-1 border-primary-300">
            <h3 className="text-lg font-semibold mb-2 text-primary-800">{questionText || "Untitled Question"}</h3>

            <div className="flex items-center mb-4">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {answers.length} {answers.length === 1 ? 'response' : 'responses'}
                </span>
            </div>

            {answers.length === 0 ? (
                <div className="p-4 bg-white rounded-lg shadow text-gray-500 italic">
                    No text responses for this question.
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {displayAnswers.map((answer, index) => (
                            <TextAnswer key={index} answer={answer} index={index} />
                        ))}
                    </div>

                    {hasMoreAnswers && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="mt-4 text-primary-600 hover:text-primary-800 font-medium flex items-center"
                        >
                            {expanded ? (
                                <>Show less</>
                            ) : (
                                <>Show {answers.length - 3} more responses</>
                            )}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default QuestionTextAnswers