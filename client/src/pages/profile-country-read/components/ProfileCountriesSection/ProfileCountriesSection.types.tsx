import type { ProfileCountry } from "@/types/domain/profileCountry";
import type { ProfileContriesSectionConfig } from "../../config/profileCountriesSection.config.types";

export interface ProfileCountriesSectionProps{
  infoText: ProfileContriesSectionConfig
  profilesCountries: ProfileCountry[];
  onEdit: (profileCountryId: number) => void;
}
