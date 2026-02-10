import type { EvacuationSectionConfig } from "../../../../config/evacuationSection.types";
import type { EvacuationFormValues } from "@/types/forms/evacuation";
import type { Control, FieldArrayWithId } from "react-hook-form";

export interface AreasFormProps {
    control: Control<EvacuationFormValues>;
    infoText:EvacuationSectionConfig["areasForm"];
    isActive: boolean;
    fields: FieldArrayWithId<EvacuationFormValues, "areasForm.areas">[]
    onAddArea: () => void;
    onRemoveArea: (index: number) => void;
}