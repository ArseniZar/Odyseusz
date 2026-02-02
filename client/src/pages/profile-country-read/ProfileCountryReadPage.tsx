import { useEffect, type JSX } from "react";
import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { pageConfig } from "./config/page.config";
import { FilterSection } from "./components/FilterSection/FilterSection";
import { filterSectionConfig } from "./config/filterSection.cofig";
import type { FilterValues } from "./ProfileCountryReadPage.types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProfileCountriesSection } from "./components/ProfileCountriesSection/ProfileCountriesSection";
import { profileCountriesSectionConfig } from "./config/profileCountriesSection.config";
import type { ProfileCountry } from "@/types/all_types";

const mockProfileCountries: ProfileCountry[] = [
  {
    id: 1,
    name: "Polska",
    isEditable: true,
    dangerLevel: "LOW",
    description: "Standardowy kraj, niskie ryzyko",
    countryCode: "PL",
    consulates: [
      {
        id: 1,
        address: "ul. Wiejska 10, Warszawa",
        phone: "+48 22 123 45 67",
        email: "consulate@pl.gov.pl",
        website: "https://pl.gov.pl",
        dataUpdate: new Date("2026-01-01"),
      },
    ],
    dataUpdate: new Date("2026-01-01"),
  },
  {
    id: 2,
    name: "Niemcy",
    isEditable: false,
    dangerLevel: "MEDIUM",
    description: "Kraj średniego ryzyka, zalecane ostrożność",
    countryCode: "DE",
    consulates: [
      {
        id: 2,
        address: "Unter den Linden 12, Berlin",
        phone: "+49 30 123 456",
        email: "consulate@de.gov.de",
        website: "https://de.gov.de",
        dataUpdate: new Date("2026-01-02"),
      },
    ],
    dataUpdate: new Date("2026-01-02"),
  },
  {
    id: 3,
    name: "Francja",
    isEditable: true,
    dangerLevel: "HIGH",
    description: "Wysokie ryzyko, wymagana szczególna ostrożność",
    countryCode: "FR",
    consulates: [
      {
        id: 3,
        address: "10 Rue de la Paix, Paryż",
        phone: "+33 1 2345 6789",
        email: "consulate@fr.gov.fr",
        website: "https://fr.gov.fr",
        dataUpdate: new Date("2026-01-03"),
      },
    ],
    dataUpdate: new Date("2026-01-03"),
  },
  {
    id: 4,
    name: "Ukraina",
    isEditable: false,
    dangerLevel: "EXTREME",
    description: "Kraj o krytycznym poziomie zagrożenia",
    countryCode: "UA",
    consulates: [
      {
        id: 4,
        address: "Khreshchatyk 22, Kijów",
        phone: "+380 44 123 4567",
        email: "consulate@ua.gov.ua",
        website: "https://ua.gov.ua",
        dataUpdate: new Date("2026-01-04"),
      },
    ],
    dataUpdate: new Date("2026-01-04"),
  },
];

const defalutFilter: FilterValues = {
  status: filterSectionConfig.status.defaultValue,
  lastUpdateDate: filterSectionConfig.lastUpdateDate.defaultValue,
  isEditable: filterSectionConfig.isEditable.defaultValue,
};

export const ProfileCountryReadPage = (): JSX.Element => {
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
            <FilterSection infoText={filterSectionConfig} control={control} />
            <ProfileCountriesSection
              infoText={profileCountriesSectionConfig}
              profilesCountries={mockProfileCountries}
              onEdit={function (profileCountryId: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
