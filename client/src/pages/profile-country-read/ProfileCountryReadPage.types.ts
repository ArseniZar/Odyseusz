import type { DangerLevel } from "@/types/domain/profileCountry";

export interface FilterValues {
  status: DangerLevel[] | null;      
  lastUpdateDate: Date | null | string;
  isEditable: boolean;
}