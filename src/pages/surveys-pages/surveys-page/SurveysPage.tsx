import { useLayoutEffect, useState } from 'react';
import Button from '../../../components/common/Button';
import SearchIcon from '../../../components/common/icons/SearchIcon';
import FilterIcon from '../../../components/common/icons/FilterIcon';
import ChevronIcon from '../../../components/common/icons/ChevonIcon';
import { useDebounce } from '../../../hooks/useDebounce';
import { Link, useSearchParams } from 'react-router-dom';
import CurrentUsersSurveysTab from './CurrentUsersSurveysTab';
import AllSurveysTab from './AllSurveysTab';

const SurveyPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const surveyType = searchParams.get('type');

    const [searchQuery, setSearchQuery] = useState('');

    const debouncedSearchQuery = useDebounce({ value: searchQuery, milliseconds: 500 });

    useLayoutEffect(() => {

        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            if (params.get('page') === null) {
                params.set('page', '1')
            }

            if (params.get('type') === null) {
                params.set('type', 'my')
            }

            return params;
        })

    }, [searchParams])

    const handleSwitchTab = (value: 'my' | 'all') => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set('type', value);
            params.set('page', '1');
            return params;
        })
    }

    return (
        <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-secondary text-primary-900">Surveys</h1>
                    <p className="text-primary-600 mt-1">Manage and explore available surveys</p>
                </div>
                <Button classes='flex items-center space-x-2'>
                    <Link to='/surveys/create' className="flex items-center space-x-2">
                        <span>+ Create Survey</span>
                    </Link>
                </Button>
            </div>

            <div className="border-b border-primary-200">
                <div className="flex space-x-8">
                    <button
                        className={`flex items-center space-x-2 cursor-pointer pb-3 px-1 font-medium ${surveyType === 'my' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-primary-600 hover:text-primary-900'}`}
                        onClick={() => handleSwitchTab('my')}
                    >
                        <span>My Surveys</span>
                    </button>

                    <button
                        className={`flex items-center space-x-2 cursor-pointer pb-3 px-1 font-medium ${surveyType === 'all' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-primary-600 hover:text-primary-900'}`}
                        onClick={() => handleSwitchTab('all')}
                    >
                        <span>All Surveys</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-grow">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" fill="none" width={'18px'} height={'18px'} />
                    <input
                        type="text"
                        placeholder="Search surveys..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 py-2 px-4 rounded-lg border border-primary-300 hover:bg-primary-100 transition-colors whitespace-nowrap">
                    <FilterIcon width={'18px'} height={'18px'} />
                    <span>Filter</span>
                    <ChevronIcon width={'18px'} height={'18px'} />
                </button>
            </div>

            {/* Tab Content */}
            <div className='flex-grow'>
                {surveyType === 'my' ? (
                    <CurrentUsersSurveysTab
                        debouncedSearchQuery={debouncedSearchQuery}
                    />
                ) : (
                    <AllSurveysTab
                        debouncedSearchQuery={debouncedSearchQuery}
                    />
                )}
            </div>
        </div>
    );
};

export default SurveyPage;