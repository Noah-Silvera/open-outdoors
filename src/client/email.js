import { fetchRecaptchaToken } from "./recaptcha_utils";

export const sendContactEmail = async (email, fullName, message, recaptchaSiteKey) => {
  let recaptchaToken = await fetchRecaptchaToken(recaptchaSiteKey);
  const res = await fetch("/api/contact", {
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

export const sendReadyForPickupEmail = async (email, name, recaptchaSiteKey) => {
  let recaptchaToken = await fetchRecaptchaToken(recaptchaSiteKey);
  const res = await fetch("/api/pickup_ready", {
    body: JSON.stringify({
      email: email,
      name: name,
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

export const sendGearRequestReceivedEmail = async (email, name, recaptchaSiteKey) => {
  let recaptchaToken = await fetchRecaptchaToken(recaptchaSiteKey);
  const res = await fetch("/api/request_received", {
    body: JSON.stringify({
      email: email,
      name: name,
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

