import type { InformationFieldConfig } from "@/types/config";
import type {Evacuation, EvacuationStatus} from "@/types/domain/evacuation";

export interface EvacuationsSectionConfig {
  iconEvacuation: string;
  status: EvacuationInformationFieldConfig & {
    options: Record<EvacuationStatus, string>;
  };
  name: EvacuationInformationFieldConfig;
  latitude: EvacuationInformationFieldConfig;
  longitude: EvacuationInformationFieldConfig;
  reason: EvacuationInformationFieldConfig;
  description: EvacuationInformationFieldConfig;
  area: {
    title: string;
    latitude: EvacuationInformationFieldConfig;
    longitude: EvacuationInformationFieldConfig;
    radius: EvacuationInformationFieldConfig;
  };
  dateLastActivated: EvacuationInformationFieldConfig;
  point: {
    title: string;
    name: EvacuationInformationFieldConfig;
    latitude: EvacuationInformationFieldConfig;
    longitude: EvacuationInformationFieldConfig;
    description: EvacuationInformationFieldConfig;
  };
  assistant: {
    title: string;
    name: EvacuationInformationFieldConfig;
    workingHours: EvacuationInformationFieldConfig;
    phone: EvacuationInformationFieldConfig;
    email: EvacuationInformationFieldConfig;
  };
  evacuationButtons: Record<EvacuationButtonKey,EvacuationInformationFieldConfig>;
  showButtons: Record<EvacuationButtonKey, {status:EvacuationStatus[],isEdit:Evacuation["canEdit"][]} >;
}

type EvacuationInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type EvacuationButtonKey = "active" | "cancel" | "details" | "delete" | "edit";
