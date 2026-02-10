import type { JSX } from "react";
import type { GeneralInformationProps } from "./GeneralInformation.types";
import { Markdown } from "@/components/Markdown";
// prettier-ignore
export const GeneralInformation = ({infoText, description, name, reason}: GeneralInformationProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center border-b pb-3">
        <img className="w-20 h-20" src={infoText.iconEwacuation} alt="iconEvacuation" />
        <div className="flex flex-col gap-1">
          <p className="font-medium text-xl"> {infoText.name.label}: <span className="font-light"> {name} </span></p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-medium text-xl border-b pb-3">  {infoText.reason.label}: <span className="font-light"> {reason} </span> </p> 
        <div className="font-medium text-xl border-b pb-3">  {infoText.description.label}:
          <Markdown text={description}/>
        </div>
      </div>
    </div>
  );
};
