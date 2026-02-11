import { useForm, useFieldArray } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";

import { StagesSection } from "./components/StagesSection/StagesSection";
import { InformationSection } from "./components/InformationSection/InformationSection";

import { informationSectionConfigCreate,informationSectionConfigEdit } from "./config/informationSection.config";
import { stagesSectionConfig } from "./config/stagesSection.config";
import { pageConfigCreate,pageConfigEdit } from "./config/page.config";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";

import type { TripCreatePageProps } from "./TripCreatePage.types";
import { createTravel, getTravel, updateTravel } from "@/service/api/trip";
import type { TravelCreate, TravelUpdate } from "@/types/api/travel";
import { routesConfig } from "@/types/rotes/rotes";
import type { Trip, TripCreate, TripEdit } from "@/types/domain";
import type { TripFormValue } from "@/types/forms/trip";
import {
  mapTravelResponseToDomain,
  mapTripCreateToApi,
  mapTripEditToApi,
  mapTripFormValueToDomainCreate,
  mapTripFormValueToDomainEdit,
} from "@/utils/mappers/tripMapper";
import { HttpError } from "@/service/http/request";
import { ClipLoader } from "react-spinners";

const defaultTrip: TripFormValue = {
  id: null,
  stages: [
    {
      numberOfPeople: stagesSectionConfig.stage.numberOfPeople.defaultValue,
      coordinates: {
        latitude:
          stagesSectionConfig.stage.coordinates.defaultValue?.latitude ?? null,
        longitude:
          stagesSectionConfig.stage.coordinates.defaultValue?.longitude ?? null,
      },
      dateRange: {
        startDate:
          stagesSectionConfig.stage.dateRange.defaultValue?.startDate ?? null,
        endDate:
          stagesSectionConfig.stage.dateRange.defaultValue?.endDate ?? null,
      },
    },
  ],
};

export const TripCreatePage = ({}: TripCreatePageProps): JSX.Element => {
  const { tripId } = useParams<{ tripId: string }>();
  const isEditMode = Boolean(tripId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditMode);

  
  const handleError = (error: unknown, fallbackMessage = "Wystąpił błąd"): boolean => {
    const status = error instanceof HttpError ? error.status : (error as any)?.response?.status ?? (error as any)?.status;
    const detail = error instanceof HttpError ? error.detail : (error as any)?.response?.data?.detail ?? (error as any)?.message;

    if (status === 401) {
      alert("Aby kontynuować, najpierw zaloguj się.");
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
      navigate(routesConfig.TRIPS_READ.path, { replace: true });
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

  if (isEditMode && (!tripId || Number.isNaN(Number(tripId)))) {
    return <Navigate to={routesConfig.NOT_FOUND.path} />;
  }

  const { control, handleSubmit, watch, reset } = useForm<TripFormValue>({
    mode: "all",
    defaultValues: { ...defaultTrip },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "stages" });

  const fetchTravel = async (id: number) => {
    setLoading(true);
    try {
      const travel: Trip = mapTravelResponseToDomain(await getTravel(id));
      reset(travel);
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode && tripId) {
      fetchTravel(Number(tripId));
    } else {
      reset({ ...defaultTrip });
    }
  }, [tripId, isEditMode]);

  const navigateBack = () => {
    const confirmed = window.confirm("Czy na pewno chcesz anulować zmiany?");
    if (!confirmed) return;
    window.history.length > 1
      ? navigate(-1)
      : navigate(routesConfig.TRIPS_READ.path, { replace: true });
  };

  const onSubmit = handleSubmit(async (data: TripFormValue) => {
    try {
      if (isEditMode && data.id) {
        const payload: TripEdit = mapTripFormValueToDomainEdit(data);
        const response: TravelUpdate = mapTripEditToApi(payload);
        await updateTravel(payload.id, response);
        alert("Podróż została zaktualizowana");
        fetchTravel(payload.id);
      } else {
        const payload: TripCreate = mapTripFormValueToDomainCreate(data);
        const response: TravelCreate = mapTripCreateToApi(payload);
        await createTravel(response);
        alert("Podróż została utworzona");
        reset({ ...defaultTrip });
      }
    } catch (error) {
      handleError(error, "Nie udało się zapisać podróży")
    }
  });

  const onCancel = () => { navigateBack(); };
  
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-(--main-bg-color)">
        <ClipLoader color="var(--main-text-color)" size={60} />
        <p className="mt-4 font-geologica text-lg opacity-70">{"........"}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-col">
          <Title className="text-5xl font-normal" title={isEditMode? pageConfigEdit.title : pageConfigCreate.title} />
          <div className="mt-7 flex-1 flex flex-row justify-between overflow-hidden">
            <InformationSection
              infoText={isEditMode? informationSectionConfigEdit : informationSectionConfigCreate}
              stages={watch("stages")}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
            <StagesSection
              infoText={stagesSectionConfig}
              fields={fields}
              control={control}
              onAddStage={() => append(defaultTrip.stages[0])}
              onRemoveStage={(index) => {
                fields.length > 1 && remove(index);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
