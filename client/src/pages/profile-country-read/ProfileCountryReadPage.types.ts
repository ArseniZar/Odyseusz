import type { DangerLevel } from "@/types/domain/profileCountry";

export interface FilterValues {
  dangerLevel: DangerLevel[] | null;      
  startLastUpdateDate: Date | null | string;
  endLastUpdateDate: Date | null | string;
  isEditable: boolean;
  nameCountry: string | null;
}