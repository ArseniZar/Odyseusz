import type {Control, FieldArrayWithId, FormState } from "react-hook-form";

import type { TripFormValue } from "../../TripCreatePage.types";
import type { StagesSectionConfig } from "../../config/stagesSection.config.types";

export interface StagesSectionProps {
  infoText: StagesSectionConfig;
  control: Control<TripFormValue>;
  fields: FieldArrayWithId<TripFormValue, "stages">[]
  onAddStage: () => void;
  onRemoveStage: (index: number) => void;
}