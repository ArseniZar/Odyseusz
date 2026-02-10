import type { ProfileCountrySectionConfig } from "./profileCountrySection.config.types";

export const profileCountrySectionConfig: ProfileCountrySectionConfig = {
  generalInfoForm: {
    title: "Informacje ogólne",
    description: {
      label: "Opis kraju",
      defaultValue: null,
      placeholder: "Wprowadź opis kraju",
      tooltipText:
        "Podaj krótki opis kraju, który będzie widoczny na profilu kraju.",
      validate: (value: any) => {
        if (value == null || value.trim() === "") {
          return "Opis kraju nie może być pusty.";
        }
        return true;
      },
    },
  },
  consulatesForm: {
    title: "Konsulaty",
    consulate: {
      isActive: {
        label: "Aktywny",
        defaultValue: false,
        tooltipText:
          "Zaznacz, jeśli konsulat jest aktywny i powinien być widoczny na profilu kraju.",
        validate: (_value: any) => {},
      },
    },
  },
};
