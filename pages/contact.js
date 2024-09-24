import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import Script from 'next/script'
import { BasicHeader } from '../components/BasicHeader'
import { sendContactEmail } from "../src/client/email";
import { bookDates } from "../src/client/book_dates";
import * as Sentry from '@sentry/nextjs';
import { Toast } from "flowbite-react";

export default function Contact({ recaptchaSiteKey, pageTitle }) {
  let [fullName, setFullName] = useState(null)
  let [email, setEmail] = useState(null)
  let [selectedGear, setSelectedGear] = useState(null)
  let [message, setMessage] = useState(null)
  let [startDate, setStartDate] = useState(null)
  let [endDate, setEndDate] = useState(null)
  let [errorMessage, setErrorMessage] = useState("")
  let [success, setSuccess] = useState(null)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    if(typeof(window) != 'undefined') {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var searchParams = Object.fromEntries(urlSearchParams.entries());

      if(fullName == null && searchParams.name) {
        setFullName(searchParams.name)
      }

      if(email == null && searchParams.email) {
        setEmail(searchParams.email)
      }

      if(message == null && searchParams.message) {
        setMessage(searchParams.message)
      }

      if(startDate == null && searchParams.startDate) {
        setStartDate(new Date(searchParams.startDate))
      }

      if(endDate == null && searchParams.endDate) {
        setEndDate(new Date(searchParams.endDate))
      }

      if(selectedGear == null && searchParams.gearTitle && searchParams.gearId){
        setSelectedGear([{ title: searchParams.gearTitle, id: searchParams.gearId}])
      }

      if(selectedGear == null && searchParams.gearList) {
        setSelectedGear(JSON.parse(searchParams.gearList))
      }
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("")
    setLoading(true)
    setSuccess(null)

    if(selectedGear) {
      message += `<br/><br/>Link to Requested Gear: <a href="${window.location.origin}/gear-library/${selectedGear[0].id}">${selectedGear[0].title}</a>`
    }

    const sendEmailSuccess = await sendContactEmail(email, fullName, message, recaptchaSiteKey)
    if(selectedGear) {
      try {
        await bookDates({
          startDate: startDate.setDate(startDate.getDate() - 1),
          endDate: endDate.setDate(endDate.getDate() + 1),
          fullName: fullName,
          email: email,
          gearId: selectedGear[0].id
        }, recaptchaSiteKey)
      } catch(error) {
        Sentry.captureException(error);
      }
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
          {selectedGear &&
            (
              <div className="mb-6">
                <h2 className="text-2xl mb-2 font-bold">Requested Gear</h2>
                <ul className="list-disc ml-12">
                  <li>
                    <a href={`/gear-library/${selectedGear[0].id}`} className="underline text-blue-700">{selectedGear[0].title}</a>
                  </li>
                </ul>
              </div>
            )
          }
          <p class='text-sm'>We are a small organization with limited capacity! We will try to fufill all requests, but <b>cannot guarantee any requests,</b> and in particular requests made within <b>72 hours</b> of a trip.</p>
          <div className="flex flex-row">
            <div className="grow">
              <Button type="submit" size="xl" color="info" disabled={loading}>
                Send Email
              </Button>
            </div>
            {success && <Toast className="!bg-green-200">
                <div className="ml-3 text-sm font-normal">
                  Message Sent! If you don&apos;t receive a confirmation email within a few days, please check your spam folder.
                </div>
                <Toast.Toggle />
            </Toast>}
          </div>
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
