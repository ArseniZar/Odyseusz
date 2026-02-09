import type { JSX } from "react";
import type { AreaInformationProps } from "./AreaInformation.types";
import { calculateRadius } from "@/utils/calculateRadius";
import { formatNumber } from "@/utils/formatNumber";

export const AreaInformation = ({areaNumber, infoText, radius}: AreaInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5 border-b pb-3">
      <p className="font-medium text-xl w-1/6">{infoText.title} {areaNumber}</p>
      <div className="flex flex-col font-light">
         <p className="font-medium text-xl"> {infoText.radius.label}: <span className="font-light text-lg"> {formatNumber(calculateRadius(radius))} km^2 </span></p> 
      </div>
    </div>
  );
};
