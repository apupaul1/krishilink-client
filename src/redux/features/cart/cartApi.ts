import { baseApi } from "../../baseApi";
import type { IAddToCart, ICartResponse } from "./cart.types";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<ICartResponse, string>({
      query: (email) => ({
        url: "/carts",
        method: "GET",
        params: { email },
      }),
      providesTags: ["Cart"],
    }),

    addToCart: build.mutation<ICartResponse, IAddToCart>({
      query: (body) => ({
        url: "/carts/items",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    updateQuantity: build.mutation<
      ICartResponse,
      {
        email: string;
        productId: string;
        quantity: number;
      }
    >({
      query: ({ email, productId, quantity }) => ({
        url: `/carts/items/${productId}`,
        method: "PATCH",
        body: {
          email,
          quantity,
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    toggleSelection: build.mutation<
      ICartResponse,
      {
        email: string;
        productId: string;
      }
    >({
      query: ({ email, productId }) => ({
        url: `/carts/items/${productId}/selection`,
        method: "PATCH",
        body: {
          email,
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    toggleSelectAll: build.mutation<
      ICartResponse,
      {
        email: string;
      }
    >({
      query: ({ email }) => ({
        url: "/carts/selection",
        method: "PATCH",
        body: {
          email,
        },
      }),

      invalidatesTags: ["Cart"],
    }),

    removeFromCart: build.mutation<
      ICartResponse,
      {
        email: string;
        productId: string;
      }
    >({
      query: ({ email, productId }) => ({
        url: `/carts/items/${productId}`,
        method: "DELETE",
        body: {
          email,
        },
      }),

      invalidatesTags: ["Cart"],
    }),

    clearCart: build.mutation<
      ICartResponse,
      {
        email: string;
      }
    >({
      query: ({ email }) => ({
        url: "/carts",
        method: "DELETE",
        body: {
          email,
        },
      }),

      invalidatesTags: ["Cart"],
    }),

    buyNow: build.mutation<
      ICartResponse,
      {
        email: string;
        productId: string;
        quantity: number;
      }
    >({
      query: ({ email, productId, quantity }) => ({
        url: "/carts/buy-now",
        method: "POST",

        params: {
          email,
        },

        body: {
          productId,
          quantity,
        },
      }),

      invalidatesTags: ["Cart"],
    }),

    removeCartItems: build.mutation<
      ICartResponse,
      {
        email: string;
        productIds: string[];
      }
    >({
      query: ({ email, productIds }) => ({
        url: "/carts/items",
        method: "DELETE",

        params: {
          email,
        },

        body: {
          productIds,
        },
      }),

      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useToggleSelectionMutation,
  useToggleSelectAllMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useBuyNowMutation,
  useRemoveCartItemsMutation
} = cartApi;
