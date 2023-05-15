import { fetchRecaptchaToken } from "./recaptcha_utils";

export const sendEmail = async (email, fullName, message, recaptchaSiteKey) => {
  let recaptchaToken = await fetchRecaptchaToken(recaptchaSiteKey);
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

  return !response.error
}

