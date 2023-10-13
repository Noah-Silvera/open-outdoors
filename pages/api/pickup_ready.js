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
      subject: `[Open Outdoors] : Gear ready for pickup`,
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
              <h3>Your gear request is ready to be picked up!</h3>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <p>Hi ${req.body.name},<p>
              <br/>

              <p>I have your gear request ready! It is in the sunroom of 213 Vancouver Street!</p>
              <br/>

              <p>The front door to the sunroom is always unlocked, so you can come whenever! There are dogs in the main house, so please just let yourself in and out without knocking! There is a sign that says gear library pick up and drop off, and there is a bin or milk crate with your name labeled on it! Please be sure to only take your items! You can come whenever works for you.</p>

              <br/>
              <p>For the return, once you're back in town, we appreciate if items can be returned as soon as possible! A few days is okay, but if it is going to be longer please let us know :) The gear library lends out lots of items frequently, so we are trying to keep things as available as possible.</p>

              <br/>
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
