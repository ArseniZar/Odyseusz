import type { JSX } from "react";
import type { ButtonProps } from "./Button.types";

export const Button = ({ label, classButton, classText, disabled, onClick }: ButtonProps): JSX.Element => {
  return (
    <button
      disabled={disabled}
      className={`p-3 rounded-2xl border border-black/10 shadow-2xl ${classButton}`}
      onClick={onClick}
    >
      <span className={`text-lg ${classText}`}>{label}</span>
    </button>
  );
};
