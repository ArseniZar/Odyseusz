import type { Option } from "@/components/Select";
import type { InformationFieldConfig, TripStatus } from "@/types/all_types";

export interface FilterSectionConfig {
  status: FilterFieldConfig<TripStatus[]> & { options: Option<TripStatus>[] };
  numberOfStages: FilterFieldConfig<number>;
  startDate: FilterFieldConfig<Date>;
  endDate: FilterFieldConfig<Date>;
  formatDate: DateFormat;
  tripsButtons: Record<TripButtonKey, FilterInformationFieldConfig>;
}

export interface FilterFieldConfig<T> {
  label: string;
  defaultValue: T | null;
  placeholder?: string;
  tooltipText?: string;
  validate?: (value: any) => true | any;
}

type FilterInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type TripButtonKey = "create";
type DateFormat =
  | "MM/dd/yyyy"
  | "dd/MM/yyyy"
  | "yyyy-MM-dd"
  | "dd MMM yyyy"
  | "EEEE, MMMM d, yyyy";
