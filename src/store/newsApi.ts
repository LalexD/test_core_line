import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TNews } from "../types/types";

const API_KEY = "r8iTRivGzOARLM07W73DX6juIVhAmwIs";
const imageBaseUrl = "https://nytimes.com/";
const API_BASE =
  process.env.NODE_ENV === "development"
    ? "/svc/archive/v1"
    : "https://api.nytimes.com/svc/archive/v1";


export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
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
