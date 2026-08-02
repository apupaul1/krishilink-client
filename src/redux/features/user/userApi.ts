import { baseApi } from "../../baseApi";
import type { ICreateUser, IUpdateUser, IUsersResponse, IUserResponse } from "./user.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<IUsersResponse, void>({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["User"],
    }),

    getSingleUser: build.query<IUserResponse, string>({
      query: (email: string) => ({
        url: `/users/${email}`,
      }),
      providesTags: ["User"],
    }),

    createUser: build.mutation<IUserResponse, ICreateUser>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: build.mutation<
      IUserResponse,
      {
        id: string;
        body: IUpdateUser;
      }
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation<IUserResponse, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
