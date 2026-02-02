import { Markdown } from "@/components/Markdown";
import type { JSX } from "react";
import type { GeneralInformationProps } from "./GeneralInformation.types";
import { formatDate } from "@/utils/formatDate";

export const GeneralInformation = ({description, countryCode, infoText, dataUpdate}: GeneralInformationProps): JSX.Element => {
    return (
        <>
            <p className="font-medium text-lg"> {infoText.dataUpdate.label}:<span className="font-light ml-1">{formatDate(dataUpdate)}</span></p>
            <hr />
            <p className="font-medium text-lg"> {infoText.countryCode.label}:<span className="font-light ml-1">{countryCode}</span></p>
            <hr />
            <p className="font-medium text-xl">  {infoText.description.label}:
                <Markdown text={description}/>
            </p>
        </>
    );
};