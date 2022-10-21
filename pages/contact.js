import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import Script from 'next/script'

export default function Contact({ recaptchaSiteKey }) {
  var params = {
    name: "",
    email: "",
    message: ""
  };

  if(typeof(window) != 'undefined') {
    var urlSearchParams = new URLSearchParams(window.location.search);
    var searchParams = Object.fromEntries(urlSearchParams.entries());
    params.name = searchParams.name
    params.email = searchParams.email
    params.message = searchParams.message
  }

  let [fullName, setFullName] = useState(params.name)
  let [email, setEmail] = useState(params.email)
  let [message, setMessage] = useState(params.message)
  let [errorMessage, setErrorMessage] = useState("")
  let [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("")
    setSuccess(null)

    let recaptchaToken = await fetchRecaptchaToken();
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,
        fullname: fullName,
        message: message,
        recaptchaToken: recaptchaToken
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();
    if (response.error) {
      setErrorMessage("Sorry, your email could not be sent.");
    } else {
      setSuccess(true)
    }
  };

  const fetchRecaptchaToken = async () => {
    return new Promise((resolve) => {
      grecaptcha.ready(async () => {
        grecaptcha.execute(recaptchaSiteKey, {action: 'submit'}).then(async (token) =>{
          resolve(token)
        });
      });
    })
  }

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} />
      <main className="min-h-screen">
        <h1 className='header-font text-center mx-auto py-5 md:py-10 bg-tertiary-light'>Contact Us</h1>
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
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" size="xl" color="info">
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
