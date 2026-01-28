import type { ProfileCountryValues } from "../../../../ProfileCountryEditPage.types";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface  GeneralInformationProps {
  name: ProfileCountryValues["generalInfoForm"]["name"];
  description: ProfileCountryValues["generalInfoForm"]["description"];
  countryCode: ProfileCountryValues["generalInfoForm"]["countryCode"];
  dateUpdate: ProfileCountryValues["generalInfoForm"]["dateUpdate"];
  dangerLevel: ProfileCountryValues["generalInfoForm"]["dangerLevel"];
  infoText: InformationSectionConfig;
}