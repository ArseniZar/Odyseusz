import type { DangerLevel } from "@/types/all_types";

export interface FilterValues {
  status: DangerLevel[] | null;      
  lastUpdateDate: Date | null | string;
  isEditable: boolean;
}