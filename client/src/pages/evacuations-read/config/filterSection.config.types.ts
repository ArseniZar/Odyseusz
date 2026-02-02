import type { Option } from "@/components/Select";
import type { InformationFieldConfig, EvacuationStatus, DateFormat, FilterFieldConfig } from "@/types/all_types";

export interface FilterSectionConfig {
  status: FilterFieldConfig<EvacuationStatus[]> & { options: Option<EvacuationStatus>[] };
  lastUpdateDate: FilterFieldConfig<Date>;
  formatDate: DateFormat;
  evacuationsButtons: Record<EvacuationButtonKey, FilterInformationFieldConfig>;
}


type FilterInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type EvacuationButtonKey = "create";

