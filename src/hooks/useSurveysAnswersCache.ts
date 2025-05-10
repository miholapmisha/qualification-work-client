import { useState, useEffect } from "react";
import { AnswersMap, AnswersObject, QuestionAnswer } from "../types/answer";
import { useLocalStorage } from "./useLocalStorage";

const SURVEY_ANSWERS_KEY = 'survey_answers_key'

const mapToObject = (map: AnswersMap): AnswersObject => {
    const obj: AnswersObject = {};
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
};

const objectToMap = (obj: AnswersObject): AnswersMap => {
    const map = new Map<string, QuestionAnswer>();
    if (obj) {
        Object.entries(obj).forEach(([key, value]) => {
            map.set(key, value);
        });
    }
    return map;
};


export const useSurveyAnswersCache = (surveyId?: string) => {

    const storageKey = surveyId ? `${SURVEY_ANSWERS_KEY}_${surveyId}` : SURVEY_ANSWERS_KEY;
    const { getItem, setItem, removeItem } = useLocalStorage(storageKey);

    const [answers, setAnswers] = useState<AnswersMap>(() => {
        const savedAnswers = getItem();
        return savedAnswers ? objectToMap(savedAnswers) : new Map<string, QuestionAnswer>();
    });

    useEffect(() => {
        setItem(mapToObject(answers));
    }, [answers, setItem]);

    const updateAnswer = (questionId: string, answer: QuestionAnswer | undefined) => {
        setAnswers(prevAnswers => {
            const newAnswers = new Map(prevAnswers);
            if (!answer) {
                newAnswers.delete(questionId)
            } else {
                newAnswers.set(questionId, answer);
            }
            return newAnswers;
        });
    };

    const removeAnswer = (questionId: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = new Map(prevAnswers);
            newAnswers.delete(questionId);
            return newAnswers;
        });
    };

    const resetAnswers = () => {
        setAnswers(new Map());
        removeItem();
    };

    return {
        answers,
        updateAnswer,
        removeAnswer,
        resetAnswers
    };
};