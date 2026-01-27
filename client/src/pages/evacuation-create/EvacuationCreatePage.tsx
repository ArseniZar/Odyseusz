import { useEffect, type JSX } from "react";
import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { pageConfig } from "./config/page.config";
import { InformationSection } from "./components/InformationSection/InformationSection";
import { informationSectionConfig } from "./config/informationSection.config";
import { EvacuationSection } from "./components/EvacuationSection/EvacuationSection";
import { evacuationSectionConfig } from "./config/evacuationSection.config";
import { useFieldArray, useForm } from "react-hook-form";
import type {EvacuationFormValues,PointFormValues} from "./EvacuationCreatePage.types";

const Assistants = [
  {
    id: "121",
    name: "Jan Kowalski",
    workingHours: "9:00-18:00",
    phone: "+380123456789",
    email: "jan@example.com",
  },
  {
    id: "122",
    name: "Maria Nowak",
    workingHours: "10:00-19:00",
    phone: "+380987654321",
    email: "maria@example.com",
  },
  {
    id: "123",
    name: "Aleksy Wiśniewski",
    workingHours: "8:00-17:00",
    phone: "+380555123456",
    email: "aleksy@example.com",
  },
];

const defaultPoint: PointFormValues = {
  name:
    evacuationSectionConfig.collectionPointsForm.point.name.defaultValue ??
    null,
  description:
    evacuationSectionConfig.collectionPointsForm.point.description
      .defaultValue ?? null,
  coordinates: {
    latitude:
      evacuationSectionConfig.collectionPointsForm.point.coordinates
        .defaultValue?.latitude ?? null,
    longitude:
      evacuationSectionConfig.collectionPointsForm.point.coordinates
        .defaultValue?.longitude ?? null,
  },
};


export const EvacuationCreatePage = (): JSX.Element => {
  const { control, handleSubmit, watch } = useForm<EvacuationFormValues>({
    mode: "all",
    defaultValues: {
      generalInfoForm: {
        name: null,
        reason: null,
        description: null,
        activateImmediately: false,
      },
      areaForm: {
        coordinates: {
          latitude: null,
          longitude: null,
        },
        radius: null,
      },
      colectionPointsForm: {
        points: [defaultPoint],
      },
      assistantsForm: {
        assistants: Assistants.map((a) => ({ ...a, isActive: null })),
      },
    },
  });

  const {
    fields: fieldsPoint,
    append: appendPoint,
    remove: removePoint,
  } = useFieldArray({
    control,
    name: "colectionPointsForm.points",
  });

  const {
    fields: fieldsAssistant,
  } = useFieldArray({
    control,
    name: "assistantsForm.assistants",
  });

  const onCancel = () => {
    console.log("Cancel clicked");
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Submit clicked", data);
  });

  useEffect(() => {
    console.log("Форма изменилась:", watch());
  }, [watch()]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-col">
          <Title className="text-5xl font-normal" title={pageConfig.title} />
          <div className="mt-7 flex-1 flex flex-row justify-between overflow-hidden">
            <InformationSection
              infoText={informationSectionConfig}
              evacuation={watch()}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
            <EvacuationSection
              infoText={Object.assign(
                evacuationSectionConfig,
                informationSectionConfig,
              )}
              control={control}
              fieldsPoints={fieldsPoint}
              fieldsAssistans={fieldsAssistant}
              onAddPoint={() => appendPoint(defaultPoint)}
              onRemovePoint={(index) => {
                fieldsPoint.length > 1 && removePoint(index);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
