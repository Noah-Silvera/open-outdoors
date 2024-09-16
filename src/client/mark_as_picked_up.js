import { fetchRecaptchaToken } from "./recaptcha_utils";

export const markAsPickedUp = async (bookedDateContentfulId, pickedUp, recaptchaSiteKey) => {
  let recaptchaToken = await fetchRecaptchaToken(recaptchaSiteKey);
  const res = await fetch("/api/mark_picked_up", {
    body: JSON.stringify({
      bookedDateId: bookedDateContentfulId,
      pickedUp: pickedUp,
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
