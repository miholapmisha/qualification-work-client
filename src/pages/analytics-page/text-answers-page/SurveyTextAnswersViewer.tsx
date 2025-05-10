import { useState } from 'react';
import Dropdown, { DropdownOption } from '../../../components/common/Drowdown';
import Input from '../../../components/common/Input';
import { SurveyTextAnswers } from '../../../types/analytics';
import QuestionTextAnswers from './QuestionTextAnswers';

const sortDefaultOptions: DropdownOption<string>[] = [
    {
        id: 1,
        label: "Most responses first",
        value: "most"
    },
    {
        id: 2,
        label: "Least responses first",
        value: "least"
    }
]

type SurveyTextAnswersViewerProps = {
    textAnswers: SurveyTextAnswers[]
}

const SurveyTextAnswersViewer = ({ textAnswers }: SurveyTextAnswersViewerProps) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('most');

    const filteredAnswers = textAnswers.filter(question => {
        if (question.questionText.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }

        return question.answers.some(answer =>
            answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const sortedAnswers = [...filteredAnswers].sort((a, b) => {
        if (sortOrder === 'most') {
            return b.answers.length - a.answers.length;
        } else {
            return a.answers.length - b.answers.length;
        }
    });

    return (
        <div className="w-full flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-primary-800 font-secondary">Text Responses</h2>
                <p className="text-gray-600">View and search through all text responses to open-ended questions.</p>
            </div>

            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-grow">
                    <div className="relative rounded-md shadow-sm">
                        <Input
                            classes='bg-white'
                            type="text"
                            id="search"
                            label="Search Responses"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                <span className="text-gray-400 hover:text-gray-500">✕</span>
                            </button>
                        )}
                    </div>
                </div>

                <Dropdown
                    options={sortDefaultOptions}
                    onChange={(value) => setSortOrder(value)}
                    value={sortOrder}
                    width='max-w-[224px] w-full'
                >
                </Dropdown>

            </div>

            {sortedAnswers.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    {searchTerm ? (
                        <p className="text-gray-500">No matches found for "{searchTerm}"</p>
                    ) : (
                        <p className="text-gray-500">No text responses available</p>
                    )}
                </div>
            ) : (
                <div>
                    {searchTerm && (
                        <div className="mb-4 text-sm text-gray-500">
                            Found {sortedAnswers.length} {sortedAnswers.length === 1 ? 'question' : 'questions'} with matching responses
                        </div>
                    )}

                    {sortedAnswers.map((question) => (
                        <QuestionTextAnswers key={question._id} question={question} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SurveyTextAnswersViewer;
