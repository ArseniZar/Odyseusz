import { iconTrip } from "@/assets/";
import type { InformationSectionConfig } from "./informationSection.config.types";



export const tripInformationSectionConfig: InformationSectionConfig = {
  title: "Informacje o nowej podróży",
  iconTrip: iconTrip,
  dateRange: {
    startDate: {
      label: "Data rozpoczęcia",
      tooltipText: "Data rozpoczęcia podróży.",
    },
    endDate: {
      label: "Data zakończenia",
      tooltipText: "Data zakończenia podróży.",
    },
  },
  stage: {
    title: "Etap",
    numberOfPeople: {
      label: "Liczba osób",
      tooltipText: "Liczba osób biorących udział w etapie podróży.",
    },
    dateRange: {
      label: "Zakres dat",
      tooltipText: "Daty rozpoczęcia i zakończenia etapu podróży.",
    },
  },
  formButtons: {
    submitLabel: {
      label: "Zarejstruj podróż",
      tooltipText: "Kliknij, aby zarejestrować nową podróż.",
    },
    cancelLabel: {
      label: "Anuluj",
      tooltipText: "Kliknij, aby anulować tworzenie podróży.",
    },
  },
};