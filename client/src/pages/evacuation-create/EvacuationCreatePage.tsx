import { useEffect, useState, type JSX } from "react";
import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { pageConfigCreate, pageConfigEdit } from "./config/page.config";
import { InformationSection } from "./components/InformationSection/InformationSection";
import {informationSectionConfigCreate,informationSectionConfigEdit} from "./config/informationSection.config";
import { EvacuationSection } from "./components/EvacuationSection/EvacuationSection";
import { evacuationSectionConfig } from "./config/evacuationSection.config";
import { useFieldArray, useForm } from "react-hook-form";
import type {
  AreaFormValues,
  AssistantFormValues,
  EvacuationFormValues,
  PointFormValues,
} from "@/types/forms/evacuation";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { routesConfig } from "@/types/rotes/rotes";
import { HttpError } from "@/service/http/request";
import type {
  Assistant,
  Evacuation,
  EvacuationCreate,
  EvacuationEdit,
} from "@/types/domain/evacuation";
import {
  createEvacuation,
  getEvacuation,
  listEvacuationAssistants,
  updateEvacuation,
} from "@/service/api/evacuation";
import {
  mapEvacuationAssistantResponseToDomain,
  mapEvacuationCreateToApi,
  mapEvacuationEditToApi,
  mapEvacuationFormValuesToDomainCreate,
  mapEvacuationFormValuesToDomainEdit,
  mapEvacuationResponseToDomain,
  mapEvacuationToForm,
} from "@/utils/mappers/evacuationMapper";
import type {
  EvacuationUpdate,
  EvacuationCreate as ApiEvacuationCreate,
} from "@/types/api/evacuation";

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
const defaultArea: AreaFormValues = {
  coordinates: {
    latitude:
      evacuationSectionConfig.areasForm.area.coordinates.defaultValue
        ?.latitude ?? null,
    longitude:
      evacuationSectionConfig.areasForm.area.coordinates.defaultValue
        ?.longitude ?? null,
  },
  radius: evacuationSectionConfig.areasForm.area.radius.defaultValue ?? null,
};

const defaultEvacuation: EvacuationFormValues = {
  id: null,
  generalInfoForm: {
    name: evacuationSectionConfig.generalInfoForm.name.defaultValue,
    reason: evacuationSectionConfig.generalInfoForm.reason.defaultValue,
    description:
      evacuationSectionConfig.generalInfoForm.description.defaultValue,
    activateImmediately:
      evacuationSectionConfig.generalInfoForm.activateImmediately
        .defaultValue ?? false,
  },
  areasForm: {
    areas: [defaultArea],
  },
  colectionPointsForm: {
    points: [defaultPoint],
  },
  assistantsForm: {
    assistants: [],
  },
};

export const EvacuationCreatePage = (): JSX.Element => {
  const { evacuationId } = useParams<{ evacuationId: string }>();
  const isEditMode = Boolean(evacuationId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditMode);

  if (isEditMode && (!evacuationId || Number.isNaN(Number(evacuationId)))) {
    return <Navigate to={routesConfig.NOT_FOUND.path} />;
  }

  const handleError = (
    error: unknown,
    fallbackMessage = "Wystąpił błąd",
  ): boolean => {
    const status =
      error instanceof HttpError
        ? error.status
        : ((error as any)?.response?.status ?? (error as any)?.status);
    const detail =
      error instanceof HttpError
        ? error.detail
        : ((error as any)?.response?.data?.detail ?? (error as any)?.message);

    if (status === 401) {
      alert("Nie masz dostępu. Zaloguj się ponownie.");
      navigate(routesConfig.AUTH_LOGIN.path, { replace: true });
      return true;
    }

    if (status === 403) {
      alert("Brak uprawnień do wykonania operacji.");
      navigate(routesConfig.AUTH_LOGIN.path, { replace: true });
      return false;
    }

    if (status === 404) {
      alert("Nie znaleziono zasobu.");
      return false;
    }

    if (status && status >= 500) {
      alert("Błąd serwera. Spróbuj ponownie później.");
      return false;
    }

    alert(detail || fallbackMessage);
    navigate(routesConfig.NOT_FOUND.path, { replace: true });
    return false;
  };

  const { control, reset, handleSubmit, watch } = useForm<EvacuationFormValues>(
    {
      mode: "all",
      defaultValues: { ...defaultEvacuation },
    },
  );

  const {
    fields: fieldsArea,
    append: appendArea,
    remove: removeArea,
  } = useFieldArray({ control, name: "areasForm.areas" });
  const {
    fields: fieldsPoint,
    append: appendPoint,
    remove: removePoint,
  } = useFieldArray({ control, name: "colectionPointsForm.points" });
  const { fields: fieldsAssistant } = useFieldArray({
    control,
    name: "assistantsForm.assistants",
  });

  const resetFormData = (
    evacuation: Evacuation,
    assistantsAll: Assistant[],
  ) => {
    const resetData: EvacuationFormValues = mapEvacuationToForm(evacuation);
    const activeIds = new Set(
      resetData.assistantsForm.assistants.map((a) => a.id),
    );
    const assistantsWithActive: AssistantFormValues[] = assistantsAll.map(
      (assistant) => ({
        ...assistant,
        isActive: activeIds.has(assistant.id),
      }),
    );
    resetData.assistantsForm.assistants = assistantsWithActive;
    return resetData;
  };

 const resetDefaultForm = (assistantsAll: Assistant[]) => {
    const resetData: EvacuationFormValues = {
      ...defaultEvacuation,
      assistantsForm: {
        assistants: assistantsAll.map((assistant) => ({
          ...assistant,
          isActive: false,
        })),
      },
    };
    return resetData;
  };
  const fetchEvacuation = async (id: number) => {
    setLoading(true);
    try {
      const evacuation: Evacuation = mapEvacuationResponseToDomain(await getEvacuation(id));
      console.log(evacuation);

      if (evacuation.canEdit) {
        const assistants: Assistant[] = (await listEvacuationAssistants()).map(mapEvacuationAssistantResponseToDomain);
        reset(resetFormData(evacuation, assistants));
    }
    else {
      alert("Ta ewakuacja nie jest edytowalna przez tego cordynatora.");
      navigate(routesConfig.EVACUATIONS_READ.path, { replace: true });
    }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssistants = async () => {
    try {
      const assistants: Assistant[] = (await listEvacuationAssistants()).map(
        mapEvacuationAssistantResponseToDomain,
      );
      reset(resetDefaultForm(assistants));
    } catch (error) {
      handleError(error, "Nie można pobrać listy asystentów.");
      reset(defaultEvacuation);
    }
  };

  useEffect(() => {
    if (isEditMode && evacuationId) {
      fetchEvacuation(Number(evacuationId));
    } else {
      fetchAssistants();
    }
  }, [evacuationId, isEditMode]);

  const navigateBack = () => {
    const confirmed = window.confirm("Czy na pewno chcesz anulować zmiany?");
    if (!confirmed) return;
    window.history.length > 1
      ? navigate(-1)
      : navigate(routesConfig.EVACUATIONS_READ.path, { replace: true });
  };

  const onSubmit = handleSubmit(async (data: EvacuationFormValues) => {
    try {
      if (isEditMode && data.id) {
        const payload: EvacuationEdit = mapEvacuationFormValuesToDomainEdit(data);
        const response: EvacuationUpdate = mapEvacuationEditToApi(payload);
        await updateEvacuation(payload.id, response);
        alert("Ewakuacja została zaktualizowana");
        fetchEvacuation(payload.id);
      } else {
        const payload: EvacuationCreate =
          mapEvacuationFormValuesToDomainCreate(data);
        const response: ApiEvacuationCreate = mapEvacuationCreateToApi(payload);
        await createEvacuation(response);
        alert("Ewakuacja zostala utworzona");
        fetchAssistants();
      }
    } catch (error) {
      handleError(error)
      alert("Nie można zapisać ewakuacji. Spróbuj ponownie.");
    }
  });

  const onCancel = () => {
    navigateBack();
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-col">
          <Title
            className="text-5xl font-normal"
            title={isEditMode ? pageConfigEdit.title : pageConfigCreate.title}
          />
          <div className="mt-7 flex-1 flex flex-row justify-between overflow-hidden">
            <InformationSection
              infoText={
                isEditMode
                  ? informationSectionConfigEdit
                  : informationSectionConfigCreate
              }
              evacuation={watch()}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
            <EvacuationSection
              infoText={{
                evacuationSectionConfig: evacuationSectionConfig,
                informationSectionConfig: isEditMode
                  ? informationSectionConfigEdit
                  : informationSectionConfigCreate,
              }}
              control={control}
              fieldsAreas={fieldsArea}
              fieldsPoints={fieldsPoint}
              fieldsAssistans={fieldsAssistant}
              onAddArea={() => appendArea(defaultArea)}
              onRemoveArea={(index) => {
                fieldsArea.length > 1 && removeArea(index);
              }}
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
