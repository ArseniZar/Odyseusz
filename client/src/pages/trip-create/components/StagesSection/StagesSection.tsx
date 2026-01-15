import type { JSX } from "react";

import { StageForm } from "./components/StageForm/StageForm";
import { IconButton } from "@/components/IconButton";

import type { StagesSectionProps } from "./StagesSection.type";

import { Title } from "@/components/Title";
import { iconAdd } from "@/assets/";

// prettier-ignore
export const StagesSection = ({infoText,control, fields, watch, formState, onAddStage, onRemoveStage }: StagesSectionProps): JSX.Element => {
  
  const getNearestDateRange = (index: number, direction: 'prev' | 'next') => {
    const step = direction === 'prev' ? -1 : 1;
    for (let i = index + step; i >= 0 && i < watch.length; i += step) {
      const dr = watch[i]?.dateRange;
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
            errors={formState.errors.stages?.[index]}
            stageNumber={index + 1}
            infoText={infoText}
            onDelete={() => onRemoveStage(index)}
            prevDateRange={getNearestDateRange(index, 'prev')}
            nextDateRange={getNearestDateRange(index, 'next')}
          />  
        ))}
      </div>
    </section>
  );
};
