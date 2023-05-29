import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import Script from 'next/script'
import { BasicHeader } from '../components/BasicHeader'
import { sendEmail } from "../src/client/email";
import { bookDates } from "../src/client/book_dates";

export default function Contact({ recaptchaSiteKey, pageTitle }) {
  var params = {
    name: "",
    email: "",
    message: "",
    startDate: null,
    endDate: null,
    gearId: null,
    gearTitle: null
  };

  if(typeof(window) != 'undefined') {
    var urlSearchParams = new URLSearchParams(window.location.search);
    var searchParams = Object.fromEntries(urlSearchParams.entries());
    params.name = searchParams.name
    params.email = searchParams.email
    params.message = searchParams.message
    params.startDate = searchParams.startDate ? new Date(searchParams.startDate) : null
    params.endDate = searchParams.endDate ? new Date(searchParams.endDate) : null
    params.gearId = searchParams.gearId
    params.gearTitle = searchParams.gearTitle
  }

  let [fullName, setFullName] = useState(params.name)
  let [email, setEmail] = useState(params.email)
  let [message, setMessage] = useState(params.message)
  let [errorMessage, setErrorMessage] = useState("")
  let [success, setSuccess] = useState(null)
  let [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("")
    setLoading(true)
    setSuccess(null)

    message += `<br/><br/>Link to Requested Gear: <a href="${window.location.origin}/gear-library/${params.gearId}">${params.gearTitle}</a>`

    const sendEmailSuccess = await sendEmail(email, fullName, message, recaptchaSiteKey)
    try {
      await bookDates({
        startDate: params.startDate.setDate(params.startDate.getDate() - 1),
        endDate: params.endDate.setDate(params.endDate.getDate() + 1),
        fullName: fullName,
        gearId: params.gearId
      }, recaptchaSiteKey)
    } catch(error) {
      Sentry.captureException(error);
    }

    if (sendEmailSuccess) {
      setSuccess(true)
    } else {
      setErrorMessage("Sorry, your email could not be sent.");
    }

    setLoading(false)
  };

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} />
      <main>
        <BasicHeader>{pageTitle}</BasicHeader>
        <form className="flex flex-col gap-4 max-w-2xl mx-auto pt-6 text-2xl px-5" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="fullname"
                value="Your Name"
              />
            </div>
            <TextInput
              id="fullname"
              required={true}
              type="text"
              sizing="lg"
              value={fullName}
              disabled={loading}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="Email"
              />
            </div>
            <TextInput
              id="email"
              required={true}
              type="email"
              sizing="lg"
              icon={() => <i aria-hidden="true" className="fas fa-envelope fa-1x" title="Instagram"></i>}
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="message"
                value="Message"
              />
            </div>
            <Textarea
              id="message"
              required={true}
              type="text"
              rows={6}
              value={message}
              disabled={loading}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" size="xl" color="info" disabled={loading}>
              Send Email
            </Button>
          </div>
          {success &&
            <p className="text-green-500">
              Message sent!
            </p>}
          <p className="text-red-500">
            {errorMessage}
          </p>
        </form>
      </main>
    </>
  )
}


export function getStaticProps() {
  return {
    props: {
      pageTitle: "Contact Us",
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
    }
  }
}
