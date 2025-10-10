import { PRODUCTS_URL } from "../constants";
import type { IProduct } from "../models/Product";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query<IProduct[], void>({
            query: () => PRODUCTS_URL
        }),
        getProductById: builder.query<IProduct, string>({
            query: (id) => `${PRODUCTS_URL}/${id}` 
        })
    })
});

export const {useGetProductsQuery, useGetProductByIdQuery} = productsApiSlice;