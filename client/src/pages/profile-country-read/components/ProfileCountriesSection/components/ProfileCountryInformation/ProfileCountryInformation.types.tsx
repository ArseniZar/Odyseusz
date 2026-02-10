import type { ProfileCountry } from "@/types/domain/profileCountry";
import type { ProfileContriesSectionConfig } from "../../../../config/profileCountriesSection.config.types";

type ProfileCountryInfo = Pick<ProfileCountry, 'dangerLevel' | 'name' | 'description' | 'countryCode' | 'consulates' | "dataUpdate" | "canEdit">;

export interface ProfileCountryInformationProps extends ProfileCountryInfo {
    infoText: ProfileContriesSectionConfig;
    onEdit: () => void;
}