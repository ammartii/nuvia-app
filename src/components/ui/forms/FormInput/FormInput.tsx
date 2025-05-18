import { ChangeEvent } from "react";
import "./FormInput.scss";

// Tipo de las props
type FormInputProps = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

// Componente funcional
const FormInput = ({
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
}: FormInputProps) => {
  {
    /* Estructura del componente */
  }
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
};

export default FormInput;
