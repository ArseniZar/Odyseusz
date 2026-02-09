export interface PointFormValues {
  name: string | null;
  description: string | null;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
}

export interface AssistantFormValues {
  id: string;
  name: string;
  workingHours: string;
  phone: string;
  email: string;
  isActive: boolean | null;
}

export interface AreaFormValues {
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  radius: number | null;
}

export interface EvacuationFormValues {
  generalInfoForm: {
    name: string | null;
    reason: string | null;
    description: string | null;
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
