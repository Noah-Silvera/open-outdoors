import { createClient } from "contentful"
import { inProduction } from "./environment";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: inProduction ? "master" : "staging"
})

export default contentfulClient;
