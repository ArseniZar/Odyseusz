import type { FormFieldConfig } from "@/types/all_types";

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
