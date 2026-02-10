import type { Trip } from "@/types/domain/trip";
import type { TripsSectionConfig } from "../../../../../../config/tripsSection.config.types";

type TripInfo = Pick<Trip["stages"][number], 'coordinates' | 'dateRange' | 'numberOfPeople'>;

export interface StageInformationProps extends TripInfo {
  stageNumber: number;
  infoText: TripsSectionConfig["stage"];
}
