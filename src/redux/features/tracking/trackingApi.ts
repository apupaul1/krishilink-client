import { baseApi } from "../../baseApi";
import type { ITrackingLog } from "./tracking.types";

export const trackingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTrackingLogs: build.query<
      { success: boolean; data: ITrackingLog[] },
      string
    >({
      query: (trackingId) => `/trackings/${trackingId}`,
    }),
  }),
});

export const { useGetTrackingLogsQuery } = trackingApi;
