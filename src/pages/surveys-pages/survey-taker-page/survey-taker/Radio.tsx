import React from 'react';
import UncheckedRadioIcon from '../../../../components/common/icons/UncheckedRadioIcon';
import CheckedRadioIcon from '../../../../components/common/icons/CheckedRadioIcon';

type CustomRadioProps = {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

const Radio = ({
    name,
    value,
    checked,
    onChange,
    label,
    disabled = false,
    className = '',
}: CustomRadioProps) => {

    return (
        <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className="relative flex items-center justify-center">

                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                    aria-label={label || value}
                />

                <UncheckedRadioIcon
                    width="24px"
                    height="24px"
                    className={`transition-opacity ${checked ? 'opacity-0 absolute' : 'opacity-100'}`}
                />

                {checked && (
                    <CheckedRadioIcon
                        fill='#4F46E5'
                        width="24px"
                        height="24px" />
                )}
            </div>

            {label && (
                <span className={`text-sm ${checked ? 'font-medium' : 'font-normal'}`}>
                    {label}
                </span>
            )}
        </label>
    );
};

export default Radio;