import type { BaseFormButtonKey, Information, InformationFieldConfig } from "@/types/config";

export interface InformationSectionConfig extends Information {
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
  formButtons: Record<FormButtonKey, InformationFieldConfig>;
}

type FormInformationFieldConfig = Pick<InformationFieldConfig, 'label'>;
type FormButtonKey  = BaseFormButtonKey;