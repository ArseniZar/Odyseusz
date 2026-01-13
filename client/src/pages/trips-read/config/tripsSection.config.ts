import { iconTrip } from "@/assets";
import type { TripsSectionConfig } from "./tripsSection.config.types";

export const tripsSectionConfig: TripsSectionConfig = {
  iconTrip: iconTrip,
  trip: {
    status: {
      label: "Status",
      options: {
        NOT_STARTED: "Nie rozpoczęta",
        ACTIVE: "Aktywna",
        FINISHED: "Zakończona",
        CANCELLED: "Anulowana",
      },
    },
    dateRange: {
      label: "Okreś",
    },
    numberOfStages: {
      label: "Liczba etapów",
    },
  },
  tripButtons: {
    edit: {
      label: "Edytuj",
    },
    delete: {
      label: "Usuń",
    },
    details: {
      label: "Kliknij, aby zobaczyć szczegóły",
    },
    cancel: {
      label: "Anuluj"
    }
  },
  showButtons: {
    edit: ["NOT_STARTED"],
    delete: ["NOT_STARTED"],
    cancel:["ACTIVE"],
    details: ["ACTIVE","CANCELLED","FINISHED","NOT_STARTED"]
  }
};
