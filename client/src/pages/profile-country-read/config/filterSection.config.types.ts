import type { Option } from "@/components/Select";
import type { DangerLevel, DateFormat, FilterFieldConfig } from "@/types/all_types";


export interface FilterSectionConfig {
  status: FilterFieldConfig<DangerLevel[]> & { options: Option<DangerLevel>[] };
  lastUpdateDate: FilterFieldConfig<Date>;
  isEditable: FilterFieldConfig<boolean> & { defaultValue: boolean };
  formatDate: DateFormat;
}




