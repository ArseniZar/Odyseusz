import type { ProfileCountry } from "@/types/all_types";
import type { ProfileContriesSectionConfig } from "../../config/profileCountriesSection.config.types";

export interface ProfileCountriesSectionProps{
  infoText: ProfileContriesSectionConfig
  profilesCountries: ProfileCountry[];
  onEdit: (profileCountryId: number) => void;
}
