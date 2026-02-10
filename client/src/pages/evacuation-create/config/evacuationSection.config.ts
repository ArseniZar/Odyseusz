import type { EvacuationSectionConfig } from "./evacuationSection.types";

export const evacuationSectionConfig: EvacuationSectionConfig = {
  generalInfoForm: {
    title: "Dane ewakuacji",
    name: {
      label: "Nazwa",
      defaultValue: null,
      placeholder: "Wpisz nazwę ewakuacji",
      tooltipText: "Nazwa ewakuacji widoczna dla wszystkich użytkowników",
      validate: (value: any) => {
        if (value == null || value.trim() === "") {
          return "Nazwa ewakuacji jest wymagana";
        }
        return true;
      },
    },
    reason: {
      label: "Powód",
      defaultValue: null,
      placeholder: "Wpisz powód ewakuacji",
      tooltipText: "Powód ewakuacji widoczny dla wszystkich użytkowników",
      validate: (value: any) => {
        if (value == null || value.trim() === "") {
          return "Powód ewakuacji jest wymagany";
        }
        return true;
      },
    },
    description: {
      label: "Opis",
      defaultValue: null,
      placeholder: "Wpisz opis ewakuacji",
      tooltipText: "Opis ewakuacji widoczny dla wszystkich użytkowników",
      validate: (value: any) => {
        if (value == null || value.trim() === "") {
          return "Opis ewakuacji jest wymagany";
        }
        return true;
      },
    },
    activateImmediately: {
      label: "Aktywuj od razu po utworzeniu?",
      type: "checkbox",
      defaultValue: false,
      tooltipText:
        "Jeśli zaznaczone, ewakuacja zostanie aktywowana natychmiast po utworzeniu",
      validate: (_value: any) => {return true;},
    },
  },
  areasForm: {
    title: "Obszar ewakuacji",
    area: {
      titleArea: "Obszar ewakuacji",
      coordinates: {
        label: "Współrzędne (szerokość, długość)",
        defaultValue: null,
        placeholder: "Wybierz współrzędne obszaru ewakuacji na mapie",
        tooltipText: "Współrzędne środka obszaru ewakuacji",
        validate: (value: any) => {
          const { latitude, longitude } = value;
          if (typeof latitude !== "number" || latitude < -90 || latitude > 90) {
            return "Nieprawidłowa szerokość geograficzna (-90 do 90)";
          }
          if (
            typeof longitude !== "number" ||
            longitude < -180 ||
            longitude > 180
          ) {
            return "Nieprawidłowa długość geograficzna (-180 do 180)";
          }
          return true;
        },
      },
      radius: {
        label: "Promień (km)",
        defaultValue: null,
        placeholder: "np. 5",
        tooltipText: "Promień obszaru ewakuacji w kilometrach",
        validate: (value: any) => {
          if (value == null) {
            return "Promień obszaru ewakuacji jest wymagany";
          }
          if (typeof value !== "number" || value <= 0) {
            return "Promień musi być dodatnią liczbą";
          }
          return true;
        },
      },
    },
    addButton: {
      label: "Dodaj obszar ewakuacji",
    },
  },
  collectionPointsForm: {
    title: "Miejsca zbiórki",
    point: {
      titlePoint: "Miejsce zbiórki",
      name: {
        label: "Nazwa",
        defaultValue: null,
        placeholder: "Wpisz nazwę miejsca zbiórki",
        tooltipText:
          "Nazwa miejsca zbiórki widoczna dla wszystkich użytkowników",
        validate: (value: any) => {
          if (value == null || value.trim() === "") {
            return "Nazwa miejsca zbiórki jest wymagana";
          }
          return true;
        },
      },
      description: {
        label: "Opis",
        defaultValue: null,
        placeholder: "Wpisz opis miejsca zbiórki",
        tooltipText:
          "Opis miejsca zbiórki widoczny dla wszystkich użytkowników",
        validate: (value: any) => {
          if (value == null || value.trim() === "") {
            return "Opis miejsca zbiórki jest wymagany";
          }
          return true;
        },
      },
      coordinates: {
        label: "Współrzędne (szerokość, długość)",
        defaultValue: null,
        placeholder: "Wybierz współrzędne miejsca zbiórki na mapie",
        tooltipText: "Współrzędne miejsca zbiórki",
        validate: (value: any) => {
          const { latitude, longitude } = value;
          if (typeof latitude !== "number" || latitude < -90 || latitude > 90) {
            return "Nieprawidłowa szerokość geograficzna (-90 do 90)";
          }
          if (
            typeof longitude !== "number" ||
            longitude < -180 ||
            longitude > 180
          ) {
            return "Nieprawidłowa długość geograficzna (-180 do 180)";
          }
          return true;
        },
      },
    },
    addButton: {
      label: "Dodaj miejsce zbiórki",
    },
  },
  assistantsForm: {
    title: "Asystenci ewakuacji",
    assistant: {
      isActive: {
        label: "Dodaj",
        type: "checkbox",
        defaultValue: null,
        tooltipText: "Status aktywności asystenta ewakuacji",
        validate: (_value: any) => {},
      },
    },
  },
};
