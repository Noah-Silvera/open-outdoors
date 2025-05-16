import initContentfulEnvironment from "../../src/server/contentful_management_client"
import contentfulClient from "../../src/server/contentful_client"
import { performRecaptchaCheck } from "../../src/server/recaptcha_utils"
import GearForLoan from "../../src/models/GearForLoan";
import * as Sentry from '@sentry/nextjs';

async function handler(req, res) {
  await performRecaptchaCheck(req.body.recaptchaToken)

  try {
    const contentfulEnvironment = await initContentfulEnvironment()

    let oldGearId = req.body.oldGearId
    let newGearId = req.body.newGearId
    let bookedDate = await contentfulEnvironment.getEntry(req.body.bookedDateId)

    bookedDate.fields.gearBooked['en-US'].forEach((link) => {
      if (link.sys.id === oldGearId) {
        link.sys.id = newGearId
      }
    })

    bookedDate = await bookedDate.update()
    await bookedDate.publish()

    let newGearObject = await contentfulClient.getEntry(newGearId)
    let newGear = GearForLoan.fromContentfulObject(newGearObject, { excludeDates: true })

    return res.status(200).json({ error: null, newGear: newGear.toJSON() })
  } catch (error) {
    Sentry.captureException(error);
    return res.status(error.statusCode || 500).json({ error: "An error occurred, and the given booking may not have been updated with the new gear. Please manually confirm." });
  }
}

export default handler;
