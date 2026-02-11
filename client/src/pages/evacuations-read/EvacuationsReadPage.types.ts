import type { EvacuationStatus } from "@/types/domain/evacuation";

export interface FilterValues {
  status: EvacuationStatus[] | null;      
  startLastUpdateDate: Date | null | string;
  endLastUpdateDate: Date | null | string;
  isEditable: boolean;
}