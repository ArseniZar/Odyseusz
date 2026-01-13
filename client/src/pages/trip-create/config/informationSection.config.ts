import { iconTrip } from "@/assets/";
import type { InformationSectionConfig } from "./informationSection.config.types";



export const informationSectionConfig: InformationSectionConfig = {
  title: "Informacje o nowej podróży",
  iconTrip: iconTrip,
  dateRange: {
    startDate: {
      label: "Data rozpoczęcia",
    },
    endDate: {
      label: "Data zakończenia",
    },
  },
  stage: {
    title: "Etap",
    numberOfPeople: {
      label: "Liczba osób",
    },
    dateRange: {
      label: "Okreś",
    },
  },
  formButtons: {
    submit: {
      label: "Zarejstruj podróż",
    },
    cancel: {
      label: "Anuluj",
    },
  },
};