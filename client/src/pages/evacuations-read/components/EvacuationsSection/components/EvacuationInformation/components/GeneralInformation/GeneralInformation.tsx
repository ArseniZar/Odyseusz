import { Markdown } from "@/components/Markdown";
import { calculateRadius } from "@/utils/calculateRadius";
import { formatNumber } from "@/utils/formatNumber";
import type { JSX } from "react";
import type { GeneralInformationProps } from "./GeneralInformation.types";

export const GeneralInformation = ({description, reason, radius, infoText}: GeneralInformationProps): JSX.Element => {
    return (
        <>
            <p className="font-medium text-lg"> {infoText.area.label}:<span className="font-light ml-1">{formatNumber(calculateRadius(radius))} km^2</span></p>
            <hr />
            <p className="font-medium text-xl">{infoText.reason.label}:
                <Markdown text={reason}/>
            </p>
            <hr />
            <p className="font-medium text-xl">  {infoText.description.label}:
                <Markdown text={description}/>
            </p>
        </>
    );
};