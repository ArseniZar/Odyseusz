import type { JSX } from "react";
import type { ConsulateInformationProps } from "./ConsulateInformation.types";
import { formatDate } from "@/utils/formatDate";

export const ConsulateInformation = ({consulateNumber,infoText,email,address, phone,dataUpdate,website}: ConsulateInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5 border-b pb-3">
      <p className="font-medium text-xl w-1/6">{infoText.title} {consulateNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg">{infoText.address.label}:<span className="font-light ml-1"> {address} </span></p>
        <p className="font-medium text-lg">{infoText.email.label}:<span className="font-light ml-1"> {email} </span></p>
        <p className="font-medium text-lg">{infoText.phone.label}:<span className="font-light ml-1"> {phone} </span></p>
        <p className="font-medium text-lg">{infoText.website.label}:<span className="font-light ml-1"> {website} </span></p>
        <p className="font-medium text-lg">{infoText.dataUpdate.label}:<span className="font-light ml-1"> {formatDate(dataUpdate)} </span></p>
      </div>
    </div>
  );
};