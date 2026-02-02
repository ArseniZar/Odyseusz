import { Button } from "@/components/Button";

import { useState, type JSX } from "react";
import type { ProfileCountryInformationProps } from "./ProfileCountryInformation.types";
import { ConsulateInformation } from "./components/ConsulateInformation/ConsulateInformation";
import { GeneralInformation } from "./components/GeneralInformation/GeneralInformation";
import { getFlagUrl } from "@/utils/getFlagImage";

export const ProfileCountryInformation =({infoText, name,description, consulates,isEditable, countryCode, dangerLevel, dataUpdate ,onEdit}: ProfileCountryInformationProps):JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="flex flex-none flex-col  gap-5 border border-black/10 shadow-xl rounded-2xl">
            <div className="p-5 flex flex-row gap-5 items-center justify-between">
                <img className="w-20" src={getFlagUrl(countryCode)} alt="iconTrip"/>
                <div className="flex flex-col">
                    <p className="font-medium text-xl">{infoText.dangerLevel.label}:<span className="font-light ml-1">{infoText.dangerLevel.options[dangerLevel]} </span></p>
                    <p className="font-medium text-lg"> {infoText.name.label}:<span className="font-light ml-1">{name}</span></p>
                </div>
                <button className={`flex-1 h-full opacity-0 hover:opacity-30 transition-opacity ${infoText.showButtons.details.some((item) => isEditable  === item)  ? "visible" : "invisible"}`} onClick={() => setIsOpen(prev => !prev)}>
                    <p className="font-medium text-lg"> {infoText.profileCountryButtons.details.label} </p>
                </button>
                <div className="flex flex-row gap-3 justify-center">
                    <Button label={infoText.profileCountryButtons.edit.label}  onClick={onEdit} classButton={`bg-black/90 ${infoText.showButtons.edit.some((item) => isEditable === item)  ? "block" : "hidden"}`} classText="text-white"/>
                </div>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} px-5 pb-5 flex-1 flex flex-col gap-4`}>
                <GeneralInformation
                    infoText={infoText}
                    description={description}
                    countryCode={countryCode}
                    dataUpdate={dataUpdate}
                />
                <hr />
                {consulates.map((consulate, index) => (
                    <ConsulateInformation 
                        consulateNumber={index+1} 
                        infoText={infoText.consulate} 
                        phone={consulate.phone} 
                        email={consulate.email}
                        address={consulate.address}
                        website={consulate.website}        
                    />
                ))}
            </div>
        </div>
    )
}