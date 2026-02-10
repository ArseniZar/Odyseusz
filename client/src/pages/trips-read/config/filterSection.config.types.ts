import type { Option } from "@/components/Select";
import type { DateFormat, FilterFieldConfig, InformationFieldConfig } from "@/types/config";
import type { TripStatus } from "@/types/domain/trip";

export interface FilterSectionConfig {
  status: FilterFieldConfig<TripStatus[]> & { options: Option<TripStatus>[] };
  numberOfStages: FilterFieldConfig<number>;
  startDate: FilterFieldConfig<Date>;
  endDate: FilterFieldConfig<Date>;
  formatDate: DateFormat;
  tripsButtons: Record<TripButtonKey, FilterInformationFieldConfig>;
}

type FilterInformationFieldConfig = Pick<InformationFieldConfig, "label">;
type TripButtonKey = "create";

