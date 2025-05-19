import { ChangeEvent } from "react";
import "./AuthForm.scss";

// Props que recibe el input
type AuthFormProps = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

// Input de formulario reutilizable con etiqueta
const AuthForm = ({
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
}: AuthFormProps) => {
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

export default AuthForm;
