export interface InformationFieldConfig {
  label: string;
  tooltipText?: string;
}

export interface InformationSectionConfig {
  title: string;
  iconTrip: string;
  dateRange: {
    startDate: InformationFieldConfig;
    endDate: InformationFieldConfig;
  };
  stage: {
    title: string;
    numberOfPeople: InformationFieldConfig;
    dateRange: InformationFieldConfig;
  };
  formButtons: {
    submitLabel: InformationFieldConfig;
    cancelLabel: InformationFieldConfig;
  };
}