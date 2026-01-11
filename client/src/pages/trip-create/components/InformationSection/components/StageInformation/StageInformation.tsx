import type { JSX } from "react";
import type { StageInformationProps } from "./StageInformation.types";
function formatDate(date: Date | null): string {
  if (!date) {
    return "N/A";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function formatNumber(num: number | null): string {
  if (num === null) {
    return "N/A";  
  }
  return num.toString();
}

export const StageInformation = ({stageNumber, infoText,dataRange,numberOfPeople}: StageInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5 ">
      <h2 className="font-medium text-xl">{infoText.stage.title} {stageNumber}</h2>
      <div className="flex flex-col font-light">
        <h3 className="font-medium text-lg"> Okres: <span className="font-light"> {formatDate(dataRange.startDate)}</span> - <span className="font-light">{formatDate(dataRange.endDate)}</span></h3>
        <h3 className="font-medium text-lg"> Licba osób: <span className="font-light"> {formatNumber(numberOfPeople)} </span></h3>
      </div>
    </div>
  );
};
