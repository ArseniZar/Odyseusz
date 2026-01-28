import type { JSX } from "react";
import type { PointInformationProps } from "./PointInformation.types";
import { Markdown }from "@/components/Markdown";

export const PointInformation = ({pointNumber, infoText, name , description}: PointInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5 border-b pb-3">
      <p className="font-medium text-xl w-1/6">{infoText.title} {pointNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg"> {infoText.name.label}: <span className="font-light"> {name} </span></p>
        <p className="font-medium text-lg ">  {infoText.description.label}:
          <Markdown text={description}/>
        </p>
      </div>
    </div>
  );
};
