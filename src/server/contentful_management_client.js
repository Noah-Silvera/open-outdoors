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

export const PICKUP_EMAIL_CONTENTFUL_ID = '17RmtsREAMfF13ID21PODn'
export const PLEASE_RETURN_EMAIL_CONTENTFUL_ID = '1hvrOlyxJvN9cGgIC0cp7H'
export const REQUEST_RECEIVED_EMAIL_CONTENTFUL_ID = '4HFNSULx9t1jakmLPZpANi'
export const AUTOMATIC_REQUEST_RESPONSE_EMAIL_CONTENTFUL_ID = '606NVtauemivbKuWkIwK4r'
