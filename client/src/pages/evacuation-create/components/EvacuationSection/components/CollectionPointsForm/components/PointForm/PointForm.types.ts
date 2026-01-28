import type { EvacuationSectionConfig } from "../../../../../../config/evacuationSection.types";
import type { EvacuationFormValues } from "../../../../../../EvacuationCreatePage.types";
import type { Control } from "react-hook-form";

export interface PointFormProps {
  pointNumber: number;
  infoText: EvacuationSectionConfig["collectionPointsForm"]["point"];
  index: number;
  control: Control<EvacuationFormValues>;
  onDelete: (index: number) => void;
}