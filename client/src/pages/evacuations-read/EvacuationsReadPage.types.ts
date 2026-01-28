import type { EvacuationStatus } from "@/types/all_types";

export interface FilterValues {
  status: EvacuationStatus[] | null;      
  lastUpdateDate: Date | null | string;
}