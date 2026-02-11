import type { FilterSectionConfig } from "./filterSection.config.types";

export const filterSectionConfig: FilterSectionConfig = {
  status: {
    label: "Status zagrożenia",
    defaultValue: [],
    placeholder: "Wybierz status",
    tooltipText: "Filtruj według poziomu zagrożenia",
    options: [
      { value: "LOW", label: "Niski" },
      { value: "MEDIUM", label: "Nieaktywna" },
      { value: "HIGH", label: "Wysoki" },
      { value: "EXTREME", label: "Krytyczny" },
    ],
  },
  startLastUpdateDate: {
    label: "Data od ost. aktualizacji",
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
  endLastUpdateDate: {
    label: "Data do ost. aktualizacji",
    defaultValue: null,
    placeholder: "dd/mm/yyyy",
    tooltipText: "Filtruj do tej daty",
    validate: (value: any) => {
      if (value !== null) {
        if (typeof value === "string") return "error";
      }
      return true;
    },
  },
  isEditable: {
    label: "Tylko Edytowalne",
    defaultValue: false,
    placeholder: "Wybierz opcję",
    tooltipText: "Pokaż tylko profile, które można edytować",
  },
  nameCountry: {
    label: "Nazwa kraju",
    defaultValue: "",
    placeholder: "Wpisz nazwę kraju",
    tooltipText: "Filtruj według nazwy kraju",
  },
  
  formatDate: "dd/MM/yyyy",
};
