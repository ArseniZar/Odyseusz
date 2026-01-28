import { Title } from "@/components/Title";
import type { JSX } from "react";
import type { InformationSectionProps } from "./InformationSection.types";
import { GeneralInformation } from "./components/GeneralInformation/GeneralInformation";
import { FormButtons } from "@/components/FormButtons";
import { PointInformation } from "./components/PointInformation/PointInformation";
import { AssistantInformation } from "./components/AssistantInformation/AssistantInformation";

// prettier-ignore
export const InformationSection = ({infoText, evacuation, onCancel,onSubmit}:InformationSectionProps): JSX.Element => {
  return (
    <section className="h-full w-1/3 flex flex-col">
      <div className="h-full flex flex-col gap-6">
        <Title className="font-light" title={infoText.title} />
        
        <div className="flex-1 px-6 py-4 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-y-auto  scrollbar-none">
          <GeneralInformation 
            infoText={infoText} 
            name={evacuation.generalInfoForm.name} 
            description={evacuation.generalInfoForm.description} 
            reason={evacuation.generalInfoForm.reason} 
            radius={evacuation.areaForm.radius} 
          />
          {evacuation.colectionPointsForm.points.map((point, index) => (
            <PointInformation 
              key={index}
              pointNumber={index + 1}
              infoText={infoText.point} 
              name={point.name} 
              description={point.description} 
            />
          ))} 
          {evacuation.assistantsForm.assistants.map((assistant, index) => (
            assistant.isActive && (
            <AssistantInformation 
              key={index}
              assistantNumber={index + 1}
              infoText={infoText.assistant} 
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
