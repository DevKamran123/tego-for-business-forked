import React, { forwardRef } from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  labelClassName?: string;
  id?: string;
  StartIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  EndIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      error,
      helperText,
      labelClassName,
      id,
      className = "",
      StartIcon,
      EndIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full text-font-poppins">
        {label && (
          <label
            htmlFor={id}
            className={`block text-sm font-light text-neutral-800 mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {StartIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <StartIcon className="text-neutral-500" />
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`
              w-full
              px-5
              py-2.5
              text-base
              font-light
              text-neutral-800
              placeholder:text-base
              2xl:placeholder:text-xl
              focus:outline-none
              bg-white
              border
              border-pebbleGray
              rounded-xl
              outline-none
              transition-all
              duration-200
              placeholder:text-deepMauve/45
              ${StartIcon && "pl-10"}
              ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-neutral-300 focus:border-blue-600"
              }
              ${className}
            `}
            {...props}
          />
          {EndIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <EndIcon className="text-neutral-500" />
            </div>
          )}
        </div>
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

CustomInput.displayName = "CustomInput";

export default CustomInput;
