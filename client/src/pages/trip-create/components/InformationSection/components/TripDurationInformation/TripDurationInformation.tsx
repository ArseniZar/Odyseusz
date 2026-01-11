import type { JSX } from "react";
import type { TripDurationInformationProps } from "./TripDurationInformation.types";



function formatDate(date: Date | null): string {
  if (!date) {
    return "N/A";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

// prettier-ignore
export const TripDurationInformation = ({infoText,dataRange}:TripDurationInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-3 items-center">
      <img className="w-20 h-20" src={infoText.iconTrip} alt="iconTrip" />
      <div className="flex flex-col gap-1">
        <h2 className="font-medium text-xl"> {infoText.dateRange.startDate.label}: <span className="font-light"> {formatDate(dataRange.startDate)} </span></h2>
        <h2 className="font-medium text-xl">  {infoText.dateRange.endDate.label}: <span className="font-light"> {formatDate(dataRange.endDate)} </span></h2>
      </div>
    </div>
  );
};
