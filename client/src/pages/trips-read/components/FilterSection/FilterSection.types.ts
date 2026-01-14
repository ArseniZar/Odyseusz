import type { Control, FieldErrors } from "react-hook-form";
import type { FilterValue } from "../../TripsReadPage.types";
import type { FilterSectionConfig } from "../../config/filterSection.config.types";

export interface FilterSectionProps {
  infoText: FilterSectionConfig
  control: Control<FilterValue>;
  errors?: FieldErrors<FilterValue>;
  onCreate: () => void;
}
