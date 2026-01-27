import React from "react";

import { TripDurationInformation } from "./components/TripDurationInformation/TripDurationInformation";
import { StageInformation } from "./components/StageInformation/StageInformation";

import { Title } from "@/components/Title";
import { FormButtons } from "@/components/FormButtons";

import type { JSX } from "react";
import type { StagesInformationProps } from "./InformationSection.types";




// prettier-ignore
export const InformationSection = ({infoText,stages, onCancel, onSubmit}: StagesInformationProps): JSX.Element => {
  return (
    <section className="h-full w-1/4 flex flex-col">
      <div className="h-full flex flex-col gap-6">
        <Title className="font-light" title={infoText.title} />

        <div className="flex-1 px-6 py-4 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-hidden">
          <TripDurationInformation
            infoText={infoText}
            dataRange={{ startDate: stages[0]?.dateRange.startDate, endDate: stages[stages.length - 1]?.dateRange.endDate }}
          />
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            {stages.map((stage, index) => (
                <StageInformation
                  key={index}
                  stageNumber={index + 1}
                  infoText={infoText}
                  dataRange={stage.dateRange}
                  numberOfPeople={stage.numberOfPeople}
                />
            ))} 
          </div>
        </div>
        <FormButtons infoText={infoText} onCancel={onCancel} onSubmit={onSubmit} className="mb-20"/>
      </div>
    </section>
  );
};
