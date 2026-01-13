import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";

import type { JSX } from "react";
import type { StageInformationProps } from "./StageInformation.types";

export const StageInformation = ({stageNumber, infoText,dataRange,numberOfPeople}: StageInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5">
      <h2 className="font-medium text-xl">{infoText.stage.title} {stageNumber}</h2>
      <div className="flex flex-col font-light">
        <h3 className="font-medium text-lg"> {infoText.stage.dateRange.label}: <span className="font-light"> {formatDate(dataRange.startDate)}</span> - <span className="font-light">{formatDate(dataRange.endDate)}</span></h3>
        <h3 className="font-medium text-lg"> {infoText.stage.numberOfPeople.label}: <span className="font-light"> {formatNumber(numberOfPeople)} </span></h3>
      </div>
    </div>
  );
};
