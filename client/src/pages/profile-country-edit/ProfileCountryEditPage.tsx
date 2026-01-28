import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import type { JSX } from "react";
import { pageConfig } from "./config/page.config";
import { informationSectionConfig } from "./config/informationSection.config";
import type { ProfileCountryValues } from "./ProfileCountryEditPage.types";
import { useFieldArray, useForm } from "react-hook-form";
import { InformationSection } from "./components/InformationSection/InformationSection";
import { EvacuationSection } from "./components/ProfileCountrySection/ProfileCountrySection";
import { profileCountrySectionConfig } from "./config/profileCountrySection.config";

export const ProfileCountries = [
  {
    id: '1',
    name: 'Poland',
    description: 'Country in Central Europe, capital Warsaw.',
    countryCode: 'PL',
    consulates: [
      {
        id: 'c1',
        address: 'ul. Marszałkowska 10, 00-001 Warszawa, Poland',
        phone: '+48 22 123 45 67',
        email: 'warsaw@consulate.gov.pl',
        website: 'https://warsaw.consulate.gov.pl',
        dataUpdate: new Date('2026-01-20'),
      },
      {
        id: 'c2',
        address: 'ul. Piłsudskiego 5, 30-001 Kraków, Poland',
        phone: '+48 12 234 56 78',
        email: 'krakow@consulate.gov.pl',
        website: 'https://krakow.consulate.gov.pl',
        dataUpdate: new Date('2026-01-18'),
      },
    ],
    dataUpdate: new Date('2026-01-25'),
  },
  {
    id: '2',
    name: 'Germany',
    description: 'Country in Western Europe, capital Berlin.',
    countryCode: 'DE',
    consulates: [
      {
        id: 'c3',
        address: 'Unter den Linden 77, 10117 Berlin, Germany',
        phone: '+49 30 123 45 67',
        email: 'berlin@consulate.gov.de',
        website: 'https://berlin.consulate.gov.de',
        dataUpdate: new Date('2026-01-22'),
      },
      {
        id: 'c4',
        address: 'Maximilianstraße 15, 80539 München, Germany',
        phone: '+49 89 234 56 78',
        email: 'munich@consulate.gov.de',
        website: 'https://munich.consulate.gov.de',
        dataUpdate: new Date('2026-01-21'),
      },
    ],
    dataUpdate: new Date('2026-01-24'),
  },
  {
    id: '3',
    name: 'France',
    description: 'Country in Western Europe, capital Paris.',
    countryCode: 'FR',
    consulates: [
      {
        id: 'c5',
        address: '55 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
        phone: '+33 1 234 56 78',
        email: 'paris@consulate.gov.fr',
        website: 'https://paris.consulate.gov.fr',
        dataUpdate: new Date('2026-01-23'),
      },
      {
        id: 'c6',
        address: '12 Avenue Montaigne, 75008 Paris, France',
        phone: '+33 1 345 67 89',
        email: 'paris2@consulate.gov.fr',
        website: 'https://paris2.consulate.gov.fr',
        dataUpdate: new Date('2026-01-22'),
      },
    ],
    dataUpdate: new Date('2026-01-26'),
  },
];

export const Consulates = [
  {
    id: '1',
    address: 'ul. Marszałkowska 10, 00-001 Warszawa, Poland',
    phone: '+48 22 123 45 67',
    email: 'warsaw@consulate.gov.pl',
    website: 'https://warsaw.consulate.gov.pl',
    dataUpdate: new Date('2026-01-20'),
  },
  {
    id: '2',
    address: 'ul. Piłsudskiego 5, 00-950 Warszawa, Poland',
    phone: '+48 22 234 56 78',
    email: 'krakow@consulate.gov.pl',
    website: 'https://krakow.consulate.gov.pl',
    dataUpdate: new Date('2026-01-18'),
  },
  {
    id: '3',
    address: 'ul. Świętokrzyska 12, 00-004 Warszawa, Poland',
    phone: '+48 22 345 67 89',
    email: 'gdańsk@consulate.gov.pl',
    website: 'https://gdansk.consulate.gov.pl',
    dataUpdate: new Date('2026-01-22'),
  },
  {
    id: '4',
    address: 'ul. Nowy Świat 15, 00-002 Warszawa, Poland',
    phone: '+48 22 456 78 90',
    email: 'wrocław@consulate.gov.pl',
    website: 'https://wroclaw.consulate.gov.pl',
    dataUpdate: new Date('2026-01-25'),
  },
  {
    id: '5',
    address: 'ul. Chmielna 21, 00-020 Warszawa, Poland',
    phone: '+48 22 567 89 01',
    email: 'poznań@consulate.gov.pl',
    website: 'https://poznan.consulate.gov.pl',
    dataUpdate: new Date('2026-01-23'),
  },
];


export const ProfileCountryEditPage = (): JSX.Element => {
  const { control, handleSubmit, watch } = useForm<ProfileCountryValues>({
    mode: "all",
    defaultValues: {
      generalInfoForm: {
          name: ProfileCountries[0].name,
          description: ProfileCountries[0].description,
          countryCode: ProfileCountries[0].countryCode,
          dateUpdate: ProfileCountries[0].dataUpdate,
          dangerLevel: "MEDIUM",
      },
      consulatesForm: {
          consulates: Consulates.map((a) => ({ ...a, isActive: null })),
      },
    },
  });

  const {fields: fieldsConsulates,} = useFieldArray({
    control,
    name: "consulatesForm.consulates",
  });

   const onCancel = () => {
    console.log("Cancel clicked");
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Submit clicked", data);
  });

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-col">
          <Title className="text-5xl font-normal" title={pageConfig.title} />
          <div className="mt-7 flex-1 flex flex-row justify-between overflow-hidden">
            <InformationSection 
              infoText={informationSectionConfig} 
              profileCountry={watch()} 
              onCancel={onCancel} 
              onSubmit={onSubmit}
            />
            <EvacuationSection 
              infoText={{profileCountrySectionConfig:profileCountrySectionConfig, informationSectionConfig:informationSectionConfig}}
              control={control}
              fieldsConsulates={fieldsConsulates}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
