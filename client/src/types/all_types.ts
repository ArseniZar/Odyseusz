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



export interface InformationFieldConfig {
  label: string;
  tooltipText?: string;
}