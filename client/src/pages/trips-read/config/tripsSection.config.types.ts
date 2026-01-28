import type { InformationFieldConfig, TripStatus } from "@/types/all_types";


export interface TripsSectionConfig {
  iconTrip: string;
  status: TripInformationFieldConfig & {options:  Record<TripStatus, string>};
  dateRange: TripInformationFieldConfig;
  numberOfStages: TripInformationFieldConfig;
  tripButtons: Record<TripButtonKey, TripInformationFieldConfig>;
  showButtons: Record<TripButtonKey, TripStatus[]>
}


type TripInformationFieldConfig = Pick<InformationFieldConfig, 'label'>;
type TripButtonKey = "edit" | "delete" | "cancel" | "details";
