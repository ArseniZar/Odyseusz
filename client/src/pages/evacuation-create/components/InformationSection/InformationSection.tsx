import { Title } from "@/components/Title";
import type { JSX } from "react";
import type { InformationSectionProps } from "./InformationSection.types";
import { EvacuationGeneralInformation } from "./components/EvacuationDurationInformation/EvacuationGeneralInformation";
import { FormButtons } from "@/components/FormButtons";
import { CollectionPointsInformation } from "./components/CollectionPointsInformation/CollectionPointsInformation";
import { AssistantsInformation } from "./components/AssistantsInformation/AssistantsInformation";

const area = (radius: number | null): number | null =>
  radius === null ? null : Number((Math.PI * radius ** 2).toFixed(2));

// prettier-ignore
export const InformationSection = ({infoText, evacuation, onCancel,onSubmit}:InformationSectionProps): JSX.Element => {
  return (
    <section className="h-full w-1/3 flex flex-col">
      <div className="h-full flex flex-col gap-6">
        <Title className="font-light" title={infoText.title} />
        
        <div className="flex-1 px-6 py-4 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-y-auto  scrollbar-none">
          <EvacuationGeneralInformation 
            infoText={infoText} 
            name={evacuation.generalInfoForm.name} 
            description={evacuation.generalInfoForm.description} 
            reason={evacuation.generalInfoForm.reason} 
            area={area(evacuation.areaForm.radius)} 
          />
          {evacuation.colectionPointsForm.points.map((collectionPoints, index) => (
            <CollectionPointsInformation 
              key={index}
              collectionPointsNumber={index + 1}
              infoText={infoText.collectionPoints} 
              name={collectionPoints.name} 
              description={collectionPoints.description} 
            />
          ))} 
          {evacuation.assistantsForm.assistants.map((assistant, index) => (
            assistant.isActive && (
            <AssistantsInformation 
              key={index}
              assistantsNumber={index + 1}
              infoText={infoText.assistants} 
              name={assistant.name}
              workingHours={assistant.workingHours}
              phone={assistant.phone}
              email={assistant.email} 
            />)
          ))} 
        </div>
        <FormButtons infoText={infoText} className="mb-5" onCancel={onCancel} onSubmit={onSubmit}/> 
      </div>
    </section>
  );
}
