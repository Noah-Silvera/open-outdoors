import initContentfulEnvironment from "../../src/server/contentful_management_client"
import { performRecaptchaCheck } from "../../src/server/recaptcha_utils"
import * as Sentry from '@sentry/nextjs';

async function handler(req, res) {
  await performRecaptchaCheck(req.body.recaptchaToken)

  try {
    const contentfulEnvironment = await initContentfulEnvironment()

    let bookedDate = await contentfulEnvironment.getEntry(req.body.bookedDateId)

    bookedDate.fields.pickedUp = bookedDate.fields.pickedUp || {}
    bookedDate.fields.pickedUp['en-US'] = req.body.pickedUp

    bookedDate = await bookedDate.update()
    await bookedDate.publish()
  } catch (error) {
    Sentry.captureException(error);
    return res.status(error.statusCode || 500).json({ error: "The given gear could not be marked as picked up" });  }

  return res.status(200).json({ error: null });
}

export default handler;
