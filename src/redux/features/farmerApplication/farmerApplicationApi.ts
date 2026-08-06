import { baseApi } from "../../baseApi";
import type {
  ICreateFarmerApplication,
  IFarmerApplicationResponse,
  IFarmerApplicationsResponse,
  IGetFarmerApplicationQuery,
  IUpdateFarmerApplication,
} from "./farmerApplication.types";

export const farmerApplicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFarmerApplications: build.query<
      IFarmerApplicationsResponse,
      IGetFarmerApplicationQuery
    >({
      query: (params) => ({
        url: "/farmer-applications",
        params,
      }),
      providesTags: ["FarmerApplication"],
    }),

    createFarmerApplication: build.mutation<
      IFarmerApplicationResponse,
      ICreateFarmerApplication
    >({
      query: (body) => ({
        url: "/farmer-applications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FarmerApplication"],
    }),

    updateFarmerApplication: build.mutation<
      IFarmerApplicationResponse,
      {
        id: string;
        body: IUpdateFarmerApplication;
      }
    >({
      query: ({ id, body }) => ({
        url: `/farmer-applications/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["FarmerApplication"],
    }),

    deleteFarmerApplication: build.mutation<IFarmerApplicationResponse, string>(
      {
        query: (id) => ({
          url: `/farmer-applications/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["FarmerApplication"],
      },
    ),
  }),
});

export const {
  useGetFarmerApplicationsQuery,
  useCreateFarmerApplicationMutation,
  useUpdateFarmerApplicationMutation,
  useDeleteFarmerApplicationMutation,
} = farmerApplicationApi;
