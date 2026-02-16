import type { BaseFormButtonKey, Information, InformationFieldConfig} from "@/types/config";
import type { DangerLevel } from "@/types/domain/profileCountry";

export interface InformationSectionConfig extends Information {
  title: string;
  dangerLevel: FormInformationFieldConfig & {
    options: Record<DangerLevel, string>;
  };
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
