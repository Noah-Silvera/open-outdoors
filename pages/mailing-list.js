function EmbeddedSignupForm({ className }) {
  const rawHTML = `
  <!-- Begin Mailchimp Signup Form -->
  <link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css">
  <style type="text/css">
    #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
    /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
       We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
  </style>
  <div id="mc_embed_signup">
      <form action="https://app.us17.list-manage.com/subscribe/post?u=f7c80cc23df4cd4917336a4ef&amp;id=cbbc95a902&amp;f_id=00b345e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">

          <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
  <div class="mc-field-group">
    <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
  </label>
    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
    <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
  </div>
    <div id="mce-responses" class="clear foot">
      <div class="response" id="mce-error-response" style="display:none"></div>
      <div class="response" id="mce-success-response" style="display:none"></div>
    </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_f7c80cc23df4cd4917336a4ef_cbbc95a902" tabindex="-1" value=""></div>
          <div class="optionalParent">
              <div class="clear foot">
                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                  <p class="brandingLogo"><a href="http://eepurl.com/ibLw_1" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
              </div>
          </div>
      </div>
  </form>
  </div>
  <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
  <!--End mc_embed_signup-->`

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: rawHTML }} />
  )
}

export default function MailingList({ pageTitle }) {
  return (
    <>
      <main className="">
        <h1 className='header-font text-center mx-auto py-5 md:py-10 bg-tertiary-light'>{pageTitle}</h1>
        <div className="align-middle text-center space-y-6 pt-8 max-w-2xl mx-auto px-2">
          <p className="text-xl body-font">
            We will contact you about upcoming events and new organizational developments. You can unsubscribe anytime.
          </p>
          <EmbeddedSignupForm/>
        </div>
      </main>
    </>
  )
}


export function getStaticProps() {
  return {
    props: {
      pageTitle: "Join Our Mailing List"
    }
  }
}
