import { iconEvacuation } from "@/assets";
import type { EvacuationsSectionConfig } from "./evacuationsSection.config.types";

export const evacuationsSectionConfig: EvacuationsSectionConfig = {
  iconEvacuation: iconEvacuation,
  status: {
    label: "Status",
    options: {
      ACTIVE: "Aktywna",
      CANCELLED: "Nie Atywna",
    },
  },
  name: {
    label: "Nazwa",
  },
  latitude: {
    label: "Szerokość",
  },
  longitude: {
    label: "Długość",
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
    title: "Punkty zbiórki",
    name: {
      label: "Nazwa",
    },
    latitude: {
      label: "Szerokość",
    },
    longitude: {
      label: "Długość",
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
      label: "Telefon",
    },
    email: {
      label: "Email",
    },
  },
  evacuationButtons: {
    active: {
      label: "Aktywuj",
    },
    details: {
      label: "Kliknij, aby zobaczyć szczegóły",
    },
    cancel: {
      label: "Anuluj",
    },
  },
  showButtons: {
    cancel: ["ACTIVE"],
    details: ["ACTIVE", "CANCELLED"],
    active: ["CANCELLED"],
  },
};
