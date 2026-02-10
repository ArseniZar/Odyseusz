import type { Stage, Trip } from "@/types/domain/trip";
export interface StageFormValues {
  numberOfPeople: Stage["numberOfPeople"] | null;
  coordinates: {
    latitude:  Stage["coordinates"]["latitude"] | null;
    longitude: Stage["coordinates"]["longitude"] | null;
  };
  dateRange: {
    startDate: Stage["dateRange"]["startDate"] | null;
    endDate: Stage["dateRange"]["endDate"]  | null;
  };
}

export interface TripFormValue{
  id: Trip["id"] | null; 
  stages: StageFormValues[];
}


