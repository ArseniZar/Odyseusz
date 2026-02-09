

import type { JSX } from "react";
import type { AreasFormProps } from "./AreasForm.types";
import { AreaForm } from "./components/AreaForm/AreaForm";
import { Button } from "@/components/Button";

export const AreasForm = ({ control, infoText, isActive, fields, onAddArea, onRemoveArea }: AreasFormProps): JSX.Element => {
  return (
    <div className={`px-6 py-4 mb-10 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-auto ${isActive ? "block" : "hidden"}`}>
     {fields.map((field, index) => (
             <AreaForm
               key={field.id}
               index={index}
               control={control}
               areaNumber={index + 1}
               infoText={infoText.area}
               onDelete={() => onRemoveArea(index)}
             />
           ))}
           <Button label={infoText.addButton.label} onClick={onAddArea}/>
    </div>
  );
};
