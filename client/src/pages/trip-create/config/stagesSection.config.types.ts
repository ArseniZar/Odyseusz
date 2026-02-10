import type { FormFieldConfig } from "@/types/config";
import type { Coordinates, DataRange } from "@/types/domain/common";

export interface StagesSectionConfig {
  title: string;
  stage: {
    titleStage: string;
    numberOfPeople: FormFieldConfig<number>;
    coordinates: FormFieldConfig<Coordinates>;
    dateRange: FormFieldConfig<DataRange>;
  };
}


