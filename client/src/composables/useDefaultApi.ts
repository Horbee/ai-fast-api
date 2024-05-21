import axios from "axios";

import { DefaultApi } from "@/api";

export const useDefaultApi = () => {
  const httpClient = axios.create();

  return new DefaultApi(undefined, "/api", httpClient);
};
