import type { Control, FormState } from "react-hook-form";

import type { StagesValue } from "../../TripCreatePage.type";
import type { StagesSectionConfig } from "../../../config/stagesSection.config.type";

export interface StagesSectionProps {
  infoText: StagesSectionConfig;
  control: Control<StagesValue>;
  watch:  StagesValue["stages"];
  formState: FormState<StagesValue>;
}