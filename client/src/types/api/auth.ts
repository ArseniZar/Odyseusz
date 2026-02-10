export type UserRole =
  | "traveler"
  | "editor"
  | "coordinator"
  | "evacuation_assistant";

export interface TravelerRegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: "traveler";
  traveler_profile: {
    phone_number: string;
    national_id: string;
  };
}

export interface EditorRegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: "editor";
}

export interface CoordinatorRegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: "coordinator";
}

export interface EvacuationAssistantRegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: "evacuation_assistant";
  evacuation_assistant_profile: {
    phone_number: string;
    working_hours: string;
  };
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  token_type: string; // "bearer"
}
