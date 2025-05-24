import { ChangeEvent } from "react";
import "./TermsAgreement.scss";

type Props = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

// Componente para aceptar términos y condiciones.
const TermsAgreement = ({ checked, onChange }: Props) => {
  return (
    <label className="terms__container">
      <input className="terms__checkbox" type="checkbox" checked={checked} onChange={onChange} />
      <span className="terms__text">
        Acepto los{" "}
        <a href="#" target="_blank">
          Términos y condiciones
        </a>{" "}
        y estoy de acuerdo con las{" "}
        <a href="#" target="_blank">
          Políticas de Privacidad
        </a>
        .
      </span>
    </label>
  );
};

export default TermsAgreement;
