import type { ProfileCountrySectionConfig } from "../../../../config/profileCountrySection.config.types";
import type { ProfileCountryValues } from "../../../../ProfileCountryEditPage.types";
import type { Control } from "react-hook-form";

export interface GeneralInfoFormProps {
    infoText: ProfileCountrySectionConfig["generalInfoForm"];
    control: Control<ProfileCountryValues>;
    isActive: boolean;
}