import { ChangeEvent } from "react";
import "./TermsAgreement.scss";

type Props = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TermsAgreement = ({ checked, onChange }: Props) => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="text-termsagreement">
        Acepto los{" "}
        <a href="#" target="_blank" className="a-termsagreement">
          Términos y condiciones
        </a>{" "}
        y estoy de acuerdo con las{" "}
        <a href="#" target="_blank" className="a-termsagreement">
          Políticas de Privacidad
        </a>
        .
      </span>
    </label>
  );
};

export default TermsAgreement;
