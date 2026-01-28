import { useState, type JSX } from "react";
import { ProfileCountryStep, type ProfileCountrySectionProps } from "./ProfileCountrySection.types";
import { SectionHeader } from "@/components/SectionHeader";
import { GeneralInfoForm } from "./components/GeneralInfoForm/GeneralInfoForm";
import { ConsulatesForm } from "./components/ConsulatesForm/ConsulatesForm";

export const EvacuationSection = ({infoText, control,fieldsConsulates}:ProfileCountrySectionProps): JSX.Element => {
  const [activeStep, setActiveStep] = useState<ProfileCountryStep>(
  ProfileCountryStep.GeneralInfo
);

  const sections = [
    { id: ProfileCountryStep.GeneralInfo, title: infoText.profileCountrySectionConfig.generalInfoForm.title },
    { id: ProfileCountryStep.Consulates,  title: infoText.profileCountrySectionConfig.consulatesForm.title },
  ];

  return (
    <section className="h-full w-1/2 flex flex-col">
      <div className="h-full flex flex-col gap-4">
        <SectionHeader sections={sections} isActive={activeStep} onClick={setActiveStep}/>
        <GeneralInfoForm control={control} infoText={infoText.profileCountrySectionConfig.generalInfoForm} isActive={ProfileCountryStep.GeneralInfo === activeStep}/>
        <ConsulatesForm control={control} infoText={{profileCountrySectionConfig:infoText.profileCountrySectionConfig.consulatesForm, informationSectionConfig:infoText.informationSectionConfig.consulate}} isActive={ProfileCountryStep.Consulates === activeStep} fields={fieldsConsulates}/>
      </div>
    </section>
  );
};