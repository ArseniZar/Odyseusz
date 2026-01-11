
export interface StageFormValues {
  numberOfPeople: number | null;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

export interface StagesValue{
  stages: StageFormValues[];
}

export interface TripCreatePageProps {}