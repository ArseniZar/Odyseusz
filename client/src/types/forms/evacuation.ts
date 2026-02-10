import type { Area,Assistant,CollectionPoint,Evacuation } from "@/types/domain/evacuation";

export interface PointFormValues {
  name: CollectionPoint["name"] | null;
  description: CollectionPoint["description"] | null;
  coordinates: {
    latitude: CollectionPoint["coordinates"]["latitude"] | null;
    longitude: CollectionPoint["coordinates"]["longitude"] | null;
  };
}

export interface AssistantFormValues {
  id: Assistant["id"];
  name: Assistant["name"];
  workingHours: Assistant["workingHours"];
  phone: Assistant["phone"];
  email: Assistant["email"];
  isActive: boolean | null;
}

export interface AreaFormValues {
  coordinates: {
    latitude: Area["coordinates"]["latitude"] | null;
    longitude: Area["coordinates"]["longitude"] | null;
  };
  radius: number | null;
}

export interface EvacuationFormValues {
  id: Evacuation["id"] | null;
  generalInfoForm: {
    name: Evacuation["name"] | null;
    reason: Evacuation["reason"] | null;
    description: Evacuation["description"] | null;
    activateImmediately: boolean;
  };
  areasForm: {
    areas: AreaFormValues[];
  };
  colectionPointsForm: {
    points: PointFormValues[];
  };
  assistantsForm: {
    assistants: AssistantFormValues[];
  };
}
