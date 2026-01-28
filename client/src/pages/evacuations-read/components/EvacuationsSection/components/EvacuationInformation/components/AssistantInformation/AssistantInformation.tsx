import type { JSX } from "react";
import type { AssistantInformationProps } from "./AssistantInformation.types";

export const AssistantInformation = ({assistantNumber: assistantsNumber,infoText,email,name, phone,workingHours}: AssistantInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5">
      <p className="font-medium text-xl">{infoText.title} {assistantsNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg">{infoText.name.label}:<span className="font-light ml-1"> {name} </span></p>
        <p className="font-medium text-lg">{infoText.workingHours.label}:<span className="font-light ml-1"> {workingHours} </span></p>
        <p className="font-medium text-lg">{infoText.phone.label}:<span className="font-light ml-1"> {phone} </span></p>
        <p className="font-medium text-lg">{infoText.email.label}:<span className="font-light ml-1"> {email} </span></p>
      </div>
    </div>
  );
};
