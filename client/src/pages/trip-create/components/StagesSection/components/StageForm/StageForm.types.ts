import type { StagesSectionConfig } from "../../../../config/stagesSection.config.types";
import type { StagesValue } from "../../../../TripCreatePage.types";
import type { Control } from "react-hook-form";

export interface StageFormProps {
  stageNumber: number;
  infoText: StagesSectionConfig["stage"];
  index: number;
  control: Control<StagesValue>;
  onDelete: (index: number) => void;
  prevDateRange: StagesValue["stages"][number]["dateRange"] | null;
  nextDateRange: StagesValue["stages"][number]["dateRange"] | null;
}