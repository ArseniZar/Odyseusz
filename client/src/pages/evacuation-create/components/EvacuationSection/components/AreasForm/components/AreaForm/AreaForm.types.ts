import type { EvacuationSectionConfig } from "../../../../../../config/evacuationSection.types";
import type { EvacuationFormValues } from "../../../../../../EvacuationCreatePage.types";
import type { Control } from "react-hook-form";

export interface AreaFormProps {
  areaNumber: number;
  infoText: EvacuationSectionConfig["areasForm"]["area"];
  index: number;
  control: Control<EvacuationFormValues>;
  onDelete: (index: number) => void;
}