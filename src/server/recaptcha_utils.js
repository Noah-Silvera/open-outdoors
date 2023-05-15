export const performRecaptchaCheck = async (recaptchaToken) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

  const response = await (await fetch(url, {method: 'post'})).json()
  if(!response.success) {
    throw response['error-codes']
  }
}
