import type { ProfileCountry } from "@/types/domain/profileCountry";
import type { ProfileContriesSectionConfig } from "../../../../../../config/profileCountriesSection.config.types";

type ProfileCountryInfo = Pick<ProfileCountry, 'description' | 'countryCode' | 'dataUpdate'>;

export interface GeneralInformationProps extends ProfileCountryInfo {
    infoText: ProfileContriesSectionConfig;
    
}      