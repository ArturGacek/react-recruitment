import React from 'react';

interface IFormRow {
  type: string;
  name: string;
  labelText: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
}

const FormRow: React.FC<IFormRow> = ({
  type,
  name,
  labelText,
  onChange,
  hasError,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block primary mb-2">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        className={`form-input h-12 w-full px-3 py-2 border rounded-lg transition duration-300 focus:outline-none focus:border-primary ${
          hasError
            ? 'border-error bg-error-light border-2'
            : 'border-border-color'
        }`}
      />
    </div>
  );
};

export default FormRow;
