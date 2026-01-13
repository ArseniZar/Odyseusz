import type { InformationFieldConfig } from "@/types/all_types";

export interface InformationSectionConfig {
  title: string;
  iconTrip: string;
  
  dateRange: {
    startDate: FormInformationFieldConfig;
    endDate: FormInformationFieldConfig;
  };
  
  stage: {
    title: string;
    numberOfPeople: FormInformationFieldConfig;
    dateRange: FormInformationFieldConfig;
  };
  formButtons: Record<FormButtonKey, FormInformationFieldConfig>;
}

type FormInformationFieldConfig = Pick<InformationFieldConfig, 'label'>;
type FormButtonKey = "submit" | "cancel";