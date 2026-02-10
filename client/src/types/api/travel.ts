import type { LocationResponse } from "./common";

export type TravelStatus = "planned" | "ongoing" | "completed" | "cancelled";

export interface TravelStageCreateNested {
  latitude: number;
  longitude: number;
  start_date: string; // ISO date (YYYY-MM-DD)
  end_date: string;   // ISO date (YYYY-MM-DD)
  people_count: number;
}

export interface TravelCreate {
  stages: TravelStageCreateNested[];
}

export interface TravelUpdate {
  cancelled?: boolean;
  stages: TravelStageCreateNested[];
}


export interface TravelStageResponse {
  id: number;
  travel_id: number;
  location: LocationResponse;
  start_date: string; // ISO date
  end_date: string;   // ISO date
  people_count: number;
}

export interface TravelResponse {
  id: number;
  traveler_id: number;
  cancelled: boolean;
  status: TravelStatus;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  started_at: string;
  finished_at: string;
  stages: TravelStageResponse[];
}
