import type { StagesSectionConfig } from "./stagesSection.config.types";

export const stagesSectionConfig: StagesSectionConfig = {
  title: "Etapy podróży",
  titleStage: "Etap",

  numberOfPeople: {
    type: "number",
    label: "Liczba osób",
    defaultValue: 1,
    placeholder: "Wpisz liczbę osób",
    tooltipText: "Proszę wpisać liczbę osób biorących udział w podróży.",
    validate: (value: any) => {
      if (isNaN(Number(value))) return "Pole musi być liczbą";
      if (!Number.isInteger(Number(value)))
        return "Pole musi być liczbą całkowitą";
      if (Number(value) <= 0) return "Liczba musi być większa niż zero";
      return true;
    },
  },

  coordinates: {
    label: "Współrzędne geograficzne",
    defaultValue: { latitude: 51.5074, longitude: 0.1278 },
    tooltipText: "Proszę wybrać lokalizację etapu podróży na mapie.",
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

  dateRange: {
    label: "Zakres dat",
    defaultValue: { startDate: null, endDate: null },
    tooltipText: "Proszę wybrać daty rozpoczęcia i zakończenia etapu podróży.",
    validate: (value: any) => {
      const { startDate, endDate } = value;
      if (!startDate || !endDate) return "Proszę wybrać obie daty";
      if (new Date(startDate) > new Date(endDate))
        return "Data rozpoczęcia nie może być późniejsza niż data zakończenia";
      return true;
    },
  },
};
