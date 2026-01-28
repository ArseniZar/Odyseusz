import type { Control, FieldArrayWithId } from "react-hook-form";
import type { EvacuationSectionConfig } from "../../config/evacuationSection.types";
import type { EvacuationFormValues } from "../../EvacuationCreatePage.types";
import type { InformationSectionConfig } from "../../config/informationSection.config.types";

export interface EvacuationSectionProps {
  infoText: {
    evacuationSectionConfig:EvacuationSectionConfig;
    informationSectionConfig:InformationSectionConfig;
  };
  control: Control<EvacuationFormValues>;
  fieldsPoints: FieldArrayWithId<EvacuationFormValues, "colectionPointsForm.points">[];
  fieldsAssistans: FieldArrayWithId<EvacuationFormValues, "assistantsForm.assistants">[];
  onAddPoint: () => void;
  onRemovePoint: (index: number) => void;
}

export const EvacuationStep = {
  GeneralInfo: "generalInfo",
  Area: "area",
  CollectionPoints: "collectionPoints",
  Assistants: "assistants",
}

export type EvacuationStep = (typeof EvacuationStep)[keyof typeof EvacuationStep];