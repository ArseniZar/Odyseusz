import { Title } from "@/components/Title";
import type { JSX } from "react";
import type { InformationSectionProps } from "./InformationSection.types";
import { GeneralInformation } from "./components/GeneralInformation/GeneralInformation";
import { FormButtons } from "@/components/FormButtons";
import { ConsulateInformation } from "./components/ConsulateInformation/ConsulateInformation";

// prettier-ignore
export const InformationSection = ({infoText, profileCountry, onCancel,onSubmit}:InformationSectionProps): JSX.Element => {
  return (
    <section className="h-full w-1/3 flex flex-col">
      <div className="h-full flex flex-col gap-6">
        <Title className="font-light" title={infoText.title} />
        
        <div className="flex-1 px-6 py-4 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-y-auto  scrollbar-none">
          <GeneralInformation 
            infoText={infoText} 
            name={profileCountry.generalInfoForm.name} 
            description={profileCountry.generalInfoForm.description} 
            countryCode={profileCountry.generalInfoForm.countryCode}
            dateUpdate={profileCountry.generalInfoForm.dateUpdate}
            dangerLevel={profileCountry.generalInfoForm.dangerLevel}
          />
          {profileCountry.consulatesForm.consulates.map((consulate, index) => (
            consulate.isActive && (
            <ConsulateInformation 
              key={index}
              consulateNumber={index + 1}
              infoText={infoText.consulate} 
              address={consulate.address}
              phone={consulate.phone}
              email={consulate.email}
              website={consulate.website}
              dataUpdate={consulate.dataUpdate}
            />)
          ))} 
        </div>
        <FormButtons infoText={infoText} className="mb-5" onCancel={onCancel} onSubmit={onSubmit}/> 
      </div>
    </section>
  );
}
