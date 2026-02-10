import type { BaseFormButtonKey, Information, InformationFieldConfig } from "@/types/config";

export interface InformationSectionConfig extends Information{
  title: string;
  iconEwacuation: string;
  name: FormInformationFieldConfig;
  reason: FormInformationFieldConfig;
  description: FormInformationFieldConfig;
  area: {
    title: string;
    radius: FormInformationFieldConfig;
  };
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