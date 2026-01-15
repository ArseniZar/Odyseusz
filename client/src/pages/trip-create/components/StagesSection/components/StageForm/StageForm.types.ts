import type { StagesSectionConfig } from "../../../../config/stagesSection.config.types";
import type { StagesValue } from "../../../../TripCreatePage.types";
import type { Control, FieldErrors } from "react-hook-form";

export interface StageFormProps {
  stageNumber: number;
  infoText: StagesSectionConfig;
  index: number;
  control: Control<StagesValue>;
  errors?: FieldErrors<StagesValue["stages"][number]> ;
  onDelete: (index: number) => void;
  prevDateRange: StagesValue["stages"][number]["dateRange"] | null;
  nextDateRange: StagesValue["stages"][number]["dateRange"] | null;
}