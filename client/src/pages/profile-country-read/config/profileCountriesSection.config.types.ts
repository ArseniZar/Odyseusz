import type { InformationFieldConfig } from "@/types/config";
import type { DangerLevel, ProfileCountry } from "@/types/domain/profileCountry";

export interface ProfileContriesSectionConfig {
  dangerLevel: ProfileCountryInformationFieldConfig & {
    options: Record<DangerLevel, string>;
  };
  name: ProfileCountryInformationFieldConfig;
  description: ProfileCountryInformationFieldConfig;
  countryCode: ProfileCountryInformationFieldConfig;
  dataUpdate: ProfileCountryInformationFieldConfig;
  consulate:{
    title: string;
    address: ProfileCountryInformationFieldConfig;
    phone: ProfileCountryInformationFieldConfig;
    email: ProfileCountryInformationFieldConfig;
    website: ProfileCountryInformationFieldConfig;
    dataUpdate: ProfileCountryInformationFieldConfig;
  }
  profileCountryButtons: Record<ProfileCountryButtonKey,ProfileCountryInformationFieldConfig>;
  showButtons: Record<ProfileCountryButtonKey, ProfileCountry["canEdit"][]>;
}

type ProfileCountryInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type ProfileCountryButtonKey = "edit" |  "details";
