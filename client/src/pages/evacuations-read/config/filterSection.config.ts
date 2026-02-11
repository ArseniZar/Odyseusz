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
  startLastUpdateDate: {
    label: "Data od ost. aktywacji",
    defaultValue: null,
    placeholder: "dd/mm/yyyy",
    tooltipText: "Filtruj od tej daty",
    validate: (value: any) => {
      if (value !== null) {
        if (typeof value === "string") return "Nieprawidłowy format daty";
      }
      return true;
    },
  },
  endLastUpdateDate: {
    label: "Data do ost. aktywacji",
    defaultValue: null,
    placeholder: "dd/mm/yyyy",
    tooltipText: "Filtruj do tej daty",
    validate: (value: any) => {
      if (value !== null) {
        if (typeof value === "string") return "Nieprawidłowy format daty";
      }
      return true;
    },
  },
  isEditable:{
    label: "Tylko Edytowalne",
    defaultValue: false,
    tooltipText: "Pokaż tylko ewakuacje, które można edytować",
  }, 
  formatDate: "dd/MM/yyyy",
  evacuationsButtons: {
    create: {
      label: "Utwórz ewakuację",
    },
  },
}