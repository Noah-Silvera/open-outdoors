import * as contentful from "contentful-management"
import { inProduction } from "./environment"

const initContentfulEnvironment = async () => {
  let contentfulManagementClient = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_TOKEN,
  })

  let space = await contentfulManagementClient.getSpace(process.env.CONTENTFUL_SPACE_ID)
  // This API call will request an environment with the specified ID
  return await space.getEnvironment(inProduction ? "master" : "staging")
}

export default initContentfulEnvironment;
