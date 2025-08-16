import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  clearable?: boolean;
  passwordToggle?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border-transparent focus:border-indigo-500",
  outlined: "border border-gray-300 focus:border-indigo-500",
  ghost: "border-b border-gray-300 focus:border-indigo-500 rounded-none",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  passwordToggle,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    passwordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className={`w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition 
            ${sizeClasses[size]} 
            ${variantClasses[variant]} 
            ${disabled ? "bg-gray-200 cursor-not-allowed" : ""} 
            ${invalid ? "border-red-500 focus:ring-red-500" : ""}`}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={() => {
              const event = {
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>;
              onChange?.(event);
            }}
            className="absolute right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
        {passwordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {helperText && !invalid && (
        <span className="text-xs text-gray-500 mt-1">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="text-xs text-red-500 mt-1">{errorMessage}</span>
      )}
    </div>
  );
};
