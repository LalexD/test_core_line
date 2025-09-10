import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TNews } from "../types/types";

const API_KEY = "r8iTRivGzOARLM07W73DX6juIVhAmwIs";
const imageBaseUrl = "https://www.nytimes.com/";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/svc/archive/v1",
  }),
  endpoints: (builder) => ({
    getNews: builder.query<TNews[], { year: number; month: number }>({
      query: ({ year, month }) => ({
        url: `/${year}/${month}.json`,
        params: {
          "api-key": API_KEY,
        },
      }),
      transformResponse: (response: { response: { docs: TNews[] } }) => {
        return response.response.docs.map((doc) => ({
          abstract: doc.abstract || "",
          web_url: doc.web_url || "",
          multimedia: (doc.multimedia || []).map(
            (m: any) => imageBaseUrl + m.url
          ),
          pub_date: doc.pub_date || "",
          source: doc.source || "",
        }));
      },
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
