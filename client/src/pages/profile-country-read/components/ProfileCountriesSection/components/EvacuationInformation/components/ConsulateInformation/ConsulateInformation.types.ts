import type { ProfileCountry } from "@/types/all_types";
import type { ProfileContriesSectionConfig } from "../../../../../../config/profileCountriesSection.config.types";

type ProfileCountryInfo = Pick<ProfileCountry["consulates"][number],'email' | 'address' | 'phone' | 'website'>;

export interface ConsulateInformationProps extends ProfileCountryInfo {
  consulateNumber: number;
  infoText: ProfileContriesSectionConfig["consulate"];
}