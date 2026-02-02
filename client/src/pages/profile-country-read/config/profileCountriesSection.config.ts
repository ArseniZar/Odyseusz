import type { ProfileContriesSectionConfig } from "./profileCountriesSection.config.types";

export const profileCountriesSectionConfig: ProfileContriesSectionConfig = {
  dangerLevel: {
    label: "Poziom zagrożenia",
    options: {
      EXTREME: "Krytyczny",
      HIGH: "Wysoki",
      MEDIUM: "Średni",
      LOW: "Niski",
    },
  },
    name: {
    label: "Nazwa",
    },
    description: {
    label: "Opis",
    },
    countryCode: {
    label: "Kod kraju",
    },
    dataUpdate: {
    label: "Data aktualizacji danych",
    },
    consulate:{
      title: "Konsulaty",
      
        address: {
        label: "Adres",
        },
        phone: {
        label: "Telefon",
        },
        email: {
        label: "Email",
        },
        website: {
        label: "Strona internetowa",
        },
        dataUpdate: {
        label: "Data aktualizacji danych",
        },
    },
    profileCountryButtons: {
        edit: { label: "Edytuj" },
        details: { label: "Szczegóły kraju" },
    },
  
  showButtons: {
    edit: [true],
    details: [true, false],
  },
};
