import type { EvacuationSectionConfig } from "@/pages/evacuation-create/config/evacuationSection.types";
import type { EvacuationFormValues } from "@/pages/evacuation-create/EvacuationCreatePage.types";
import type { Control } from "react-hook-form";

export interface PointFormProps {
  pointNumber: number;
  infoText: EvacuationSectionConfig["collectionPointsForm"]["point"];
  index: number;
  control: Control<EvacuationFormValues>;
  onDelete: (index: number) => void;
}