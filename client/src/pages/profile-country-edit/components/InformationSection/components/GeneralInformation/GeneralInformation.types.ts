import type { ProfileCountryFormValues } from "@/types/forms/profileCountry";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface  GeneralInformationProps {
  name: ProfileCountryFormValues["generalInfoForm"]["name"];
  description: ProfileCountryFormValues["generalInfoForm"]["description"];
  countryCode: ProfileCountryFormValues["generalInfoForm"]["countryCode"];
  dateUpdate: ProfileCountryFormValues["generalInfoForm"]["dateUpdate"];
  dangerLevel: ProfileCountryFormValues["generalInfoForm"]["dangerLevel"];
  infoText: InformationSectionConfig;
}