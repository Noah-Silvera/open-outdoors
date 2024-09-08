import initContentfulEnvironment from "./contentful_management_client"
import Email from "../models/Email"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

export async function buildEmailContent(contentfulEmailId, replacements = {}) {
  const contentfulEnvironment = await initContentfulEnvironment()

  let email = Email.fromContentfulObject(await contentfulEnvironment.getEntry(contentfulEmailId))

  let htmlEmailContent = documentToHtmlString(email.body['en-US'])

  for (const [key, value] of Object.entries(replacements)) {
    htmlEmailContent = htmlEmailContent.replaceAll("${" + key + "}", value)
  }

  let htmlEmailBody = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
                ${htmlEmailContent}
              </div>
            </div>
      </body>
      </html>`

  return { subject: email.subject['en-US'], htmlEmailBody: htmlEmailBody }
}
