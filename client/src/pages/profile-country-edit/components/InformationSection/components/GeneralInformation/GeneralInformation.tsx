import type { JSX } from "react";
import type { GeneralInformationProps } from "./GeneralInformation.types";
import { getFlagUrl } from "@/utils/getFlagImage";
import { Markdown } from "@/components/Markdown";
import { formatDate } from "@/utils/formatDate";

export const GeneralInformation = ({infoText,description, countryCode, name, dateUpdate, dangerLevel}: GeneralInformationProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center border-b pb-3">
        <img className="w-20 h-20" src={getFlagUrl(countryCode)} alt="iconFlag" />
        <div className="flex flex-col gap-1">
          <p className="font-medium text-xl"> {infoText.name.label}: <span className="font-light"> {name} </span></p>
          <p className="font-medium text-xl"> {infoText.dangerLevel.label}: <span className="font-light text-lg"> {infoText.dangerLevel.options[dangerLevel]}</span></p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-medium text-xl border-b pb-3"> {infoText.dataUpdate.label}: <span className="font-light text-lg"> {formatDate(dateUpdate)}</span></p>
        <div className="font-medium text-xl border-b pb-3">  {infoText.description.label}:
          <Markdown text={description}/>
        </div>
      </div>
    </div>
  );
};