import React, { useState } from 'react';

type TooltipProps = {
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
};

const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    const getPositionClasses = () => {
        switch (position) {
            case 'top':
                return '-top-10 left-1/2 transform -translate-x-1/2';
            case 'bottom':
                return 'top-full mt-2 left-1/2 transform -translate-x-1/2';
            case 'left':
                return 'left-[-110%] top-1/2 transform -translate-y-1/2';
            case 'right':
                return 'left-full ml-2 top-1/2 transform -translate-y-1/2';
            default:
                return '-top-10 left-1/2 transform -translate-x-1/2';
        }
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div
                    className={`absolute z-10 w-max bg-gray-800 text-white text-sm rounded-md px-3 py-1 shadow-lg ${getPositionClasses()}`}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;