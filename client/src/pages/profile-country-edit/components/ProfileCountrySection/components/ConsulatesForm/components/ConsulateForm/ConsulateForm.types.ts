import type { ProfileCountrySectionConfig } from "../../../../../../config/profileCountrySection.config.types";
import type { InformationSectionConfig } from "../../../../../../config/informationSection.config.types";
import type { ProfileCountryFormValues } from "@/types/forms/profileCountry";
import type { Control } from "react-hook-form";

export interface ConsulateFormProps {
  consulateNumber?: number;
  infoText: {
    profileCountrySectionConfig:ProfileCountrySectionConfig["consulatesForm"]["consulate"];
    informationSectionConfig:InformationSectionConfig["consulate"];
  };
  index: number;
  control: Control<ProfileCountryFormValues>;
}
