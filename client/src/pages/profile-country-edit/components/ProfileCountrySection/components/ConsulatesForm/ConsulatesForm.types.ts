import type { ProfileCountryValues } from "@/pages/profile-country-edit/ProfileCountryEditPage.types";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";
import type { Control, FieldArrayWithId } from "react-hook-form";
import type { ProfileCountrySectionConfig } from "@/pages/profile-country-edit/config/profileCountrySection.config.types";

export interface ConsulatesFormProps {
    control: Control<ProfileCountryValues>;
    infoText: {
        profileCountrySectionConfig:ProfileCountrySectionConfig["consulatesForm"];
        informationSectionConfig: InformationSectionConfig["consulate"];
    };
    isActive: boolean;
    fields:FieldArrayWithId<ProfileCountryValues, "consulatesForm.consulates">[]
}