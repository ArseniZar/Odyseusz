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
  lastUpdateDate: {
    label: "Data ost. aktywacji",
    defaultValue: null,
    placeholder: "dd/mm/yyyy",
    tooltipText: "Filtruj od tej daty",
    validate: (value: any) => {
      if (value !== null) {
        if (typeof value === "string") return "error";
      }
      return true;
    },
  },
  formatDate: "dd/MM/yyyy",
  evacuationsButtons: {
    create: {
      label: "Utwórz ewakuację",
    },
  },
}