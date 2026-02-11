import type { Option } from "@/components/Select";
import type { EvacuationStatus } from "@/types/domain/evacuation";
import type { InformationFieldConfig, DateFormat, FilterFieldConfig } from "@/types/config";

export interface FilterSectionConfig {
  status: FilterFieldConfig<EvacuationStatus[]> & { options: Option<EvacuationStatus>[] };
  startLastUpdateDate: FilterFieldConfig<Date>;
  endLastUpdateDate: FilterFieldConfig<Date>;
  isEditable: FilterFieldConfig<boolean> & { defaultValue: boolean };
  formatDate: DateFormat;
  evacuationsButtons: Record<EvacuationButtonKey, FilterInformationFieldConfig>;
}


type FilterInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type EvacuationButtonKey = "create";

