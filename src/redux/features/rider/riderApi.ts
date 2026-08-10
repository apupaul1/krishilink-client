import { baseApi } from "../../baseApi";
import type {
  ICreateRider,
  IGetRiderQuery,
  IRiderResponse,
  IRidersResponse,
  IUpdateRider,
} from "./rider.types";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRiders: build.query<IRidersResponse, IGetRiderQuery>({
      query: (params) => ({
        url: "/riders",
        params,
      }),
      providesTags: ["Rider"],
    }),

    createRider: build.mutation<IRiderResponse, ICreateRider>({
      query: (body) => ({
        url: "/riders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Rider"],
    }),

    updateRider: build.mutation<
      IRiderResponse,
      {
        id: string;
        body: IUpdateRider;
      }
    >({
      query: ({ id, body }) => ({
        url: `/riders/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Rider"],
    }),

    deleteRider: build.mutation<IRiderResponse, string>({
      query: (id) => ({
        url: `/riders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rider"],
    }),
  }),
});

export const {
  useGetRidersQuery,
  useCreateRiderMutation,
  useDeleteRiderMutation,
  useUpdateRiderMutation,
} = riderApi;
