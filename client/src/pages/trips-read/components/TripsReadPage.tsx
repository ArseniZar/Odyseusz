import { useEffect, type JSX } from "react";
import { useForm } from "react-hook-form";

import { FilterSection } from "./FilterSection/FilterSection";
import { TripsSection } from "./TripsSection/TripsSection";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";

import { tripsSectionConfig } from "../config/tripsSection.config";
import { filterSectionConfig } from "../config/filterSection.config";
import { pageConfig } from "../config/page.config";

import type { FilterValue } from "./TripsReadPage.types";
import type { Trip } from "@/types/all_types";


export const TripsReadPage = (): JSX.Element => {
  const { control, handleSubmit, watch, formState } = useForm<FilterValue>({
    mode: "all",
    defaultValues: {
      numberOfStages: filterSectionConfig.numberOfStages.defaultValue,
      status: filterSectionConfig.status.defaultValue,
      startDate: filterSectionConfig.startDate.defaultValue,
      endDate: filterSectionConfig.endDate.defaultValue,
    },
  });

  useEffect(() => {
    console.log("Форма изменилась:", watch());
  }, [watch()]); 

  const sampleTrips: Trip[] = [
  {
    id: 1,
    status: "ACTIVE",
    startDate: new Date("2026-01-10"),
    endDate: new Date("2026-01-15"),
    cancel: false,
    numberOfStages: 2,
    stages: [
      {
        id: 1,
        dateRange: {
          startDate: new Date("2026-01-10"),
          endDate: new Date("2026-01-11"),
        },
        coordinates: {
          latitude: 50.0647,
          longitude: 19.9450,
        },
        numberOfPeople: 5,
      },
      {
        id: 2,
        dateRange: {
          startDate: new Date("2026-01-12"),
          endDate: new Date("2026-01-15"),
        },
        coordinates: {
          latitude: 50.0677,
          longitude: 19.9420,
        },
        numberOfPeople: 5,
      },
    ],
  },
  {
    id: 2,
    status: "CANCELLED",
    startDate: new Date("2026-02-01"),
    endDate: new Date("2026-02-05"),
    cancel: true,
    numberOfStages: 1,
    stages: [
      {
        id: 1,
        dateRange: {
          startDate: new Date("2026-02-01"),
          endDate: new Date("2026-02-05"),
        },
        coordinates: {
          latitude: 51.1079,
          longitude: 17.0385,
        },
        numberOfPeople: 3,
      },
    ],
  },
  {
    id: 3,
    status: "FINISHED",
    startDate: new Date("2025-12-20"),
    endDate: new Date("2025-12-25"),
    cancel: false,
    numberOfStages: 3,
    stages: [
      {
        id: 1,
        dateRange: {
          startDate: new Date("2025-12-20"),
          endDate: new Date("2025-12-21"),
        },
        coordinates: {
          latitude: 52.2297,
          longitude: 21.0122,
        },
        numberOfPeople: 2,
      },
      {
        id: 2,
        dateRange: {
          startDate: new Date("2025-12-22"),
          endDate: new Date("2025-12-23"),
        },
        coordinates: {
          latitude: 52.2370,
          longitude: 21.0175,
        },
        numberOfPeople: 2,
      },
      {
        id: 3,
        dateRange: {
          startDate: new Date("2025-12-24"),
          endDate: new Date("2025-12-25"),
        },
        coordinates: {
          latitude: 52.2300,
          longitude: 21.0100,
        },
        numberOfPeople: 2,
      },
    ],
  },
  {
    id: 4,
    status: "NOT_STARTED",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-05"),
    cancel: false,
    numberOfStages: 1,
    stages: [
      {
        id: 1,
        dateRange: {
          startDate: new Date("2026-03-01"),
          endDate: new Date("2026-03-05"),
        },
        coordinates: {
          latitude: 53.1325,
          longitude: 23.1688,
        },
        numberOfPeople: 4,
      },
    ],
  },
];

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-col">
          <Title className="text-5xl font-normal" title={pageConfig.title} />
          <div className="mt-7 flex-1 flex flex-col gap-6 overflow-hidden">
            <FilterSection infoText={filterSectionConfig} control={control} errors={formState.errors} onCreate={function (): void {
              throw new Error("Function not implemented.");
            } } />
            <TripsSection infoText={tripsSectionConfig} trips={sampleTrips} 
              onDelete={function (tripId: number): void {
              throw new Error("Function not implemented.");
            } } onEdit={function (tripId: number): void {
              throw new Error("Function not implemented.");
            } } onShowDetails={function (tripId: number): void {
              throw new Error("Function not implemented.");
            } } onCancel={function (tripId: number): void {
              throw new Error("Function not implemented.");
            } }/>
          </div>
        </div>
      </main>
    </div>
  );
};
