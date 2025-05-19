import React, { forwardRef, useState, useRef, useEffect } from "react";

type CustomSelectProps = {
  options: (string | number)[];
  label?: string;
  error?: string;
  helperText?: string;
  labelClassName?: string;
  placeholder?: string;
  value?: string | number;
  dropDownClassName?: string;
  optionClassName?: string;
  onChange?: (value: string | number) => void;
  hideIcon?: boolean;
  StartIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options,
      label,
      error,
      helperText,
      labelClassName = "",
      placeholder = "Select an option",
      value = "",
      onChange,
      dropDownClassName,
      className = "",
      optionClassName,
      hideIcon = false,
      StartIcon,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value || placeholder);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Sync with external value changes
    useEffect(() => {
      if (value !== undefined) {
        const selected = options.includes(value) ? value : placeholder;
        setInternalValue(selected);
      }
    }, [value, options, placeholder]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: string | number) => {
      setInternalValue(option);
      onChange?.(option);
      setIsOpen(false);
    };

    return (
      <div
        className={`w-full text-font-poppins relative`}
        ref={dropdownRef}
        {...props}
      >
        {label && (
          <label
            className={`block text-sm font-light text-neutral-800 mb-1 ${labelClassName} ${
              error ? "text-red-500" : ""
            }`}
          >
            {label}
          </label>
        )}

        {/* Custom select trigger */}
        <div
          className={`
            w-full
            px-3
            py-2.5
            text-base
            font-light
            text-neutral-800
            bg-white
            border
            rounded-lg
            cursor-pointer
            transition-all
            duration-200
            flex
            items-center
            justify-between
            ${
              internalValue === placeholder ? "text-[#251D3580]" : "text-black"
            } text-base
            ${className}
            ${error ? "border-red-500" : "border-neutral-300"}
          `}
          onClick={() => setIsOpen(!isOpen)}
          ref={ref}
        >
          <div className="flex items-center gap-2">
            {StartIcon && <StartIcon />}
            <span>{internalValue}</span>
          </div>
          {!hideIcon && (
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>

        {/* Dropdown options */}
        {isOpen && (
          <div
            className={`absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto ${dropDownClassName}`}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={`
                  px-3
                  py-2.5
                  cursor-pointer
                  hover:bg-black
                  hover:text-white
                  text-[#1445c7]
                  ${optionClassName}
                `}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {(error || helperText) && (
          <p
            className={`mt-1 text-sm ${
              error ? "text-red-500" : "text-gray-500"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
