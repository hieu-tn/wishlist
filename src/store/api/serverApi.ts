import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"


const serverApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  tagTypes: ["Provider", "Match"],
  endpoints: builder => ({}),
})

export default serverApi
