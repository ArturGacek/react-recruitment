import React from 'react';

interface IFormRow {
  type: string;
  name: string;
  labelText: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow: React.FC<IFormRow> = ({ type, name, labelText, onChange }) => {
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
        className="form-input h-12 w-full px-3 py-2 border border-border-color rounded-lg transition duration-300 focus:outline-none focus:border-primary"
      />
    </div>
  );
};

export default FormRow;
