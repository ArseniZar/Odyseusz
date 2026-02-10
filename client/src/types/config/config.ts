export interface InformationFieldConfig {
  label: string;
  tooltipText?: string;
}

export type BaseFormButtonKey = "submit" | "cancel";

export type Information = {
  formButtons: Record<BaseFormButtonKey, Pick<InformationFieldConfig, "label">>;
};

export interface FormFieldConfig<T> {
  label: string;
  type?: "text" | "number" | "checkbox" | "date";
  defaultValue: T | null;
  placeholder?: string;
  tooltipText?: string;
  validate?: (value: any) => true | any;
}

export interface FilterFieldConfig<T> {
  label: string;
  defaultValue: T | null;
  placeholder?: string;
  tooltipText?: string;
  validate?: (value: any) => true | any;
}

export type DateFormat =
  | "MM/dd/yyyy"
  | "dd/MM/yyyy"
  | "yyyy-MM-dd"
  | "dd MMM yyyy"
  | "EEEE, MMMM d, yyyy";
