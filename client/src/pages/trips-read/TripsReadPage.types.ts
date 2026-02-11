import type { TripStatus } from "@/types/domain/trip";


export interface FilterValues {
  numberOfStages: number | null;        
  status: TripStatus[] | null;      
  startDate: Date | null | string;
  endDate: Date | null | string;     
}

