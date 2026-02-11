import { useEffect, useMemo, useRef, useState, type JSX } from "react";

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
import { HttpError } from "@/service/http/request";
import { deleteEvacuation, listEvacuations, updateEvacuation } from "@/service/api/evacuation";
import { mapEvacuationActiveToApi, mapEvacuationCancelToApi, mapEvacuationResponseToDomain } from "@/utils/mappers";
import type { EvacuationUpdate } from "@/types/api/evacuation";
import { ClipLoader } from "react-spinners";
import _ from "lodash";

const defalutFilter: FilterValues = {
  status: filterSectionConfig.status.defaultValue,
  startLastUpdateDate: filterSectionConfig.startLastUpdateDate.defaultValue,
  endLastUpdateDate: filterSectionConfig.endLastUpdateDate.defaultValue,
  isEditable: filterSectionConfig.isEditable.defaultValue,
};

export const EvacuationsReadPage = (): JSX.Element => {
  const [evacuations, setEvacuations] = useState<Evacuation[]>([]);
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

  const filterData = (data: Evacuation[], filters: FilterValues): Evacuation[] => {
    return _.filter(data, (item) => {
      if (filters.status && filters.status.length > 0 && !filters.status.includes(item.status)) {
        return false;
      }

      if (filters.startLastUpdateDate && filters.startLastUpdateDate instanceof Date && item.dataLastActivated) {
        const filterDate = filters.startLastUpdateDate;
        const itemDate = item.dataLastActivated;
        if (itemDate <= filterDate) {
          return false;
        }
      }

      if (filters.endLastUpdateDate && filters.endLastUpdateDate instanceof Date && item.dataLastActivated) {
        const filterDate = filters.endLastUpdateDate;
        const itemDate = item.dataLastActivated;
        if (itemDate >= filterDate) {
          return false;
        }
      }


      if (filters.isEditable && item.canEdit !== filters.isEditable) {
        return false;
      }

    return true;
    });
  }

  const fetchEvacuation = async (showLoader: boolean = true) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (showLoader) setLoading(true);
    try {
      const evacuation: Evacuation[] = (await listEvacuations()).map(mapEvacuationResponseToDomain);
      setEvacuations(evacuation);
    } catch (error) {
      handleError(error);
    } finally {
      isFetchingRef.current = false;
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvacuation(true);
    const intervalId = setInterval(() => {
      fetchEvacuation(false);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);


  const { control, watch } = useForm<FilterValues>({
    mode: "all",
    defaultValues: defalutFilter,
  });

  const filters = watch(); 

  const filteredEvacuations = useMemo(() => {
    return filterData(evacuations, filters);
  }, [evacuations, filters]);



  const onDelete = async (evacuationId: number) => {
      const confirmed = window.confirm("Czy na pewno chcesz usunąć tę ewakuację?");
      if (!confirmed) return;
  
      try {
        await deleteEvacuation(evacuationId);
        alert("evakuacja została usunięta.");
      } catch (error) {
        handleError(error);
      } finally {
        fetchEvacuation();
      }
    };

   const onEdit = (evacuationId: number) => {
    navigate(routesConfig.EVACUATION_EDIT.path.replace(":evacuationId", String(evacuationId)));
  };

  const onCancel = async (evacuationId: number) => {
      const confirmed = window.confirm("Czy na pewno chcesz anulować tę ewakuację?");
      if (!confirmed) return;
  
      try {
        const evacuation = evacuations.find((evacuation) => evacuation.id === evacuationId);
        if (evacuation) {
          const payload: EvacuationUpdate = mapEvacuationCancelToApi(evacuation);
          await updateEvacuation(evacuation.id, payload);
          alert("Ewakuacja została anulowana.");
        } else {
          alert(" Nie można znaleźć ewakuacji do anulowania.");
        }
      } catch (error) {
        handleError(error);
      } finally {
        fetchEvacuation();
      }
    };
  
  const onActive = async (evacuationId: number) => {
    const confirmed = window.confirm("Czy na pewno chcesz aktywować tę ewakuację?");
    if (!confirmed) return;

    try {
      const evacuation = evacuations.find((evacuation) => evacuation.id === evacuationId);
      if (evacuation) {
        const payload: EvacuationUpdate = mapEvacuationActiveToApi(evacuation);
        await updateEvacuation(evacuation.id, payload);
        alert("Ewakuacja została aktywowana.");
      } else {
        alert(" Nie można znaleźć ewakuacji do aktywowania.");
      }
    } catch (error) {
      handleError(error);
    } finally {
      fetchEvacuation();
    }
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
              onCreate={() => navigate(routesConfig.EVACUATION_CREATE.path)}
            />
            <EvacuationsSection
              infoText={evacuationsSectionConfig}
              evacuations={filteredEvacuations}
              onActive={onActive}
              onCancel={onCancel}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
