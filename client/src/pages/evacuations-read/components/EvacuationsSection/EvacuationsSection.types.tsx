import type { Evacuation } from "@/types/all_types";
import type { EvacuationsSectionConfig } from "../../config/evacuationsSection.config.types";

export interface EvacuationsSectionProps{
  infoText: EvacuationsSectionConfig
  evacuations: Evacuation[];
  onActive: (evacuationId: number) => void;
  onCancel: (evacuationId: number) => void;
}
