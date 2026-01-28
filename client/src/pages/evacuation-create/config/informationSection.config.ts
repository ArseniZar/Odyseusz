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
    label: "Obszar",
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
      tooltipText: "Imię i nazwisko asystenta ewakuacji",
    },
    workingHours: {
      label: "Godziny pracy",
      tooltipText: "Godziny pracy asystenta ewakuacji",
    },
    phone: {
      label: "Numer telefonu",
      tooltipText: "Numer telefonu asystenta ewakuacji",
    },
    email: {
      label: "Adres email",
      tooltipText: "Adres email asystenta ewakuacji",
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
