export const fetchRecaptchaToken = async (recaptchaSiteKey) => {
  return new Promise((resolve) => {
    grecaptcha.ready(async () => {
      grecaptcha.execute(recaptchaSiteKey, {action: 'submit'}).then(async (token) =>{
        resolve(token)
      });
    });
  })
}
