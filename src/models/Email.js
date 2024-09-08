export default class Email {
  constructor({contentfulId, title, subject, body}) {
    this.contentfulId = contentfulId;
    this.title = title;
    this.subject = subject;
    this.body = body;
  }

  toJSON() {
    let json = {
      'contentfulId': this.contentfulId,
      'title': this.title,
      'subject': this.subject,
      'body': this.body,
    }

    return json
  }

  static fromJSON(json) {
    return new Email({
      'contentfulId': json.contentfulId,
      'title': json.title,
      'subject': json.subject,
      'body': json.body,
    })
  }

  static fromContentfulObject(contentfulEmail) {
    return new Email({
      contentfulId: contentfulEmail.sys.id,
      title: contentfulEmail.fields.title || null,
      subject: contentfulEmail.fields.subject || null,
      body: contentfulEmail.fields.body || null
    })
  }
}
