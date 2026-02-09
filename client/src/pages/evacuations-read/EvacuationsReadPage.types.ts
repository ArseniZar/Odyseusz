import type { EvacuationStatus } from "@/types/domain/evacuation";

export interface FilterValues {
  status: EvacuationStatus[] | null;      
  lastUpdateDate: Date | null | string;
}