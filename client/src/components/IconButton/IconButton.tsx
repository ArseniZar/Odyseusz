import type { JSX } from "react";
import type { IconButtonProps } from "./IconButton.type";



export const IconButton = ({icon, altText, onClick, disabled,classButton, classIcon}: IconButtonProps): JSX.Element => {
  return (
    <button  onClick={onClick} disabled={disabled} className={`border border-black/10 shadow-xl ${classButton}`}>
      <img className={`${classIcon}`} src={icon} alt={altText} />
    </button>
  );
};
