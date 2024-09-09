import initContentfulEnvironment from "../../src/server/contentful_management_client"
import { performRecaptchaCheck } from "../../src/server/recaptcha_utils"
import * as Sentry from '@sentry/nextjs';
import { buildEmailContent } from "../../src/server/email_builder";
import { AUTOMATIC_REQUEST_RESPONSE_EMAIL_CONTENTFUL_ID } from "../../src/server/contentful_management_client";
import sendgrid from "@sendgrid/mail";

async function handler(req, res) {
  await performRecaptchaCheck(req.body.recaptchaToken)

  let startDate = new Date(req.body.startDate)
  let endDate = new Date(req.body.endDate)
  let gearEntry;

  try {
    const contentfulEnvironment = await initContentfulEnvironment()

    let uniqueBookedDateId = `${req.body.gearId}${startDate.getTime()}${endDate.getTime()}`

    let bookedDate = await contentfulEnvironment.createEntryWithId(process.env.CONTENTFUL_DATE_RANGE_CONTENT_TYPE_ID, uniqueBookedDateId, {
      fields: {
        bookedBy: {
          'en-US': req.body.fullName,
        },
        bookedByEmail: {
          'en-US': req.body.email,
        },
        startDate: {
          'en-US': startDate.toISOString()
        },
        endDate: {
          'en-US': endDate.toISOString()
        },
        gearBooked: {
          'en-US': [
            {
              'sys': {
                'type': 'Link',
                'linkType': 'Entry',
                'id': req.body.gearId
              }
            }
          ]
        }
      }
    })

    await bookedDate.publish()

    gearEntry = await contentfulEnvironment.getEntry(req.body.gearId)

    gearEntry.fields.bookedDates = gearEntry.fields.bookedDates || {}
    gearEntry.fields.bookedDates['en-US'] = gearEntry.fields.bookedDates['en-US'] || []

    gearEntry.fields.bookedDates['en-US'].push({
      sys: {
        id: uniqueBookedDateId,
        linkType: "Entry",
        type: 'Link'
      }
    })

    gearEntry = await gearEntry.update()

    await gearEntry.publish()
  } catch (error) {
    Sentry.captureException(error);
    return res.status(error.statusCode || 500).json({ error: "The given dates could not be booked" });
  }

  let { subject, htmlEmailBody } = await buildEmailContent(AUTOMATIC_REQUEST_RESPONSE_EMAIL_CONTENTFUL_ID, { name: req.body.fullName, gearDescription: gearEntry.fields.title['en-US'] })

  try {
    await sendgrid.send({
      to: req.body.email,
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
    return res.status(error.statusCode || 500).json({ error: "Something went wrong with your request. Please try using the contact form without a gear request to let us know." });
  }

  return res.status(200).json({ error: null });
}

export default handler;
