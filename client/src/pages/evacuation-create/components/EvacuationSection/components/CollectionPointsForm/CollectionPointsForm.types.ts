import type { EvacuationSectionConfig } from "@/pages/evacuation-create/config/evacuationSection.types";
import type { EvacuationFormValues } from "@/pages/evacuation-create/EvacuationCreatePage.types";
import type { Control, FieldArrayWithId } from "react-hook-form";

export interface CollectionPointsFormProps {
    control: Control<EvacuationFormValues>;
    infoText: EvacuationSectionConfig["collectionPointsForm"];
    isActive: boolean;
    fields:FieldArrayWithId<EvacuationFormValues, "colectionPointsForm.points">[]
    onAddPoint: () => void;
    onRemovePoint: (index: number) => void;
}