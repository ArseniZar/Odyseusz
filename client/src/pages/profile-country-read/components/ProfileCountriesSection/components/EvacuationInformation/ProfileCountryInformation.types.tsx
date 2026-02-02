import type { ProfileCountry } from "@/types/all_types";
import type { ProfileContriesSectionConfig } from "../../../../config/profileCountriesSection.config.types";

type ProfileCountryInfo = Pick<ProfileCountry, 'dangerLevel' | 'name' | 'description' | 'countryCode' | 'consulates' | "dataUpdate" | "isEditable">;

export interface ProfileCountryInformationProps extends ProfileCountryInfo {
    infoText: ProfileContriesSectionConfig;
    onEdit: () => void;
}