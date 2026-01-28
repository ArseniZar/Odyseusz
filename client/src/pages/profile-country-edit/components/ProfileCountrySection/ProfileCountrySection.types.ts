import type { Control, FieldArrayWithId } from "react-hook-form";
import type { InformationSectionConfig } from "../../config/informationSection.config.types";
import type { ProfileCountrySectionConfig } from "../../config/profileCountrySection.config.types";
import type { ProfileCountryValues } from "../../ProfileCountryEditPage.types";

export interface ProfileCountrySectionProps {
  infoText: {
    profileCountrySectionConfig:ProfileCountrySectionConfig;
    informationSectionConfig: InformationSectionConfig;
  };
  control: Control<ProfileCountryValues>;
  fieldsConsulates: FieldArrayWithId<ProfileCountryValues, "consulatesForm.consulates">[];
}

export const ProfileCountryStep = {
  GeneralInfo: "generalInfo",
  Consulates: "consulates",
}

export type ProfileCountryStep = (typeof ProfileCountryStep)[keyof typeof ProfileCountryStep];