import type { FilterSectionConfig } from "./filterSection.config.types";

export const filterSectionConfig: FilterSectionConfig = {
  status: {
    label: "Status",
    defaultValue: [],
    placeholder: "Wybierz status",
    tooltipText: "Filtruj według statusu podróży",
    options: [
      { value: "NOT_STARTED", label: "Nie rozpoczęta" },
      { value: "ACTIVE", label: "Aktywna" },
      { value: "FINISHED", label: "Zakończona" },
      { value: "CANCELLED", label: "Anulowana" },
    ],
  },
  numberOfStages: {
    label: "Liczba etapów",
    defaultValue: null,
    placeholder: "liczba",
    tooltipText: "Filtruj według liczby etapów",
    validate: (value: any) => {
      if (value !== null) {
        if (isNaN(Number(value))) return "Pole musi być liczbą";
        if (!Number.isInteger(Number(value)))
          return "Pole musi być liczbą całkowitą";
        if (Number(value) <= 0) return "Liczba musi być większa niż zero";
      }
      return true;
    },
  },
  startDate: {
    label: "Data rozpoczęcia",
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
  endDate: {
    label: "Data zakończenia",
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
  formatDate: "dd/MM/yyyy",
  tripsButtons: {
    create: {
      label: "Zarejestruj nową podróż",
    },
  },
};
