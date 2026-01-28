import type {InformationFieldConfig,EvacuationStatus} from "@/types/all_types";

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
  area: EvacuationInformationFieldConfig;
  point: {
    title: string;
    name: EvacuationInformationFieldConfig;
    latitude: EvacuationInformationFieldConfig;
    longitude: EvacuationInformationFieldConfig;
    description: EvacuationInformationFieldConfig;
  };
  assistant: {
    title: string;
    name: InformationFieldConfig;
    workingHours: InformationFieldConfig;
    phone: InformationFieldConfig;
    email: InformationFieldConfig;
  };
  evacuationButtons: Record<EvacuationButtonKey,EvacuationInformationFieldConfig>;
  showButtons: Record<EvacuationButtonKey, EvacuationStatus[]>;
}

type EvacuationInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type EvacuationButtonKey = "active" | "cancel" | "details";
