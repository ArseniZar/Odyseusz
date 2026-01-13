export interface StagesSectionConfig {
  title: string;
  titleStage: string;
  numberOfPeople: FormFieldConfig<number>;
  coordinates: FormFieldConfig<Coordinates>;
  dateRange: FormFieldConfig<DataRange>;
}

export interface FormFieldConfig<T> {
  label: string;
  defaultValue: T | null;
  placeholder?: string;
  tooltipText?: string;
  validate?: (value: any) => true | any;
}

export interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export interface DataRange{
  startDate: Date | null;
  endDate: Date | null;
}