import type { Control } from "react-hook-form";
import type { FilterValues } from "../../TripsReadPage.types";
import type { FilterSectionConfig } from "../../config/filterSection.config.types";

export interface FilterSectionProps {
  infoText: FilterSectionConfig
  control: Control<FilterValues>;
  onCreate: () => void;
}
