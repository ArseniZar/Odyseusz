// trip related types 
export interface Trip {
  id: number;
  status: TripStatus;
  startDate: Date;
  endDate: Date;
  stages: Stage[];
  cancel: boolean;
  numberOfStages: number;
}

export type TripStatus = "NOT_STARTED" | "ACTIVE" | "FINISHED" | "CANCELLED";

export interface Stage {
  id: number;
  dateRange: DataRange
  coordinates: Coordinates
  numberOfPeople: number;
}
// evacuation related types
export interface Evacuation {
  id: number;
  status: EvacuationStatus;
  name: string;
  reason: string;
  description: string;
  area: {
    coordinates: Coordinates;
    radius: number;
  };
  collectionPoints: CollectionPoint[];
  assistants: Assistant[];
}

export interface CollectionPoint {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinates;
}

export interface Assistant {
  id: number;
  name: string;
  workingHours: string;
  phone: string;
  email: string;
}

export type EvacuationStatus = "ACTIVE" | "CANCELLED";


//  information about form fields and buttons
export interface InformationFieldConfig {
  label: string;
  tooltipText?: string;
}

export type BaseFormButtonKey = "submit" | "cancel";

export type Information = {
  formButtons: Record<BaseFormButtonKey, Pick<InformationFieldConfig, "label">>
};

//  form field configuration 
export interface FormFieldConfig<T> {
  label: string;
  type?: "text" | "number" | "checkbox" | "date";
  defaultValue: T | null;
  placeholder?: string;
  tooltipText?: string;
  validate?: (value: any) => true | any;
}


export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DataRange {
  startDate: Date;
  endDate: Date;
}