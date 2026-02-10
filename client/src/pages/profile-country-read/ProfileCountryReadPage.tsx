import { useEffect, useRef, useState, type JSX } from "react";
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
import type { ProfileCountry } from "@/types/domain";
import { HttpError } from "@/service/http/request";
import { routesConfig } from "@/types/rotes";
import { listCountryProfiles } from "@/service/api/country";
import { mapCountryProfileResponseToDomain } from "@/utils/mappers/countryMapper";
import { ClipLoader } from "react-spinners";

const defalutFilter: FilterValues = {
  status: filterSectionConfig.status.defaultValue,
  lastUpdateDate: filterSectionConfig.lastUpdateDate.defaultValue,
  isEditable: filterSectionConfig.isEditable.defaultValue,
};

export const ProfileCountryReadPage = (): JSX.Element => {
  const [profiles, setProfiles] = useState<ProfileCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isFetchingRef = useRef(false);
  
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

  const fetchProfileCountry = async (showLoader: boolean = true) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (showLoader) setLoading(true);
    try {
      const profileCountries: ProfileCountry[] = (await listCountryProfiles()).map(mapCountryProfileResponseToDomain);
      setProfiles(profileCountries);
    } catch (error) {
      handleError(error);
    } finally {
      isFetchingRef.current = false;
      if (showLoader) setLoading(false);
    }
  };

   useEffect(() => {
    fetchProfileCountry(true);
    const intervalId = setInterval(() => {
      fetchProfileCountry(false);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { control } = useForm<FilterValues>({
    mode: "all",
    defaultValues: defalutFilter,
  });

  const onEdit = (profileCountryId: number) => {
    navigate(routesConfig.PROFILE_COUNTRY_EDIT.path.replace(":profileId", String(profileCountryId)));
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
            <FilterSection infoText={filterSectionConfig} control={control} />
            <ProfileCountriesSection
              infoText={profileCountriesSectionConfig}
              profilesCountries={profiles}
              onEdit={onEdit}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
