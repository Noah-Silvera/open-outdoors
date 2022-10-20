import { Label, Textarea, TextInput, Button } from "flowbite-react";

export default function Contact() {
  return (
    <main className="min-h-screen">
      <h1 className='header-font text-center mx-auto py-5 md:py-10 bg-tertiary-light'>Contact Us</h1>
      <div className="flex flex-col gap-4 max-w-2xl mx-auto pt-6 text-2xl px-5">
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="name"
              value="Your Name"
            />
          </div>
          <TextInput
            id="name"
            required={true}
            type="text"
            sizing="lg"
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
            type="text"
            sizing="lg"
            icon={() => <i aria-hidden="true" className="fas fa-envelope fa-1x" title="Instagram"></i>}
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
          />
        </div>
        <div>
          <Button type="submit" size="xl" color="info">
            Send Email
          </Button>
        </div>
      </div>
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
