import type { LocationResponse } from "./common";

export interface EvacuationAreaCreateNested {
  latitude: number;
  longitude: number;
  radius: number; // km
}

export interface AssemblyPointCreateNested {
  latitude: number;
  longitude: number;
  name: string;
  description?: string | null;
}

export interface EvacuationCreate {
  name: string;
  reason: string;
  description: string;
  active: boolean;
  areas: EvacuationAreaCreateNested[];
  assembly_points: AssemblyPointCreateNested[];
  assistant_ids: number[];
}

export interface EvacuationUpdate {
  name: string;
  reason: string;
  description: string;
  active: boolean;
  areas: EvacuationAreaCreateNested[];
  assembly_points: AssemblyPointCreateNested[];
  assistant_ids: number[];
}



export interface EvacuationAreaResponse {
  id: number;
  evacuation_id: number;
  radius: number;
  location: LocationResponse;
  created_at: string; // ISO datetime
}

export interface AssemblyPointResponse {
  id: number;
  evacuation_id: number;
  name: string;
  description: string | null;
  location: LocationResponse;
  created_at: string; // ISO datetime
}

export interface EvacuationAssistantResponse {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  working_hours: string;
  email: string;
}

export interface EvacuationResponse {
  id: number;
  coordinator_id: number;
  name: string;
  reason: string;
  description: string;
  active: boolean;
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
  can_edit: boolean;
  areas: EvacuationAreaResponse[];
  assembly_points: AssemblyPointResponse[];
  assistants: EvacuationAssistantResponse[];
}

