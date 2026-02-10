import { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { routesConfig } from "@/types/rotes/rotes";
import { login } from "@/service/api/auth";
import { setTokens } from "@/service/auth/token";
import { HttpError } from "@/service/http/request";

interface LoginForm {
  email: string | null;
  password: string | null;
}

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState } = useForm<LoginForm>({
    mode: "all",
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const handleError = (
    error: unknown,
    fallbackMessage = "Wystąpił błąd",
  ): void => {
    const status =
      error instanceof HttpError
        ? error.status
        : ((error as any)?.response?.status ?? (error as any)?.status);

    const detail =
      error instanceof HttpError
        ? error.detail
        : ((error as any)?.response?.data?.detail ?? (error as any)?.message);

    if (status === 401) {
      alert("Nieprawidłowy email lub hasło. Spróbuj ponownie.");
      return;
    }

    if (status === 403) {
      alert("Brak dostępu do systemu.");
      return;
    }

    if (status && status >= 500) {
      alert("Błąd serwera. Spróbuj później.");
      return;
    }

    alert(detail || fallbackMessage);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        email: data.email ?? "",
        password: data.password ?? "",
      };

      const token = await login(payload);
      setTokens(token);

      alert("Logowanie zakończone sukcesem");
      // navigate(routesConfig.TRIPS_READ.path); 
    } catch (error) {
      handleError(
        error,
        "Nie udało się zalogować. Sprawdź dane i spróbuj ponownie.",
      );
    }
  });

  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-col max-w-xl">
          <Title
            className="text-5xl font-normal"
            title="Logowanie do systemu"
          />
          <form className="mt-7 flex flex-col gap-6" onSubmit={onSubmit}>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Podaj email" }}
              render={({ field, fieldState }) => (
                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={field.value}
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "Podaj hasło" }}
              render={({ field, fieldState }) => (
                <Input
                  type="password"
                  label="Hasło"
                  placeholder="••••••••"
                  value={field.value}
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />

            <div className="mt-2 flex flex-row gap-4">
              <Button
                label={formState.isSubmitting ? "Loguję..." : "Zaloguj"}
                classButton="bg-(--main-btn-bg) text-(--main-btn-text)"
                disabled={!formState.isValid || formState.isSubmitting}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
