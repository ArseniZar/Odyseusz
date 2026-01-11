import { useForm } from "react-hook-form";
import type { JSX } from "react";

import { StagesSection } from "./StagesSection/components/StagesSection";
import { InformationSection } from "./InformationSection/components/InformationSection";

import { tripInformationSectionConfig } from "../config/informationSection.config";
import { tripStagesSectionConfig } from "../config/stagesSection.config";

import { Header } from "@/components/Header";

import type { StagesValue } from "./TripCreatePage.type";

export const TripCreatePage = (): JSX.Element => {
  const { control, handleSubmit, watch, formState } = useForm<StagesValue>({
    mode: "all",
    defaultValues: {
      stages: [
        {
          numberOfPeople: tripStagesSectionConfig.numberOfPeople.defaultValue,
          coordinates: {
            latitude: tripStagesSectionConfig.coordinates.defaultValue.latitude,
            longitude:
              tripStagesSectionConfig.coordinates.defaultValue.longitude,
          },
          dateRange: {
            startDate: tripStagesSectionConfig.dateRange.defaultValue.startDate,
            endDate: tripStagesSectionConfig.dateRange.defaultValue.endDate,
          },
        }
      ],
    },
  });

  const onCancel = () => {
    console.log("Cancel clicked");
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Submit clicked", data);
  });

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-col">
          <h1 className="text-5xl"> Nowa podróż </h1>
          <div className="mt-7 flex-1 flex flex-row justify-between overflow-hidden">
            <InformationSection
              infoText={tripInformationSectionConfig}
              watch={watch("stages")}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
            <StagesSection
              infoText={tripStagesSectionConfig}
              control={control}
              watch={watch("stages")}
              formState={formState}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
