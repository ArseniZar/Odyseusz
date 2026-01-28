import type { Option } from "@/components/Select";
import type { InformationFieldConfig, EvacuationStatus, DateFormat } from "@/types/all_types";

export interface FilterSectionConfig {
  status: FilterFieldConfig<EvacuationStatus[]> & { options: Option<EvacuationStatus>[] };
  lastUpdateDate: FilterFieldConfig<Date>;
  formatDate: DateFormat;
  evacuationsButtons: Record<EvacuationButtonKey, FilterInformationFieldConfig>;
}

export interface FilterFieldConfig<T> {
  label: string;
  defaultValue: T | null;
  placeholder?: string;
  tooltipText?: string;
  validate?: (value: any) => true | any;
}

type FilterInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type EvacuationButtonKey = "create";

