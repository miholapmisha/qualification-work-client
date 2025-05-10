import { useState, useEffect, ReactNode } from "react";
import ChevronIcon from "./icons/ChevonIcon";

export type DropdownOption<T> = {
    id: string | number;
    label: string;
    value: T;
    icon?: ReactNode;
};

type DropdownProps<T> = {
    options: DropdownOption<T>[];
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    className?: string;
    dropdownClassName?: string;
    optionClassName?: string;
    disabled?: boolean;
    width?: string;
    renderOption?: (option: DropdownOption<T>) => ReactNode;
};

const Dropdown = <T,>({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    className = "",
    dropdownClassName = "",
    optionClassName = "",
    disabled = false,
    width = "max-w-[256px] w-full",
    renderOption,
}: DropdownProps<T>) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<DropdownOption<T> | undefined>(
        options.find((option) => option.value === value)
    );
    useEffect(() => {
        const option = options.find((option) => option.value === value);
        setSelectedOption(option);
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.id !== "dropdown-container" && !target.closest("#dropdown-container")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSelect = (option: DropdownOption<T>) => {
        onChange(option.value);
        setSelectedOption(option);
        setIsOpen(false);
    };

    const defaultRenderOption = (option: DropdownOption<T>) => (
        <div className="flex items-center space-x-4">
            {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
            <span>{option.label}</span>
        </div>
    );

    const renderOptionContent = renderOption || defaultRenderOption;

    return (
        <div
            id="dropdown-container"
            className={`relative ${width} ${className}`}
        >
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
          flex items-center justify-between w-full px-4 py-2 
          bg-white border border-gray-300 rounded-md shadow-sm 
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:border-gray-400"} 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
        `}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex-grow truncate text-left">
                    {selectedOption ? renderOptionContent(selectedOption) : placeholder}
                </div>
                <ChevronIcon
                    className={`flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""} transition-all duration-300`}
                    width="16px"
                    height="16px"
                />
            </button>

            {isOpen && (
                <div
                    className={`
            absolute z-10 w-full mt-1 bg-white border border-gray-300 
            rounded-md shadow-lg max-h-60 overflow-auto ${dropdownClassName}
          `}
                    role="listbox"
                >
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleSelect(option)}
                            className={`
                px-4 py-2 cursor-pointer hover:bg-gray-100
                ${option.value === selectedOption?.value ? "bg-gray-50" : ""}
                ${optionClassName}
              `}
                            role="option"
                            aria-selected={option.value === selectedOption?.value}
                        >
                            {renderOptionContent(option)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;