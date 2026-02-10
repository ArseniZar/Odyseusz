import type { ProfileCountrySectionConfig } from "../../../../config/profileCountrySection.config.types";
import type { ProfileCountryFormValues } from "@/types/forms/profileCountry";
import type { Control } from "react-hook-form";

export interface GeneralInfoFormProps {
    infoText: ProfileCountrySectionConfig["generalInfoForm"];
    control: Control<ProfileCountryFormValues>;
    isActive: boolean;
}