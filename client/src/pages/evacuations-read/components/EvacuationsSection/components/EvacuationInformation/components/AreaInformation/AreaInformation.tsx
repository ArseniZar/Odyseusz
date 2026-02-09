import type { JSX } from "react";
import type { AreaInformationProps } from "./AreaInformation.types";
import { calculateRadius } from "@/utils/calculateRadius";
import { formatNumber } from "@/utils/formatNumber";

export const AreaInformation = ({areaNumber, infoText, radius,coordinates}: AreaInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5">
      <p className="font-medium text-xl">{infoText.title} {areaNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg"> {infoText.latitude.label}/{infoText.longitude.label}:<span className="font-light ml-1"> {coordinates.latitude} / {coordinates.longitude} </span></p>
        <p className="font-medium text-lg"> {infoText.radius.label}:<span className="font-light ml-1">{formatNumber(calculateRadius(radius))} km^2</span></p>
      </div>
    </div>
  );
};