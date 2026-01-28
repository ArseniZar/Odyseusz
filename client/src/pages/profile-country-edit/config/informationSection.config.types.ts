import type { BaseFormButtonKey, Information } from "@/types/all_types";
import type { InformationFieldConfig } from "@/types/all_types";

export interface InformationSectionConfig extends Information {
  title: string;
  dangerLevel: FormInformationFieldConfig;
  name: FormInformationFieldConfig;
  description: FormInformationFieldConfig;
  countryCode: FormInformationFieldConfig;
  dataUpdate: FormInformationFieldConfig;

  consulate:{
    title: string;
    address: FormInformationFieldConfig;
    phone: FormInformationFieldConfig;
    email: FormInformationFieldConfig;
    website: FormInformationFieldConfig;
    dataUpdate: FormInformationFieldConfig;
  }
  formButtons: Record<FormButtonKey, FormInformationFieldConfig>;
}

type FormInformationFieldConfig = Pick<InformationFieldConfig, 'label'>;
type FormButtonKey  = BaseFormButtonKey;
