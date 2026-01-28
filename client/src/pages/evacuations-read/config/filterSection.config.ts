import type { FilterSectionConfig } from "./filterSection.config.types";

export const filterSectionConfig: FilterSectionConfig = {
  status: {
    label: "Status",
    defaultValue: [],
    placeholder: "Wybierz status",
    tooltipText: "Filtruj według statusu ewakuacji",
    options: [
      { value: "ACTIVE", label: "Aktywna" },
      { value: "CANCELLED", label: "Nie Atywna" },
    ],
  },
  evacuationsButtons: {
    create: {
      label: "Utwórz ewakuację",
    },
  },
};
