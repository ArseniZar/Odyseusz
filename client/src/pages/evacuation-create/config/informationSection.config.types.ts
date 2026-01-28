import type { BaseFormButtonKey, Information, InformationFieldConfig } from "@/types/all_types";

export interface InformationSectionConfig extends Information{
  title: string;
  iconEwacuation: string;
  name: FormInformationFieldConfig;
  reason: FormInformationFieldConfig;
  description: FormInformationFieldConfig;
  area: FormInformationFieldConfig;
  point:{
    title: string;
    name: FormInformationFieldConfig;
    description: FormInformationFieldConfig;
  };
  assistant: {
    title: string;
    name: FormInformationFieldConfig;
    workingHours: FormInformationFieldConfig;
    phone: FormInformationFieldConfig;
    email: FormInformationFieldConfig;
  };

  formButtons: Record<FormButtonKey, FormInformationFieldConfig>;
}

type FormInformationFieldConfig = Pick<InformationFieldConfig, 'label'>;
type FormButtonKey  = BaseFormButtonKey;