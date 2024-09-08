import sendgrid from "@sendgrid/mail";
import * as Sentry from '@sentry/nextjs';
import { performRecaptchaCheck } from "../../src/server/recaptcha_utils";
import { PICKUP_EMAIL_CONTENTFUL_ID } from "../../src/server/contentful_management_client";
import { buildEmailContent } from "../../src/server/email_builder";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function handler(req, res) {
  await performRecaptchaCheck(req.body.recaptchaToken)

  let { subject, htmlEmailBody } = await buildEmailContent(PICKUP_EMAIL_CONTENTFUL_ID, { name: req.body.name })

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
    return res.status(error.statusCode || 500).json({ error: "Email could not be sent" });
  }

  return res.status(200).json({ error: null });
}

export default handler;
