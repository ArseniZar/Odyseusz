import { SectionHeader } from "@/components/SectionHeader";
import { useState, type JSX } from "react";
import { EvacuationStep, type EvacuationSectionProps } from "./EvacuationSection.type";
import { GeneralInfoForm } from "./components/GeneralInfoForm/GeneralInfoForm";
import { AreaForm } from "./components/AreaForm/AreaForm";
import { CollectionPointsForm } from "./components/CollectionPointsForm/CollectionPointsForm";
import { AssistantsForm } from "./components/AssistantsForm/AssistantsForm";


export const EvacuationSection = ({infoText, control,fieldsPoints, fieldsAssistans,onAddPoint,onRemovePoint}:EvacuationSectionProps): JSX.Element => {
  const [activeStep, setActiveStep] = useState<EvacuationStep>(
  EvacuationStep.GeneralInfo
);

  const sections = [
    { id: EvacuationStep.GeneralInfo, title: infoText.evacuationSectionConfig.generalInfoForm.title },
    { id: EvacuationStep.Area,        title: infoText.evacuationSectionConfig.areaForm.title },
    { id: EvacuationStep.CollectionPoints, title: infoText.evacuationSectionConfig.collectionPointsForm.title },
    { id: EvacuationStep.Assistants,   title: infoText.evacuationSectionConfig.assistantsForm.title },
  ];

  return (
    <section className="h-full w-1/2 flex flex-col">
      <div className="h-full flex flex-col gap-4">
        <SectionHeader sections={sections} isActive={activeStep} onClick={setActiveStep}/>
        <GeneralInfoForm control={control} infoText={infoText.evacuationSectionConfig.generalInfoForm} isActive={EvacuationStep.GeneralInfo === activeStep} />
        <AreaForm control={control} infoText={infoText.evacuationSectionConfig.areaForm} isActive={EvacuationStep.Area === activeStep} />
        <CollectionPointsForm control={control} infoText={infoText.evacuationSectionConfig.collectionPointsForm} isActive={EvacuationStep.CollectionPoints === activeStep} fields={fieldsPoints} onAddPoint={onAddPoint} onRemovePoint={onRemovePoint}/>
        <AssistantsForm control={control} infoText={{evacuationSectionConfig:infoText.evacuationSectionConfig.assistantsForm, informationSectionConfig:infoText.informationSectionConfig.assistant}} isActive={EvacuationStep.Assistants === activeStep} fields={fieldsAssistans}/>
      </div>
    </section>
  );
};
 