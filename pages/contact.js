import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import Script from 'next/script'
import { BasicHeader } from '../components/BasicHeader'
import { sendContactEmail } from "../src/client/email";
import { bookDates } from "../src/client/book_dates";
import * as Sentry from '@sentry/nextjs';
import { Toast } from "flowbite-react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import contentfulClient from '../src/server/contentful_client';

export default function Contact({ recaptchaSiteKey, pageTitle, aboveSendButtonBlurbDocument }) {
  let [fullName, setFullName] = useState(null)
  let [email, setEmail] = useState(null)
  let [selectedGear, setSelectedGear] = useState(null)
  let [message, setMessage] = useState(null)
  let [startDate, setStartDate] = useState(null)
  let [endDate, setEndDate] = useState(null)
  let [errorMessage, setErrorMessage] = useState("")
  let [success, setSuccess] = useState(null)
  let [loading, setLoading] = useState(false)
  let [aboveSendButtonBlurb, setAboveSendButtonBlurb] = useState(null)

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

      setAboveSendButtonBlurb(documentToReactComponents(aboveSendButtonBlurbDocument))
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
          <p className='text-sm'>We are temporary unable to lend gear. We will be back from our little vacation soon. Thanks for your understanding.</p>
        </form>
      </main>
    </>
  )
}


export async function getStaticProps() {
  const CONTACT_PAGE_ENTRY_ID = "011LhUNgTj6TaGZUhiCL6k"
  let contactPageContent = await contentfulClient.getEntry(CONTACT_PAGE_ENTRY_ID)

  return {
    props: {
      pageTitle: "Contact Us",
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
      aboveSendButtonBlurbDocument: contactPageContent.fields['aboveSendButtonBlurb']
    }
  }
}
