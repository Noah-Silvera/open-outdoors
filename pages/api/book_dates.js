import initContentfulEnvironment from "../../src/server/contentful_management_client"
import { performRecaptchaCheck } from "../../src/server/recaptcha_utils"
import * as Sentry from '@sentry/nextjs';

async function handler(req, res) {
  await performRecaptchaCheck(req.body.recaptchaToken)

  try {
    const contentfulEnvironment = await initContentfulEnvironment()

  //   let entries = await contentfulEnvironment.getEntries()
  //   console.log(entries.items)

  //   // let's get a content type
  //   let contentType = await contentfulEnvironment.getContentType('product')
  //   // and now let's update its name
  //   contentType.name = 'New Product'
  //   await contentType.update()
  } catch (error) {
    throw error
  }

  return res.status(200).json({ error: null });
}

export default handler;
