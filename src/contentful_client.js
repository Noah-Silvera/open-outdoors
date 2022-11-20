import { createClient } from "contentful"

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.VERCEL_ENV === "production" ? "master" : "staging"
})

export default contentfulClient;
