import GearForLoan from "./GearForLoan";

export default class BookedDates {
  constructor({ contentfulId, startDate, endDate, bookedBy, bookedByEmail, requestedGear, returned, pickedUp }) {
    this.contentfulId = contentfulId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.bookedBy = bookedBy;
    this.bookedByEmail = bookedByEmail || null;
    this.returned = returned || false;
    this.pickedUp = this.pickedUp || false;
    this.requestedGear = requestedGear || []
  }

  toJSON({ excludeGear } = {}) {
    let json = {
      'contentfulId': this.contentfulId,
      'startDate': this.startDate,
      'endDate': this.endDate,
      'bookedBy': this.bookedBy,
      'bookedByEmail': this.bookedByEmail,
      'returned': this.returned,
      'pickedUp': this.pickedUp,
      'requestedGear': this.requestedGear.map((gear) => gear.toJSON({ excludeDates: true }))
    }

    if (excludeGear) {
      delete json['requestedGear']
    }

    return json
  }



  static fromJSON(json) {
    return new BookedDates({
      'contentfulId': json.contentfulId,
      'startDate': json.startDate,
      'endDate': json.endDate,
      'bookedBy': json.bookedBy,
      'bookedByEmail': json.bookedByEmail,
      'returned': json.returned,
      'pickedUp': json.pickedUp,
      'requestedGear': json.requestedGear.map((gearJSON) => GearForLoan.fromJSON(gearJSON))
    })
  }

  static fromContentfulObject(contentfulBookedDate, { excludeGear } = {}) {
    let requestedGear = contentfulBookedDate.fields.gearBooked || []

    return new BookedDates({
      contentfulId: contentfulBookedDate.sys.id,
      startDate: contentfulBookedDate.fields.startDate || null,
      endDate: contentfulBookedDate.fields.endDate || null,
      bookedBy: contentfulBookedDate.fields.bookedBy,
      bookedByEmail: contentfulBookedDate.fields.bookedByEmail,
      returned: contentfulBookedDate.fields.returned,
      pickedUp: contentfulBookedDate.fields.returned || false,
      requestedGear: excludeGear ? [] : requestedGear.map((gear) => {
        return GearForLoan.fromContentfulObject(gear, { excludeDates: true })
      }),
    })
  }
}
