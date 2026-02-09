import { iconEvacuation } from "@/assets/";
import type { InformationSectionConfig } from "./informationSection.config.types";

export const informationSectionConfig: InformationSectionConfig = {
  title: "Informacje o nowej ewakuacji",
  iconEwacuation: iconEvacuation,
  name: {
    label: "Nazwa",
  },
  reason: {
    label: "Powód",
  },
  description: {
    label: "Opis",
  },
  area: {
    title:"Obszar ewakuacji",
    radius: {
      label: "Promień",
    },
  },
  point: {
    title: "Mejsca zbiórki",
    name: {
      label: "Nazwa",
    },
    description: {
      label: "Opis",
    },
  },
  assistant: {
    title: "Asystent ewakuacji",
    name: {
      label: "Imię i nazwisko",
    },
    workingHours: {
      label: "Godziny pracy",
    },
    phone: {
      label: "Numer telefonu",
    },
    email: {
      label: "Adres email",
    },
  },
  formButtons: {
    submit: {
      label: "Zarejstruj ewakuację",
    },
    cancel: {
      label: "Anuluj",
    },
  },
};
