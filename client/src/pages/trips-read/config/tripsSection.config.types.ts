import type { InformationFieldConfig } from "@/types/config";
import type {TripStatus } from "@/types/domain/trip";


export interface TripsSectionConfig {
  iconTrip: string;
  status: TripInformationFieldConfig & {options:  Record<TripStatus, string>};
  dateRange: TripInformationFieldConfig;
  numberOfStages: TripInformationFieldConfig;
  stage: {
    title: string;
    latitude: TripInformationFieldConfig;
    longitude: TripInformationFieldConfig;
    dateRange: TripInformationFieldConfig;
    numberOfPeople: TripInformationFieldConfig;

  }
  tripButtons: Record<TripButtonKey, TripInformationFieldConfig>;
  showButtons: Record<TripButtonKey, TripStatus[]>
}


type TripInformationFieldConfig = Pick<InformationFieldConfig, 'label'>;
type TripButtonKey = "edit" | "delete" | "cancel" | "details";
