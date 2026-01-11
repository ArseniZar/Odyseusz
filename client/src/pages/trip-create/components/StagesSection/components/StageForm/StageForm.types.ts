import type { StagesSectionConfig } from "../../../../config/stagesSection.config.type";
import type { StageFormValues, StagesValue } from "../../../../components/TripCreatePage.type";
import type { Control, FieldErrors } from "react-hook-form";

export interface StageFormProps {
  stageNumber: number;
  infoText: StagesSectionConfig;
  index: number;
  control: Control<StagesValue>;
  errors?: FieldErrors<StagesValue["stages"][number]> ;
  onDelete: (index: number) => void;
  prevData: StageFormValues | null;
  nextData: StageFormValues | null;
}