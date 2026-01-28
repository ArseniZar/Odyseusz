import type { JSX } from "react";
import type { DurationInformationProps } from "./DurationInformation.types";

import { formatDate } from "@/utils/formatDate";

// prettier-ignore
export const DurationInformation = ({infoText,dataRange}:DurationInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-3 items-center border-b pb-3">
      <img className="w-20 h-20" src={infoText.iconTrip} alt="iconTrip" />
      <div className="flex flex-col gap-1">
        <p className="font-medium text-xl"> {infoText.dateRange.startDate.label}: <span className="font-light"> {formatDate(dataRange.startDate)} </span></p>
        <p className="font-medium text-xl">  {infoText.dateRange.endDate.label}: <span className="font-light"> {formatDate(dataRange.endDate)} </span></p>
      </div>
    </div>
  );
};
