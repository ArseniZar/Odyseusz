import type { Option } from "@/components/Select";
import type { DateFormat, FilterFieldConfig } from "@/types/config";
import type { DangerLevel } from "@/types/domain/profileCountry";


export interface FilterSectionConfig {
  status: FilterFieldConfig<DangerLevel[]> & { options: Option<DangerLevel>[] };
  lastUpdateDate: FilterFieldConfig<Date>;
  isEditable: FilterFieldConfig<boolean> & { defaultValue: boolean };
  formatDate: DateFormat;
}




