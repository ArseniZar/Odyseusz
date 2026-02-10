import { httpPost } from "@/service/http/methods";

import type {
  Token,
  TravelerRegisterPayload,
  EditorRegisterPayload,
  CoordinatorRegisterPayload,
  EvacuationAssistantRegisterPayload,
  UserLogin,
} from "@/types/api/auth";

/**
 * REGISTER
 */

export const registerTraveler = (payload: TravelerRegisterPayload) =>
  httpPost<Token>("/auth/register/traveler", payload);

export const registerEditor = (payload: EditorRegisterPayload) =>
  httpPost<Token>("/auth/register/editor", payload);

export const registerCoordinator = (payload: CoordinatorRegisterPayload) =>
  httpPost<Token>("/auth/register/coordinator", payload);

export const registerEvacuationAssistant = (
  payload: EvacuationAssistantRegisterPayload
) =>
  httpPost<Token>("/auth/register/evacuation-assistant", payload);

/**
 * LOGIN
 */

export const login = (payload: UserLogin) =>
  httpPost<Token>("/auth/login", payload);

/**
 * LOGOUT
 */

export const logout = (refreshToken: string, accessToken: string) =>
  httpPost<void>(
    `/auth/logout?refresh_token=${encodeURIComponent(refreshToken)}`,
    undefined,
    { accessToken }
  );
