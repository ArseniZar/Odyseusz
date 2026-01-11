import type { Control, FormState } from "react-hook-form";

import type { StagesValue } from "../../TripCreatePage.types";
import type { StagesSectionConfig } from "../../../config/stagesSection.config.types";

export interface StagesSectionProps {
  infoText: StagesSectionConfig;
  control: Control<StagesValue>;
  watch:  StagesValue["stages"];
  formState: FormState<StagesValue>;
}