import { useFieldArray} from "react-hook-form"
import type { JSX } from "react";

import { StageForm } from "./StageForm/StageForm";
import { IconButton } from "@/components/IconButton";

import type { StagesSectionProps } from "./StagesSection.type";

import { TitleSection } from "@/components/TitleSection";
import { iconAdd } from "@/assets/";




export const StagesSection = ({infoText, control, watch, formState }: StagesSectionProps): JSX.Element => {
  const { fields, append, remove} = useFieldArray({
    control,
    name: "stages",
  });

  return (
    <section className="h-full w-5/9 flex flex-col">
      <div className="h-full px-30 pb-5 flex flex-col gap-6 overflow-y-auto">
        <div className="px-2 flex flex-row items-center justify-between">
          <TitleSection title={infoText.title} />
          <IconButton icon={iconAdd} classIcon="w-9 h-9 p-1" classButton="opacity-50 rounded-2xl" onClick={() => {
              append({
                numberOfPeople: infoText.numberOfPeople.defaultValue,
                coordinates: {
                  latitude: infoText.coordinates.defaultValue.latitude,
                  longitude: infoText.coordinates.defaultValue.longitude,
                },
                dateRange: { 
                  startDate: infoText.dateRange.defaultValue.startDate, 
                  endDate: infoText.dateRange.defaultValue.endDate 
                },
              });
            }}/>
        </div>

        {fields.map((field, index) => (
          <StageForm
            key={field.id}
            index={index}
            control={control}
            errors={formState.errors.stages?.[index]}
            stageNumber={index + 1}
            infoText={infoText}
            onDelete={remove}
            prevData={watch[index - 1] || null}
            nextData={watch[index + 1] || null}
          />
        ))}
      </div>
    </section>
  );
};
