import type { JSX } from "react";
import { Button } from "@/components/Button";
import type { FormButtonsProps } from "./FormButtons.types";


// prettier-ignore
export const FormButtons = ({infoText, className, onCancel, onSubmit }: FormButtonsProps): JSX.Element => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Button label={infoText.formButtons.cancelLabel.label} onClick={onCancel} classButton="bg-black/90" classText="text-white"/>
      <Button label={infoText.formButtons.submitLabel.label} onClick={onSubmit} classButton="" classText=""/>      
    </div>
  );
};
