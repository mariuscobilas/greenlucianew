import React from 'react';

// Define props for the component
type ButtonProps = {
    // Optional destination URL, makes the component render an <a> tag
    href?: string;
    // Optional type for when the button is used inside a form (only used when href is NOT provided)
    type?: 'button' | 'submit' | 'reset';
    // Additional classes for customization
    className?: string;
    // Content inside the button
    children: React.ReactNode;
    // Optional click handler
    onClick?: () => void;
    // Optional disabled state
    disabled?: boolean;
};

// 1. Corrected Component: Use a semantic <button> when no href is provided
function Button ({ href, children, className, onClick, type = 'button', disabled = false }: ButtonProps) {

    // 2. Fixed Tailwind Class: py-[10] is not a valid arbitrary value unit; changed to py-[10px]
    // OR use standard py-2 (which is 8px) or py-3 (12px) for standard Tailwind sizing.
    // I've used py-2.5 (10px) to match the likely intent of py-[10].
    const baseClasses = `px-4 py-2.5 bg-[#BFCDA8] text-[#0A0B07] rounded-full 
             cursor-pointer flex items-center justify-center transition-opacity 
             hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed
             ${className ?? ''}`;

    if (href) {
        // Renders as a semantic link <a> when href is present
        return (
            <a
                href={href}
                className={baseClasses}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }

    // Renders as a semantic button <button> for actions/forms
    return (
        <button
            type={type}
            className={baseClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;