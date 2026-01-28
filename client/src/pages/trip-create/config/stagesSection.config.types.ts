import type { Coordinates, DataRange, FormFieldConfig } from "@/types/all_types";

export interface StagesSectionConfig {
  title: string;
  stage: {
    titleStage: string;
    numberOfPeople: FormFieldConfig<number>;
    coordinates: FormFieldConfig<Coordinates>;
    dateRange: FormFieldConfig<DataRange>;
  };
}


