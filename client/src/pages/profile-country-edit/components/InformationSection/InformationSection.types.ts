import type { InformationSectionConfig } from "../../config/informationSection.config.types";
import type { ProfileCountryFormValues } from "@/types/forms/profileCountry";

export interface InformationSectionProps {
  infoText: InformationSectionConfig;
  profileCountry: ProfileCountryFormValues;
  onCancel: () => void;
  onSubmit: () => void;

}