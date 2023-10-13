import sendgrid from "@sendgrid/mail";
import * as Sentry from '@sentry/nextjs';
import { performRecaptchaCheck } from "../../src/server/recaptcha_utils";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function handler(req, res) {
  await performRecaptchaCheck(req.body.recaptchaToken)

  try {
    await sendgrid.send({
      to: req.body.email,
      from: "info@openoutdoorsvictoria.ca",
      replyTo: {
        email: "info@openoutdoorsvictoria.ca",
        name: "Open Outdoors"
      },
      subject: `[Open Outdoors]: Gear return reminder`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
            </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <div style="font-size: 16px;">
              <p>Hi ${req.body.name},<p>
              <p>We just wanted to send you a friendly email to remind you to return your gear so we can lend it out to other folks! You can come down to 213 Vancouver Street anytime to dropoff your gear in the sunroom, the door is always unlocked.</p>
              <p>Thanks so much!</p>
              <p>Wren and Noah</p>
              </div>
            </div>
      </body>
      </html>`,
    });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(error.statusCode || 500).json({ error: "Email could not be sent" });
  }

  return res.status(200).json({ error: null });
}

export default handler;
