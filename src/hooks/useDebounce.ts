import { useState, useEffect } from 'react'

type useDebounceProps = {
    value: string,
    milliseconds?: number | 1000
}

export const useDebounce = ({ value, milliseconds }: useDebounceProps) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, milliseconds);

        return () => {
            clearTimeout(handler);
        };
    }, [value, milliseconds]);

    return debouncedValue;
};