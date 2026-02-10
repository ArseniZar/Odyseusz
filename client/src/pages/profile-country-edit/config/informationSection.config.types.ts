import type { BaseFormButtonKey, Information, InformationFieldConfig} from "@/types/config";

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
