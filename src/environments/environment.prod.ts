import { AppConfig } from "../app/models/message.models";
import { environment as baseEnv } from "./environment";

export const environment: any = {
  ...baseEnv,
  production: true,
};
