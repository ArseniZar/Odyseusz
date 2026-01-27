import type { JSX } from "react";
import type { AssistantsInformationProps } from "./AssistantsInformation.types";

export const AssistantsInformation = ({assistantsNumber,infoText,email,name, phone,workingHours}: AssistantsInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5 border-b pb-3">
      <p className="font-medium text-xl w-1/6">{infoText.title} {assistantsNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg">{infoText.name.label}:{" "}<span className="font-light"> {name} </span></p>
        <p className="font-medium text-lg">{infoText.workingHours.label}:{" "}<span className="font-light"> {workingHours} </span></p>
        <p className="font-medium text-lg">{infoText.phone.label}:{" "}<span className="font-light"> {phone} </span></p>
        <p className="font-medium text-lg">{infoText.email.label}:{" "}<span className="font-light"> {email} </span></p>
      </div>
    </div>
  );
};
