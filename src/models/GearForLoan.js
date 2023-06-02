export default class GearForLoan {
  constructor({id, title}) {
    this.id = id;
    this.title = title;
  }

  toJSON() {
    return {
      'id': this.id,
      'title': this.title
    }
  }

  static fromJSON(json) {
    return new GearForLoan(json)
  }

  static fromContentfulObject(contentfulGearForLoan) {
    return new GearForLoan({
      id: contentfulGearForLoan.sys.id,
      title: contentfulGearForLoan.fields.title,
    })
  }
}
