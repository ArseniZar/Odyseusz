import { EvacuationInformation } from "./components/EvacuationInformation/EvacuationInformation";
import type { JSX } from "react";
import type { EvacuationsSectionProps } from "./EvacuationsSection.types";

export const EvacuationsSection = ({ infoText, evacuations, onActive, onCancel}: EvacuationsSectionProps): JSX.Element => {
  return (
    <section className="w-full flex-1 flex flex-col overflow-hidden">
      <div className="h-full px-10 pb-10 flex flex-col gap-6 overflow-y-auto">
        {evacuations.map((evacuation) => (
          <EvacuationInformation
            key={evacuation.id}
            infoText={infoText}
            status={evacuation.status}
            name={evacuation.name}
            area={evacuation.area}
            assistants={evacuation.assistants}
            collectionPoints={evacuation.collectionPoints}
            description={evacuation.description}
            reason={evacuation.reason}
            dataLastActivated={evacuation.dataLastActivated}
            onActive={() => onActive(evacuation.id)}
            onCancel={() => onCancel(evacuation.id)}
          />
        ))}
      </div>
    </section>
  );
};
