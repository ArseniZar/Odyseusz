import type { InformationSectionConfig } from "./informationSection.config.types";


export const informationSectionConfig: InformationSectionConfig = {
  title: "Informacje o edycji kraju profilu",
  name: {
    label: "Nazwa kraju",
  },
  countryCode: {
    label: "Kod kraju",
  },
  dangerLevel : {
    label: "Poziom zagrożenia",
  },
  description: {
    label: "Opis",
  },
  dataUpdate: {
    label: "Data aktualizacji",
  },
  consulate: {
    title: "Konsulat",
    address: {
      label: "Adres",
    },
    phone: {
      label: "Numer telefonu",
    },
    email: {
      label: "Adres email",
    },
    website: {
      label: "Strona internetowa",
    },
    dataUpdate: {
      label: "Data aktualizacji",
    }
  },
  formButtons: {
    submit: {
      label: "Zapisz zmiany",
    },
    cancel: {
      label: "Anuluj",
    },
  },
  
};