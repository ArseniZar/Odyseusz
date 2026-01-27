import type { JSX } from "react";
import type { CollectionPointsFormProps } from "./CollectionPointsForm.types";
import { PointForm } from "./components/PointForm/PointForm";
import { Button } from "@/components/Button";

// prettier-ignore
export const CollectionPointsForm = ({control,infoText,isActive,fields,onAddPoint,onRemovePoint}: CollectionPointsFormProps): JSX.Element => {
  return (
    <div className={`px-6 py-4 mb-10 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-auto ${isActive ? "block" : "hidden"}`}>
      {fields.map((field, index) => (
        <PointForm
          key={field.id}
          index={index}
          control={control}
          pointNumber={index + 1}
          infoText={infoText.point}
          onDelete={() => onRemovePoint(index)}
        />
      ))}
      <Button label={infoText.addButton.label} onClick={onAddPoint}/>
    </div>
  );
};
