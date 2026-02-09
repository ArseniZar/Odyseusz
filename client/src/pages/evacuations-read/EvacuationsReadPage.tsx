import { useEffect, type JSX } from "react";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { pageConfig } from "./config/page.config";
import { routesConfig } from "@/types/rotes/rotes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { FilterValues } from "./EvacuationsReadPage.types";
import { filterSectionConfig } from "./config/filterSection.config";
import { evacuationsSectionConfig } from "./config/evacuationsSection.config";
import { FilterSection } from "./components/FilterSection/FilterSection";
import { EvacuationsSection } from "./components/EvacuationsSection/EvacuationsSection";
import type { Evacuation } from "@/types/domain/evacuation";

export const mockEvacuations: Evacuation[] = [
  {
    id: 1,
    status: "ACTIVE",
    name: "Evacuation – Industrial Zone",
    reason: "Chemical leak detected",
    description:
      "Emergency evacuation due to hazardous chemical spill in the industrial area.",
    areas: [
      {
        coordinates: {
          latitude: 52.520008,
          longitude: 13.404954,
        },
        radius: 1500,
      },
    ],
    collectionPoints: [
      {
        id: 101,
        name: "Central Stadium",
        description: "Main evacuation assembly point",
        coordinates: {
          latitude: 52.522,
          longitude: 13.409,
        },
      },
      {
        id: 102,
        name: "City Park Entrance",
        description: "Secondary collection point near the park",
        coordinates: {
          latitude: 52.518,
          longitude: 13.398,
        },
      },
    ],
    assistants: [
      {
        id: 201,
        name: "Anna Müller",
        workingHours: "08:00 - 16:00",
        phone: "+49 170 1234567",
        email: "anna.mueller@example.com",
      },
      {
        id: 202,
        name: "Max Schmidt",
        workingHours: "16:00 - 00:00",
        phone: "+49 170 7654321",
        email: "max.schmidt@example.com",
      },
    ],
    dataUpdate: new Date("2026-01-20"),
    dataLastActivated: new Date("2026-01-21"),
  },
  {
    id: 2,
    status: "ACTIVE",
    name: "Evacuation – Riverside Area",
    reason: "Flood risk",
    description:
      "Preventive evacuation due to rising water levels in the river.",
    areas: [
      {
        coordinates: {
          latitude: 48.137154,
          longitude: 11.576124,
        },
        radius: 2500,
      },
    ],
    collectionPoints: [
      {
        id: 103,
        name: "Community Hall North",
        description: "Indoor assembly point",
        coordinates: {
          latitude: 48.14,
          longitude: 11.58,
        },
      },
    ],
    assistants: [
      {
        id: 203,
        name: "Laura Fischer",
        workingHours: "07:00 - 15:00",
        phone: "+49 151 9876543",
        email: "laura.fischer@example.com",
      },
    ],
    dataUpdate: new Date("2026-01-18"),
    dataLastActivated: new Date("2026-01-19"),
  },
  {
    id: 3,
    status: "CANCELLED",
    name: "Evacuation – Old Town",
    reason: "Gas leak (false alarm)",
    description: "Evacuation cancelled after inspection confirmed no danger.",
    areas: [
      {
        coordinates: {
          latitude: 50.110924,
          longitude: 8.682127,
        },
        radius: 1000,
      },
    ],
    collectionPoints: [
      {
        id: 104,
        name: "Market Square",
        description: "Central town square",
        coordinates: {
          latitude: 50.111,
          longitude: 8.68,
        },
      },
    ],
    assistants: [],
    dataUpdate: new Date("2026-01-17"),
    dataLastActivated: null,
  },
  {
    id: 4,
    status: "ACTIVE",
    name: "Evacuation – Airport Zone",
    reason: "Security threat",
    description:
      "Temporary evacuation of airport perimeter due to security alert.",
    areas: [
      {
        coordinates: {
          latitude: 51.47002,
          longitude: -0.454295,
        },
        radius: 3000,
      },
    ],
    collectionPoints: [
      {
        id: 105,
        name: "Terminal Parking Area",
        description: "Outdoor parking area used as collection point",
        coordinates: {
          latitude: 51.471,
          longitude: -0.45,
        },
      },
      {
        id: 106,
        name: "Cargo Terminal Gate",
        description: "Secondary point near cargo terminal",
        coordinates: {
          latitude: 51.468,
          longitude: -0.46,
        },
      },
    ],
    assistants: [
      {
        id: 204,
        name: "James Brown",
        workingHours: "09:00 - 18:00",
        phone: "+44 7700 900123",
        email: "james.brown@example.com",
      },
    ],
    dataUpdate: new Date("2026-01-22"),
    dataLastActivated: new Date("2026-01-23"),
  },
];

const defalutFilter: FilterValues = {
  status: filterSectionConfig.status.defaultValue,
  lastUpdateDate: filterSectionConfig.lastUpdateDate.defaultValue,
};

export const EvacuationsReadPage = (): JSX.Element => {
  const { control, watch } = useForm<FilterValues>({
    mode: "all",
    defaultValues: defalutFilter,
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Форма изменилась:", watch());
  }, [watch()]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-col">
          <Title className="text-5xl font-normal" title={pageConfig.title} />
          <div className="mt-7 flex-1 flex flex-col gap-6 overflow-hidden">
            <FilterSection
              infoText={filterSectionConfig}
              control={control}
              onCreate={() => navigate(routesConfig.EVACUATION_CREATE.path)}
            />
            <EvacuationsSection
              infoText={evacuationsSectionConfig}
              evacuations={mockEvacuations}
              onActive={function (evacuationId: number): void {
                throw new Error("Function not implemented.");
              }}
              onCancel={function (evacuationId: number): void {
                throw new Error("Function not implemented.");
              }}
              onDelete={function (evacuationId: number): void {
                throw new Error("Function not implemented.");
              }}
              onEdit={function (evacuationId: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
