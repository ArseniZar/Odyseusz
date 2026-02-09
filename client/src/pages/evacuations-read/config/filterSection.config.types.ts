import type { Option } from "@/components/Select";
import type { EvacuationStatus } from "@/types/domain/evacuation";
import type { InformationFieldConfig, DateFormat, FilterFieldConfig } from "@/types/domain/forms";

export interface FilterSectionConfig {
  status: FilterFieldConfig<EvacuationStatus[]> & { options: Option<EvacuationStatus>[] };
  lastUpdateDate: FilterFieldConfig<Date>;
  formatDate: DateFormat;
  evacuationsButtons: Record<EvacuationButtonKey, FilterInformationFieldConfig>;
}


type FilterInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type EvacuationButtonKey = "create";

