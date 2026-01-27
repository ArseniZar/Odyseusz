import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";

import type { JSX } from "react";
import type { StageInformationProps } from "./StageInformation.types";

export const StageInformation = ({stageNumber, infoText,dataRange,numberOfPeople}: StageInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5 border-b pb-3">
      <p className="font-medium text-xl">{infoText.stage.title} {stageNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg"> {infoText.stage.dateRange.label}: <span className="font-light"> {formatDate(dataRange.startDate)}</span> - <span className="font-light">{formatDate(dataRange.endDate)}</span></p>
        <p className="font-medium text-lg"> {infoText.stage.numberOfPeople.label}: <span className="font-light"> {formatNumber(numberOfPeople)} </span></p>
      </div>
    </div>
  );
};
