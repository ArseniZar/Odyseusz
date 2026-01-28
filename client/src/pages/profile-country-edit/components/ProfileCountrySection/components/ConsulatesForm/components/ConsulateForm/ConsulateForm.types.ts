import type { ProfileCountrySectionConfig } from "../../../../../../config/profileCountrySection.config.types";
import type { InformationSectionConfig } from "../../../../../../config/informationSection.config.types";
import type { ProfileCountryValues } from "../../../../../../ProfileCountryEditPage.types";
import type { Control } from "react-hook-form";

export interface ConsulateFormProps {
  consulateNumber?: number;
  infoText: {
    profileCountrySectionConfig:ProfileCountrySectionConfig["consulatesForm"]["consulate"];
    informationSectionConfig:InformationSectionConfig["consulate"];
  };
  index: number;
  control: Control<ProfileCountryValues>;
}
