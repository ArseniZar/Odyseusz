import type { Evacuation } from "@/types/domain/evacuation";
import type { EvacuationsSectionConfig } from "../../config/evacuationsSection.config.types";

export interface EvacuationsSectionProps{
  infoText: EvacuationsSectionConfig
  evacuations: Evacuation[];
  onActive: (evacuationId: number) => void;
  onCancel: (evacuationId: number) => void;
  onDelete: (evacuationId: number) => void;
  onEdit: (evacuationId: number) => void;
}
