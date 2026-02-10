import type { JSX } from "react";
import type { PointInformationProps } from "./PointInformation.types";
import { Markdown }from "@/components/Markdown";

export const PointInformation = ({pointNumber, infoText, name , description, coordinates}: PointInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5">
      <p className="font-medium text-xl">{infoText.title} {pointNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg"> {infoText.name.label}:<span className="font-light ml-1"> {name} </span></p>
        <p className="font-medium text-lg"> {infoText.latitude.label}/{infoText.longitude.label}:<span className="font-light ml-1"> {coordinates.latitude} / {coordinates.longitude} </span></p>
        <div className="font-medium text-lg">  {infoText.description.label}:
          <Markdown text={description}/>
        </div>
      </div>
    </div>
  );
};