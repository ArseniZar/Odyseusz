import type { InformationSectionConfig } from "../../config/informationSection.config.types";
import type { ProfileCountryValues } from "../../ProfileCountryEditPage.types";

export interface InformationSectionProps {
  infoText: InformationSectionConfig;
  profileCountry: ProfileCountryValues;
  onCancel: () => void;
  onSubmit: () => void;

}