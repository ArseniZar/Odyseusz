import type { TripStatus } from "@/types/all_types";


export interface FilterValue {
  numberOfStages: number | null;        
  status: TripStatus[] | null;      
  startDate: Date | null | string;
  endDate: Date | null | string;     
}

