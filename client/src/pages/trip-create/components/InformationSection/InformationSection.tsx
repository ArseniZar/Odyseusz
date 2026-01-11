import React from "react";

import { TripDurationInformation } from "./components/TripDurationInformation/TripDurationInformation";
import { StageInformation } from "./components/StageInformation/StageInformation";
import { FormButtons } from "./components/FormButtons/FormButtons";

import { Title } from "@/components/Title/Title";

import type { JSX } from "react";
import type { StagesInformationProps } from "./InformationSection.types";




// prettier-ignore
export const InformationSection = ({infoText,watch, onCancel, onSubmit}: StagesInformationProps): JSX.Element => {
  return (
    <section className="h-full w-1/4 flex flex-col">
      <div className="h-full flex flex-col gap-6">
        <Title className="font-light" title={"Informacje o nowej podróży"} />

        <div className="flex-1 px-6 py-4 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-hidden">
          <TripDurationInformation
            infoText={infoText}
            dataRange={{ startDate: watch[0]?.dateRange.startDate, endDate: watch[watch.length - 1]?.dateRange.endDate }}
          />
          <hr/>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            {watch.map((stage, index) => (
              <React.Fragment key={index}>
                <StageInformation
                  key={index}
                  stageNumber={index + 1}
                  infoText={infoText}
                  dataRange={stage.dateRange}
                  numberOfPeople={stage.numberOfPeople}
                />
                <hr/>
              </React.Fragment>
            ))} 
          </div>
        </div>
        <FormButtons infoText={infoText} onCancel={onCancel} onSubmit={onSubmit} className="mb-20"/>
      </div>
    </section>
  );
};
