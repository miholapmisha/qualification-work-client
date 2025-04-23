import React from 'react';
import UncheckedCheckboxIcon from '../../../components/common/icons/UncheckedCheckboxIcon';
import CheckedCheckboxIcon from '../../../components/common/icons/CheckedCheckboxIcon';

type CustomCheckboxProps = {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

const Checkbox = ({
    name,
    value,
    checked,
    onChange,
    label,
    disabled = false,
    className = '',
}: CustomCheckboxProps) => {

    return (
        <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className="relative flex items-center justify-center">

                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                    aria-label={label || value}
                />

                <UncheckedCheckboxIcon
                    width="24px"
                    height="24px"
                    className={`transition-opacity ${checked ? 'opacity-0 absolute' : 'opacity-100'}`}
                />

                {checked && (
                    <CheckedCheckboxIcon
                        width="24px"
                        height="24px" />
                )}
            </div>

            {/* Optional label */}
            {label && (
                <span className={`text-sm ${checked ? 'font-medium' : 'font-normal'}`}>
                    {label}
                </span>
            )}
        </label>
    );
};

export default Checkbox;