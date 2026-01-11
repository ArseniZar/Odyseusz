export interface FormFieldConfig {
  type?: string;
  label: string;
  defaultValue: any | null;
  placeholder?: string;
  tooltipText?: string;
  validate?: (value: any) => true | any;
}

export interface StagesSectionConfig {
  title: string;
  titleStage: string;
  numberOfPeople: FormFieldConfig;
  coordinates: FormFieldConfig;
  dateRange: FormFieldConfig;
}