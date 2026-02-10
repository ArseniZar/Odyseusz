import type { ProfileCountryFormValues } from "@/types/forms/profileCountry";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";
import type { Control, FieldArrayWithId } from "react-hook-form";
import type { ProfileCountrySectionConfig } from "@/pages/profile-country-edit/config/profileCountrySection.config.types";

export interface ConsulatesFormProps {
    control: Control<ProfileCountryFormValues>;
    infoText: {
        profileCountrySectionConfig:ProfileCountrySectionConfig["consulatesForm"];
        informationSectionConfig: InformationSectionConfig["consulate"];
    };
    isActive: boolean;
    fields:FieldArrayWithId<ProfileCountryFormValues, "consulatesForm.consulates">[]
}