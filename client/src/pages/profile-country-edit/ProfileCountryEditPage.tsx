import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { useEffect, useState, type JSX } from "react";
import { pageConfig } from "./config/page.config";
import { informationSectionConfig } from "./config/informationSection.config";
import { useFieldArray, useForm } from "react-hook-form";
import { InformationSection } from "./components/InformationSection/InformationSection";
import { EvacuationSection } from "./components/ProfileCountrySection/ProfileCountrySection";
import { profileCountrySectionConfig } from "./config/profileCountrySection.config";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { HttpError } from "@/service/http/request";
import { routesConfig } from "@/types/rotes";
import type { Consulate, ProfileCountry, ProfileCountryEdit } from "@/types/domain";
import { getCountryProfile, listConsulates, updateCountryProfile } from "@/service/api/country";
import {
  mapConsulateResponseToDomain,
  mapCountryProfileResponseToDomain,
  mapProfileCountryEditToApi,
  mapProfileCountryFormValuesToDomainEdit,
  mapProfileCountryToForm,
} from "@/utils/mappers/countryMapper";
import type {
  ConsulateFormValues,
  ProfileCountryFormValues,
} from "@/types/forms/profileCountry";
import type { CountryProfileUpdate } from "@/types/api/country";
import { ClipLoader } from "react-spinners";

const defaultProfileCountry: ProfileCountryFormValues = {
  id: 0,
  generalInfoForm: {
    name: "",
    description: profileCountrySectionConfig.generalInfoForm.description.defaultValue ?? null,
    countryCode: "",
    dateUpdate: new Date(),
    dangerLevel: "LOW",
  },
  consulatesForm: {
    consulates: [],
  },
};

export const ProfileCountryEditPage = (): JSX.Element => {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  if (!profileId || Number.isNaN(Number(profileId))) {
    console.error("Nieprawidłowy ID profilu kraju:", profileId);
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
        navigate(routesConfig.PROFILE_COUNTRY_READ.path, { replace: true });
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

  const { control, handleSubmit, watch, reset } =
    useForm<ProfileCountryFormValues>({
      mode: "all",
      defaultValues: { ...defaultProfileCountry },
    });
  const { fields: fieldsConsulates } = useFieldArray({
    control,
    name: "consulatesForm.consulates",
  });

  const resetFormData = (profile: ProfileCountry,consulatesAll: Consulate[]) => { 
    const resetData: ProfileCountryFormValues =mapProfileCountryToForm(profile);
    const activeIds = new Set(resetData.consulatesForm.consulates.map((a) => a.id));
    const consulatesWithActive: ConsulateFormValues[] = consulatesAll.map(
      (consulate) => ({
        ...consulate,
        isActive: activeIds.has(consulate.id),
      }),
    );
    resetData.consulatesForm.consulates = consulatesWithActive;
    return resetData;
  };

  const fetchProfileCountry = async (id: number) => {
    setLoading(true);
    try {
      const profile: ProfileCountry = mapCountryProfileResponseToDomain(await getCountryProfile(id));
      if (profile.canEdit) {
        const consulates: Consulate[] = (await listConsulates()).map(mapConsulateResponseToDomain);
        reset(resetFormData(profile, consulates));
      }
      else {
        alert("Ten profil kraju nie jest edytowalny przez tego redactora.");
        navigate(routesConfig.PROFILE_COUNTRY_READ.path, { replace: true });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileCountry(Number(profileId));
  }, [profileId]); 
  
  const navigateBack = () => {
    const confirmed = window.confirm("Czy na pewno chcesz anulować zmiany?");
    if (!confirmed) return;
    window.history.length > 1
      ? navigate(-1)
      : navigate(routesConfig.PROFILE_COUNTRY_READ.path, { replace: true });
  };

  const onSubmit = handleSubmit(async (data:ProfileCountryFormValues) => {
    try {
      if (data.id) {
        const payload: ProfileCountryEdit = mapProfileCountryFormValuesToDomainEdit(data);
        const response: CountryProfileUpdate = mapProfileCountryEditToApi(payload);
        await updateCountryProfile(payload.id, response);
        alert("Profil kraju został zaktualizowany");
        fetchProfileCountry(payload.id);
      } else {
        alert("Nie można zaktualizować profilu kraju. Brak ID.");
      }
    } catch (error) {
        handleError(error, "Nie udało się zaktualizować profilu kraju.");
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
          <Title className="text-5xl font-normal" title={pageConfig.title} />
          <div className="mt-7 flex-1 flex flex-row justify-between overflow-hidden">
            <InformationSection
              infoText={informationSectionConfig}
              profileCountry={watch()}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
            <EvacuationSection
              infoText={{
                profileCountrySectionConfig: profileCountrySectionConfig,
                informationSectionConfig: informationSectionConfig,
              }}
              control={control}
              fieldsConsulates={fieldsConsulates}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
