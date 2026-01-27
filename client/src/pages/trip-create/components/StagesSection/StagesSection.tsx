import { useWatch } from "react-hook-form";

import { StageForm } from "./components/StageForm/StageForm";
import { IconButton } from "@/components/IconButton";
import { Title } from "@/components/Title";
import { iconAdd } from "@/assets/";

import type { JSX } from "react";
import type { StagesSectionProps } from "./StagesSection.type";



// prettier-ignore
export const StagesSection = ({infoText,control, fields, onAddStage, onRemoveStage }: StagesSectionProps): JSX.Element => {
  const stages = useWatch({ name: "stages", control });
  const getNearestDateRange = (index: number, direction: 'prev' | 'next') => {
    const step = direction === 'prev' ? -1 : 1;
    for (let i = index + step; i >= 0 && i < stages.length; i += step) {
      const dr = stages[i]?.dateRange;
      if (dr?.startDate && dr?.endDate)  return dr;
    }
    return null;
  };


  return (
    <section className="h-full w-5/9 flex flex-col">
      <div className="h-full px-30 pb-10 flex flex-col gap-6 overflow-y-auto">
        <div className="px-2 flex flex-row items-center justify-between">
          <Title className="font-light" title={infoText.title} />
          <IconButton icon={iconAdd} classIcon="w-9 h-9 p-1" classButton="opacity-50 rounded-full my-auto" onClick={onAddStage}/>
        </div>

        {fields.map((field, index) => (
          <StageForm
            key={field.id}
            index={index}
            control={control}
            stageNumber={index + 1}
            infoText={infoText.stage}
            onDelete={() => onRemoveStage(index)}
            prevDateRange={getNearestDateRange(index, 'prev')}
            nextDateRange={getNearestDateRange(index, 'next')}
          />  
        ))}
      </div>
    </section>
  );
};
