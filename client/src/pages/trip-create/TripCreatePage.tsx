import { useForm } from "react-hook-form";
import type { JSX } from "react";

import { StagesSection } from "./components/StagesSection/StagesSection";
import { InformationSection } from "./components/InformationSection/InformationSection";

import { informationSectionConfig } from "./config/informationSection.config";
import { stagesSectionConfig } from "./config/stagesSection.config";
import { pageConfig } from "./config/page.config";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";

import type { StagesValue, TripCreatePageProps } from "./TripCreatePage.types";

export const TripCreatePage = ({}:TripCreatePageProps): JSX.Element => {
  const { control, handleSubmit, watch, formState } = useForm<StagesValue>({
    mode: "all",
    defaultValues: {
      stages: [
        {
          numberOfPeople: stagesSectionConfig.numberOfPeople.defaultValue,
          coordinates: {
            latitude: stagesSectionConfig.coordinates.defaultValue?.latitude,
            longitude:
              stagesSectionConfig.coordinates.defaultValue?.longitude,
          },
          dateRange: {
            startDate: stagesSectionConfig.dateRange.defaultValue?.startDate,
            endDate: stagesSectionConfig.dateRange.defaultValue?.endDate,
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
          <Title className="text-5xl font-normal" title={pageConfig.title}/>
          <div className="mt-7 flex-1 flex flex-row justify-between overflow-hidden">
            <InformationSection
              infoText={informationSectionConfig}
              watch={watch("stages")}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
            <StagesSection
              infoText={stagesSectionConfig}
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
