import initContentfulEnvironment from "../../src/server/contentful_management_client"
import { performRecaptchaCheck } from "../../src/server/recaptcha_utils"
import * as Sentry from '@sentry/nextjs';

async function handler(req, res) {
  await performRecaptchaCheck(req.body.recaptchaToken)

  let startDate = new Date(req.body.startDate)
  let endDate = new Date(req.body.endDate)

  try {
    const contentfulEnvironment = await initContentfulEnvironment()

    let uniqueBookedDateId = `${req.body.gearId}${startDate.getTime()}${endDate.getTime()}`

    let bookedDate = await contentfulEnvironment.createEntryWithId(process.env.CONTENTFUL_DATE_RANGE_CONTENT_TYPE_ID, uniqueBookedDateId, {
      fields: {
        bookedBy: {
          'en-US': req.body.fullName,
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

    let gearEntry = await contentfulEnvironment.getEntry(req.body.gearId)

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
    return res.status(error.statusCode || 500).json({ error: "The given dates could not be booked" });  }

  return res.status(200).json({ error: null });
}

export default handler;
