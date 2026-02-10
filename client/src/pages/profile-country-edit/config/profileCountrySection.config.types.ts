import type { FormFieldConfig } from "@/types/config";

export interface ProfileCountrySectionConfig {
  generalInfoForm: {
    title: string;
    description: FormFieldConfig<string>;
  };
  consulatesForm: {
    title: string;
    consulate: {
      isActive: FormFieldConfig<boolean>;
    };
  };
}
