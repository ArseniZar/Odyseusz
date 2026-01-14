import type {Control, FieldArrayWithId, FormState } from "react-hook-form";

import type { StagesValue } from "../../TripCreatePage.types";
import type { StagesSectionConfig } from "../../config/stagesSection.config.types";

export interface StagesSectionProps {
  infoText: StagesSectionConfig;
  control: Control<StagesValue>;
  fields: FieldArrayWithId<StagesValue, "stages">[]
  watch:  StagesValue["stages"];
  formState: FormState<StagesValue>;
  onAddStage: () => void;
  onRemoveStage: (index: number) => void;
}