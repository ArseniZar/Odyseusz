import type { JSX } from "react";
import type { StageInformationProps } from "./StageInformation.types";
import { formatDate } from "@/utils/formatDate";

export const StageInformation = ({stageNumber, infoText, dateRange,coordinates, numberOfPeople}: StageInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5">
      <p className="font-medium text-xl">{infoText.title} {stageNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg">{infoText.dateRange.label}:<span className="font-light ml-1">{formatDate(dateRange.startDate)}</span> - <span className="font-light">{formatDate(dateRange.endDate)}</span></p>
        <p className="font-medium text-lg"> {infoText.latitude.label}/{infoText.longitude.label}:<span className="font-light ml-1"> {coordinates.latitude} / {coordinates.longitude} </span></p>
        <p className="font-medium text-lg"> {infoText.numberOfPeople.label}:<span className="font-light ml-1">{numberOfPeople}</span></p>
      </div>
    </div>
  );
};