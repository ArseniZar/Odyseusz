import type { JSX } from "react";
import type { StageHeaderProps } from "./StageHeader.types";
import { IconButton } from "@/components/IconButton";


export const StageHeader = ({ title, stageNumber, isOpen ,className, onDelete, onToggle,icons }: StageHeaderProps) : JSX.Element => {
  return(
  <div className={`flex flex-row  items-center justify-between ${className}`}> 
    <button onClick={onToggle} className="flex-1  px-6 py-4 flex flex-row">
      <h3 className="text-xl font-light">{title} {stageNumber}</h3>
    </button>
    <div className="px-6 py-4 flex flex-row gap-5">
      <IconButton icon={icons.iconTrash} classIcon="w-5 h-5" classButton="opacity-90 border-0" altText="iconTrash" onClick={onDelete}/>
      <IconButton icon={isOpen ? icons.iconOpen : icons.iconClose}  classIcon="w-5 h-5" classButton="opacity-60 border-0" altText="iconOpen/iconClose" onClick={onToggle}/>
    </div>
  </div>
  )
};

