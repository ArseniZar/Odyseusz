export type DangerLevelApi = "low" | "moderate" | "high" | "severe";

export interface CountryProfileUpdate {
  description: string;
  conulateIds: number[];
}

export interface ConsulateResponse {
  id: number;
  address: string;
  email: string;
  phone_number: string;
  website: string;
  created_at: string;
  updated_at: string;
}

export interface CountryProfileResponse {
  id: number;
  name: string;
  can_edit: boolean;
  country_code: string;
  description: string;
  danger_level: DangerLevelApi;
  created_at: string;
  updated_at: string;
  consulates: ConsulateResponse[];

}

