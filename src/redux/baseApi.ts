import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../firebase/firebase.init";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: async (headers) => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();

        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Product", "User", "Order", "Review", "Farmer"],

  endpoints: () => ({}),
});
