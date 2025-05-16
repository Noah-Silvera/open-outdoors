import { fetchRecaptchaToken } from "./recaptcha_utils";
import GearForLoan from "../models/GearForLoan";

export const updateGear = async (bookedDateContentfulId, oldGear, newGear, recaptchaSiteKey) => {
  let recaptchaToken = await fetchRecaptchaToken(recaptchaSiteKey);

  const res = await fetch("/api/update_gear", {
    body: JSON.stringify({
      bookedDateId: bookedDateContentfulId,
      oldGearId: oldGear.id,
      newGearId: newGear.id,
      recaptchaToken: recaptchaToken
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const response = await res.json();
  if (response.error) {
    return { error: response.error }
  } else {
    let newGearForLoan = GearForLoan.fromJSON(response.newGear)
    return { newGearForLoan: newGearForLoan }
  }
}
