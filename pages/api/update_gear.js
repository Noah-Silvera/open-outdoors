import initContentfulEnvironment from "../../src/server/contentful_management_client"
import contentfulClient from "../../src/server/contentful_client"
import { performRecaptchaCheck } from "../../src/server/recaptcha_utils"
import GearForLoan from "../../src/models/GearForLoan";
import * as Sentry from '@sentry/nextjs';
import { buildEmailContent } from "../../src/server/email_builder";
import { CONTENTFUL_GEAR_SWAPPED_EMAIL_CONTENTFUL_ID } from "../../src/server/contentful_management_client";
import sendgrid from "@sendgrid/mail";

async function handler(req, res) {
  await performRecaptchaCheck(req.body.recaptchaToken)

  let contentfulEnvironment;
  let oldGearId = req.body.oldGearId
  let newGearId = req.body.newGearId
  let newGear;
  let bookedDate;

  try {
    contentfulEnvironment = await initContentfulEnvironment()

    bookedDate = await contentfulEnvironment.getEntry(req.body.bookedDateId)

    bookedDate.fields.gearBooked['en-US'].forEach((link) => {
      if (link.sys.id === oldGearId) {
        link.sys.id = newGearId
      }
    })

    bookedDate = await bookedDate.update()
    await bookedDate.publish()

    let newGearObject = await contentfulClient.getEntry(newGearId)
    newGear = GearForLoan.fromContentfulObject(newGearObject, { excludeDates: true })

  } catch (error) {
    Sentry.captureException(error);
    return res.status(error.statusCode || 500).json({ error: "An error occurred, and the given booking may not have been updated with the new gear. Please manually confirm." });
  }

  let oldGear = await contentfulEnvironment.getEntry(oldGearId)

  let oldGearTitle = oldGear.fields.title['en-US']
  let newGearTitle = newGear.fields.title['en-US']
  let oldGearLink = `https://openoutdoorsvictoria.ca/gear-library/${oldGearId}`
  let newGearLink = `https://openoutdoorsvictoria.ca/gear-library/${newGearId}`

  debugger;

  let { subject, htmlEmailBody } = await buildEmailContent(
    CONTENTFUL_GEAR_SWAPPED_EMAIL_CONTENTFUL_ID,
    {
      originalGearDescription: oldGearTitle,
      newGearDescription: newGearTitle,
      oldGearLink: oldGearLink,
      newGearLink: newGearLink
    })

  try {
    await sendgrid.send({
      to: bookedDate.fields.bookedByEmail['en-US'],
      from: "info@openoutdoorsvictoria.ca",
      replyTo: {
        email: "info@openoutdoorsvictoria.ca",
        name: "Open Outdoors"
      },
      subject: `[Open Outdoors] : ${subject}`,
      html: htmlEmailBody
    });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(error.statusCode || 500).json({ error: "An error occurred, and the gear swap was updated but the email to the user about the swap could not be sent. Please send them an email letting them know about the swap." });
  }

  return res.status(200).json({ error: null, newGear: newGear.toJSON() })
}

export default handler;
