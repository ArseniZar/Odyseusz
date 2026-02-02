import type { JSX } from "react";
import type { ConsulateInformationProps } from "./ConsulateInformation.types";

export const ConsulateInformation = ({consulateNumber,infoText,email,address, phone, website}: ConsulateInformationProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-5">
      <p className="font-medium text-xl">{infoText.title} {consulateNumber}</p>
      <div className="flex flex-col font-light">
        <p className="font-medium text-lg">{infoText.address.label}:<span className="font-light ml-1"> {address} </span></p>
        <p className="font-medium text-lg">{infoText.phone.label}:<span className="font-light ml-1"> {phone} </span></p>
        <p className="font-medium text-lg">{infoText.email.label}:<span className="font-light ml-1"> {email} </span></p>
        <p className="font-medium text-lg">{infoText.website.label}:<span className="font-light ml-1"> {website} </span></p>
      </div>
    </div>
  );
};
