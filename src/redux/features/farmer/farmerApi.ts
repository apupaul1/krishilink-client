import { baseApi } from "../../baseApi";
import type {
  ICreateFarmer,
  IFarmerResponse,
  IFarmersResponse,
  IGetFarmerQuery,
  IUpdateFarmer,
} from "./farmer.types";

export const farmerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFarmers: build.query<IFarmersResponse, IGetFarmerQuery>({
      query: (params) => ({
        url: "/farmers",
        params,
      }),
      providesTags: ["Farmer"],
    }),

    createFarmer: build.mutation<IFarmerResponse, ICreateFarmer>({
      query: (body) => ({
        url: "/farmers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Farmer"],
    }),

    updateFarmer: build.mutation<
      IFarmerResponse,
      {
        id: string;
        body: IUpdateFarmer;
      }
    >({
      query: ({ id, body }) => ({
        url: `/farmers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Farmer"],
    }),

    deleteFarmer: build.mutation<IFarmerResponse, string>({
      query: (id) => ({
        url: `/farmers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Farmer"],
    }),
  }),
});

export const {
  useCreateFarmerMutation,
  useGetFarmersQuery,
  useDeleteFarmerMutation,
  useUpdateFarmerMutation,
} = farmerApi;
