import type { Coordinates, FormFieldConfig } from "@/types/all_types";

export interface StagesSectionConfig {
  title: string;
  stage: {
    titleStage: string;
    numberOfPeople: FormFieldConfig<number>;
    coordinates: FormFieldConfig<Coordinates>;
    dateRange: FormFieldConfig<DataRange>;
  };
}

export interface DataRange {
  startDate: Date | null;
  endDate: Date | null;
}
