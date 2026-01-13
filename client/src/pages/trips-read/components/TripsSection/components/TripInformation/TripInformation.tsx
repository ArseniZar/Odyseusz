import { Button } from "@/components/Button";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";

import type { JSX } from "react";
import type { TripInformationProps } from "./TripInformation.types";

export const TripInformation =({infoText, status, endDate, startDate, numberOfStages, onDelete,onEdit, onShowDetails, onCancel, }: TripInformationProps):JSX.Element => {
    return(
        <div className="p-5 flex flex-row gap-5 border border-black/10 shadow-xl rounded-2xl items-center justify-between">
            <img className="w-20" src={infoText.iconTrip} alt="iconTrip"/>
            <div className="flex flex-col">
                <h2 className="font-medium text-xl">{infoText.trip.status.label}: <span className="font-light"> {infoText.trip.status.options[status]} </span></h2>
                <h2 className="font-medium text-lg"> {infoText.trip.dateRange.label}: <span className="font-light"> {formatDate(startDate)}</span> - <span className="font-light">{formatDate(endDate)}</span></h2>
                <h2 className="font-medium text-lg"> {infoText.trip.numberOfStages.label}: <span className="font-light"> {formatNumber(numberOfStages)} </span></h2>
            </div>
            <button className={`flex-1 h-full opacity-0 hover:opacity-30 transition-opacity ${infoText.showButtons.details.some((item) => status === item)  ? "visible" : "invisible"}`} onClick={onShowDetails}>
                <h2 className="font-medium text-lg"> {infoText.tripButtons.details.label} </h2>
            </button>
            <div className="flex flex-row gap-3 justify-center">
                <Button label={infoText.tripButtons.edit.label} onClick={onEdit} classButton={`${infoText.showButtons.edit.some((item) => status === item)? "opacity-100 pointer-events-auto" : "opacity-30 pointer-events-none"}`}/>
                <Button label={infoText.tripButtons.delete.label}  onClick={onDelete} classButton={`bg-black/90 ${infoText.showButtons.delete.some((item) => status === item)  ? "block" : "hidden"}`} classText="text-white"/>
                <Button label={infoText.tripButtons.cancel.label}  onClick={onCancel} classButton={`bg-black/90 ${infoText.showButtons.cancel.some((item) => status === item) ? "block" : "hidden"}`} classText="text-white"/>
            </div>
        </div>
    )
}