import { User } from "@prisma/client";
import {
  GetTokenParams,
  JWT,
  getToken as getTokenOriginal,
} from "next-auth/jwt";

export type ExtendedJwt = JWT & { user: User };
export async function getToken(
  params: GetTokenParams<false>
): Promise<JWT & { user: User }> {
  return getTokenOriginal<false>(params) as Promise<ExtendedJwt>;
}
