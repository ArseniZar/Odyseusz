import { useForm, useFieldArray } from "react-hook-form";
import type { JSX } from "react";

import { StagesSection } from "./components/StagesSection/StagesSection";
import { InformationSection } from "./components/InformationSection/InformationSection";

import { informationSectionConfig } from "./config/informationSection.config";
import { stagesSectionConfig } from "./config/stagesSection.config";
import { pageConfig } from "./config/page.config";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";

import type { TripFormValue, StageFormValues, TripCreatePageProps } from "./TripCreatePage.types";

const defaultStage:StageFormValues = {
  numberOfPeople: stagesSectionConfig.stage.numberOfPeople.defaultValue,
  coordinates: {
    latitude: stagesSectionConfig.stage.coordinates.defaultValue?.latitude ?? null,
    longitude: stagesSectionConfig.stage.coordinates.defaultValue?.longitude ?? null,
  },
  dateRange: {
    startDate: stagesSectionConfig.stage.dateRange.defaultValue?.startDate ?? null,
    endDate: stagesSectionConfig.stage.dateRange.defaultValue?.endDate ?? null,
  },
};

export const TripCreatePage = ({}: TripCreatePageProps): JSX.Element => {
  const { control, handleSubmit, watch } = useForm<TripFormValue>({
    mode: "all",
    defaultValues: {
      stages: [defaultStage],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stages",
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
          <Title className="text-5xl font-normal" title={pageConfig.title} />
          <div className="mt-7 flex-1 flex flex-row justify-between overflow-hidden">
            <InformationSection
              infoText={informationSectionConfig}
              stages={watch("stages")}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
            <StagesSection
              infoText={stagesSectionConfig}
              fields={fields}
              control={control}
              onAddStage={() => append(defaultStage)}
              onRemoveStage={(index) => {fields.length > 1 && remove(index)}}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
