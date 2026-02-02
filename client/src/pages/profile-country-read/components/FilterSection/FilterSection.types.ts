import type { Control } from "react-hook-form";
import type { FilterValues } from "../../ProfileCountryReadPage.types";
import type { FilterSectionConfig } from "../../config/filterSection.config.types";

export interface FilterSectionProps {
  infoText: FilterSectionConfig
  control: Control<FilterValues>;
}
