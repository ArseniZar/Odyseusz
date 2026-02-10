import { Button } from "@/components/Button";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";

import { useState, type JSX } from "react";
import type { TripInformationProps } from "./TripInformation.types";
import { StageInformation } from "./components/StageInformation/StageInformation";

export const TripInformation =({infoText, status, endDate, startDate, numberOfStages,stages, onDelete,onEdit, onCancel}: TripInformationProps):JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="flex flex-none flex-col  gap-5 border border-black/10 shadow-xl rounded-2xl">
            <div className="p-5 flex flex-row gap-5  items-center justify-between">
                <img className="w-20" src={infoText.iconTrip} alt="iconTrip"/>
                <div className="flex flex-col">
                    <p className="font-medium text-xl">{infoText.status.label}:<span className="font-light ml-1">{infoText.status.options[status]} </span></p>
                    <p className="font-medium text-lg">{infoText.dateRange.label}:<span className="font-light ml-1">{formatDate(startDate)}</span> - <span className="font-light">{formatDate(endDate)}</span></p>
                    <p className="font-medium text-lg">{infoText.numberOfStages.label}:<span className="font-light ml-1">{formatNumber(numberOfStages)} </span></p>
                </div>
                <button className={`flex-1 h-full opacity-0 hover:opacity-30 transition-opacity ${infoText.showButtons.details.some((item) => status === item)  ? "visible" : "invisible"}`} onClick={() => setIsOpen(prev => !prev)}>
                    <p className="font-medium text-lg"> {infoText.tripButtons.details.label} </p>
                </button>
                <div className="flex flex-row gap-3 justify-center">
                    <Button label={infoText.tripButtons.edit.label} onClick={onEdit} classButton={`${infoText.showButtons.edit.some((item) => status === item)? "block" : "hidden"}`}/>
                    <Button label={infoText.tripButtons.delete.label}  onClick={onDelete} classButton={`bg-black/90 ${infoText.showButtons.delete.some((item) => status === item)  ? "block" : "hidden"}`} classText="text-white"/>
                    <Button label={infoText.tripButtons.cancel.label}  onClick={onCancel} classButton={`bg-black/90 ${infoText.showButtons.cancel.some((item) => status === item) ? "block" : "hidden"}`} classText="text-white"/>
                </div>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} px-5 pb-5 flex-1 flex flex-col gap-4`}>
                {stages.map((stage, index) => (
                    <StageInformation
                        key={index} 
                        stageNumber={index+1}
                        infoText={infoText.stage} 
                        dateRange={stage.dateRange}
                        coordinates={stage.coordinates}
                        numberOfPeople={stage.numberOfPeople}
                    />
                ))}
            </div>
        </div>
    )
}