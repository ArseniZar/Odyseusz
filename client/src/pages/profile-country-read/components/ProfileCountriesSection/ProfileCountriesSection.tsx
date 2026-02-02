import { ProfileCountryInformation } from "./components/EvacuationInformation/ProfileCountryInformation";
import type { JSX } from "react";
import type { ProfileCountriesSectionProps } from "./ProfileCountriesSection.types";

export const ProfileCountriesSection = ({ infoText, profilesCountries, onEdit}: ProfileCountriesSectionProps): JSX.Element => {
  return (
    <section className="w-full flex-1 flex flex-col overflow-hidden">
      <div className="h-full px-10 pb-10 flex flex-col gap-6 overflow-y-auto">
        {profilesCountries.map((profileCountry) => (
          <ProfileCountryInformation
            key={profileCountry.id}
            infoText={infoText}
            dangerLevel={profileCountry.dangerLevel}
            name={profileCountry.name}
            description={profileCountry.description}
            countryCode={profileCountry.countryCode}
            consulates={profileCountry.consulates}
            dataUpdate={profileCountry.dataUpdate}
            isEditable={profileCountry.isEditable}
            onEdit={() => onEdit(profileCountry.id)}           
            />
        ))}
      </div>
    </section>
  );
};
