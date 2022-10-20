import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { useState } from "react";

export default function Contact() {
  let [fullName, setFullName] = useState("")
  let [email, setEmail] = useState("")
  let [message, setMessage] = useState("")
  let [errorMessage, setErrorMessage] = useState("")
  let [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("")
    setSuccess(null)

    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,
        fullname: fullName,
        message: message,
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
  }

  return (
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
  )
}


export function getStaticProps() {
  return {
    props: {
      pageTitle: "Contact Us",
    }
  }
}
