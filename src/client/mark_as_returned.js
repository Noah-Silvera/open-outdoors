import { fetchRecaptchaToken } from "./recaptcha_utils";

export const markAsReturned = async (bookedDateContentfulId, returned, recaptchaSiteKey) => {
  let recaptchaToken = await fetchRecaptchaToken(recaptchaSiteKey);
  const res = await fetch("/api/mark_returned", {
    body: JSON.stringify({
      bookedDateId: bookedDateContentfulId,
      returned: returned,
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
