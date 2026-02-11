import { useEffect, useMemo, useRef, useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FilterSection } from "./components/FilterSection/FilterSection";
import { TripsSection } from "./components/TripsSection/TripsSection";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";

import { tripsSectionConfig } from "./config/tripsSection.config";
import { filterSectionConfig } from "./config/filterSection.config";
import { pageConfig } from "./config/page.config";

import type { FilterValues } from "./TripsReadPage.types";
import type { Trip } from "@/types/domain/trip";
import { routesConfig } from "@/types/rotes/rotes";
import {
  mapTravelResponseToDomain,
  mapTripToCancelToApi,
} from "@/utils/mappers/tripMapper";
import { deleteTravel, listTravels, updateTravel } from "@/service/api/trip";
import type { TravelUpdate } from "@/types/api/travel";
import { HttpError } from "@/service/http/request";
import { ClipLoader } from "react-spinners";
import _ from "lodash";

const defalutFilter: FilterValues = {
  numberOfStages: filterSectionConfig.numberOfStages.defaultValue,
  status: filterSectionConfig.status.defaultValue,
  startDate: filterSectionConfig.startDate.defaultValue,
  endDate: filterSectionConfig.endDate.defaultValue,
};

export const TripsReadPage = (): JSX.Element => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isFetchingRef = useRef(false);

  const handleError = (error: unknown,fallbackMessage = "Wystąpił błąd"): boolean => {
    const status =
      error instanceof HttpError
        ? error.status
        : ((error as any)?.response?.status ?? (error as any)?.status);

    const detail =
      error instanceof HttpError
        ? error.detail
        : ((error as any)?.response?.data?.detail ?? (error as any)?.message);

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

  const filterData = (data: Trip[], filters: FilterValues): Trip[] => {
      return _.filter(data, (item) => {
        if (filters.status && filters.status.length > 0 && !filters.status.includes(item.status)) {
          return false;
        }
  
        if (filters.startDate && filters.startDate instanceof Date) {
          const filterDate = filters.startDate;
          const itemDate = item.startDate;
          if (itemDate <= filterDate) {
            return false;
          }
        }
  
        if (filters.endDate && filters.endDate instanceof Date) {
          const filterDate = filters.endDate;
          const itemDate = item.endDate;
          if (itemDate >= filterDate) {
            return false;
          }
        }
  
        if (filters.numberOfStages && filters.numberOfStages > 0 && item.stages.length !== filters.numberOfStages) {
          return false;
        }
  
      return true;
      });
    }

  const fetchTravel = async (showLoader: boolean = true) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (showLoader) setLoading(true);
    try {
      const travels: Trip[] = (await listTravels()).map(
        mapTravelResponseToDomain,
      );
      setTrips(travels);
    } catch (error) {
        handleError(error);
    } finally {
      isFetchingRef.current = false;
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravel(true);
    const intervalId = setInterval(() => {
      fetchTravel(false);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { control , watch} = useForm<FilterValues>({
    mode: "all",
    defaultValues: defalutFilter,
  });


 const filters = watch(); 

  const filteredTrips = useMemo(() => {
    return filterData(trips, filters);
  }, [trips, filters]);

  const onDelete = async (tripId: number) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę podróż?");
    if (!confirmed) return;

    try {
      await deleteTravel(tripId);
      alert("Podróż została usunięta.");
    } catch (error) {
      handleError(error);
    } finally {
      fetchTravel();
    }
  };

  const onEdit = (tripId: number) => {
    navigate(routesConfig.TRIP_EDIT.path.replace(":tripId", String(tripId)));
  };

  const onCancel = async (tripId: number) => {
    const confirmed = window.confirm("Czy na pewno chcesz anulować tę podróż?");
    if (!confirmed) return;

    try {
      const trip = trips.find((trip) => trip.id === tripId);
      if (trip) {
        const payload: TravelUpdate = mapTripToCancelToApi(trip);
        await updateTravel(trip.id, payload);
        alert("Podróż została anulowana.");
      } else {
        alert("Nie znaleziono podróży. Odśwież stronę.");
      }
    } catch (error) {
      handleError(error);
    } finally {
      fetchTravel();
    }
  };

  const onCreate = () => {
    navigate(routesConfig.TRIP_CREATE.path);
  };

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
          <Title className="text-5xl font-normal" title={pageConfig.title} />
          <div className="mt-7 flex-1 flex flex-col gap-6 overflow-hidden">
            <FilterSection
              infoText={filterSectionConfig}
              control={control}
              onCreate={onCreate}
            />
            <TripsSection
              infoText={tripsSectionConfig}
              trips={filteredTrips}
              onDelete={onDelete}
              onEdit={onEdit}
              onCancel={onCancel}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
