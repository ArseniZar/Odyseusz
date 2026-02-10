import type { StagesSectionConfig } from "../../../../config/stagesSection.config.types";
import type { TripFormValue } from "@/types/forms/trip";
import type { Control } from "react-hook-form";

export interface StageFormProps {
  stageNumber: number;
  infoText: StagesSectionConfig["stage"];
  index: number;
  control: Control<TripFormValue>;
  onDelete: (index: number) => void;
  prevDateRange: TripFormValue["stages"][number]["dateRange"] | null;
  nextDateRange: TripFormValue["stages"][number]["dateRange"] | null;
}