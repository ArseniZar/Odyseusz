import type {Control, FieldArrayWithId } from "react-hook-form";

import type { TripFormValue } from "@/types/forms/trip";
import type { StagesSectionConfig } from "../../config/stagesSection.config.types";

export interface StagesSectionProps {
  infoText: StagesSectionConfig;
  control: Control<TripFormValue>;
  fields: FieldArrayWithId<TripFormValue, "stages">[]
  onAddStage: () => void;
  onRemoveStage: (index: number) => void;
}