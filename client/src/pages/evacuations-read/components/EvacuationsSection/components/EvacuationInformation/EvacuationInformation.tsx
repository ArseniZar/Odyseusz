import { Button } from "@/components/Button";

import { useState, type JSX } from "react";
import type { EvacuationInformationProps } from "./EvacuationInformation.types";
import { PointInformation } from "./components/PointInformation/PointInformation";
import { AssistantInformation } from "./components/AssistantInformation/AssistantInformation";
import { GeneralInformation } from "./components/GeneralInformation/GeneralInformation";

export const EvacuationInformation =({infoText, status, name, area,assistants,collectionPoints,description,reason, dataLastActivated,onActive, onCancel, onDelete, onEdit}: EvacuationInformationProps):JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="flex flex-none flex-col  gap-5 border border-black/10 shadow-xl rounded-2xl">
            <div className="p-5 flex flex-row gap-5 items-center justify-between">
                <img className="w-20" src={infoText.iconEvacuation} alt="iconTrip"/>
                <div className="flex flex-col">
                    <p className="font-medium text-xl">{infoText.status.label}:<span className="font-light ml-1">{infoText.status.options[status]} </span></p>
                    <p className="font-medium text-lg"> {infoText.name.label}:<span className="font-light ml-1">{name}</span></p>
                    <p className="font-medium text-lg"> {infoText.latitude.label}/{infoText.longitude.label}:<span className="font-light ml-1"> {area.coordinates.latitude} / {area.coordinates.longitude} </span></p>
                </div>
                <button className={`flex-1 h-full opacity-0 hover:opacity-30 transition-opacity ${infoText.showButtons.details.some((item) => status === item)  ? "visible" : "invisible"}`} onClick={() => setIsOpen(prev => !prev)}>
                    <p className="font-medium text-lg"> {infoText.evacuationButtons.details.label} </p>
                </button>
                <div className="flex flex-row gap-3 justify-center">
                    <Button label={infoText.evacuationButtons.active.label}  onClick={onActive} classButton={`bg-black/90 ${infoText.showButtons.active.some((item) => status === item)  ? "block" : "hidden"}`} classText="text-white"/>
                    <Button label={infoText.evacuationButtons.cancel.label}  onClick={onCancel} classButton={`bg-black/90 ${infoText.showButtons.cancel.some((item) => status === item) ? "block" : "hidden"}`} classText="text-white"/>
                    <Button label={infoText.evacuationButtons.edit.label}  onClick={onEdit} classButton={`bg-black/90 ${infoText.showButtons.edit.some((item) => status === item) ? "block" : "hidden"}`} classText="text-white"/>
                    <Button label={infoText.evacuationButtons.delete.label}  onClick={onDelete} classButton={`bg-black/90 ${infoText.showButtons.delete.some((item) => status === item) ? "block" : "hidden"}`} classText="text-white"/>
                </div>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} px-5 pb-5 flex-1 flex flex-col gap-4`}>
                <GeneralInformation
                    infoText={infoText}
                    reason={reason}
                    description={description}
                    area={area}
                    dataLastActivated={dataLastActivated}
                />
                <hr />
                {collectionPoints.map((point, index) => (   
                    <PointInformation 
                        pointNumber={index+1} 
                        infoText={infoText.point} 
                        name={point.name} 
                        description={point.description} 
                        coordinates={point.coordinates}
                    />                    
                ))}
                <hr />
                {assistants.map((assistant, index) => (
                    <AssistantInformation 
                        assistantNumber={index+1} 
                        infoText={infoText.assistant} 
                        name={assistant.name} 
                        workingHours={assistant.workingHours} 
                        phone={assistant.phone} 
                        email={assistant.email}/>

                    
                ))}
            </div>
        </div>
    )
}