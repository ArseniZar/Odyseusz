export interface Trip {
  id: number;
  status: TripStatus;
  startDate: Date;
  endDate: Date;
  stages: Stage[];
  cancel: boolean;
  numberOfStages: number;
}

export interface Stage {
  id: number;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  numberOfPeople: number;
}

export type TripStatus = "NOT_STARTED" | "ACTIVE" | "FINISHED" | "CANCELLED";

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
  latitude: number | null;
  longitude: number | null;
}

