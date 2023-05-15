import { fetchRecaptchaToken } from "./recaptcha_utils";

export const bookDates = async ({ startDate, endDate, fullName, gearId }, recaptchaSiteKey) => {
  let recaptchaToken = await fetchRecaptchaToken(recaptchaSiteKey);
  const res = await fetch("/api/book_dates", {
    body: JSON.stringify({
      startDate: startDate,
      endDate: endDate,
      fullName: fullName,
      gearId: gearId,
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
