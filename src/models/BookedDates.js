import GearForLoan from "./GearForLoan";

export default class BookedDates {
  constructor({startDate, endDate, bookedBy, requestedGear, returned}) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.bookedBy = bookedBy;
    this.returned = returned || false;
    this.requestedGear = requestedGear || []
  }

  toJSON({excludeGear} = {}) {
    let json = {
      'startDate': this.startDate,
      'endDate': this.endDate,
      'bookedBy': this.bookedBy,
      'returned': this.returned,
      'requestedGear': this.requestedGear.map((gear) => gear.toJSON({ excludeDates: true}))
    }

    if(excludeGear){
      delete json['requestedGear']
    }

    return json
  }



  static fromJSON(json) {
    return new BookedDates({
      'startDate': json.startDate,
      'endDate': json.endDate,
      'bookedBy': json.bookedBy,
      'returned': json.returned,
      'requestedGear': json.requestedGear.map((gearJSON) => GearForLoan.fromJSON(gearJSON))
    })
  }

  static fromContentfulObject(contentfulBookedDate, {excludeGear} = {}) {
    let requestedGear = contentfulBookedDate.fields.gearBooked || []

    return new BookedDates({
      startDate: contentfulBookedDate.fields.startDate,
      endDate: contentfulBookedDate.fields.endDate,
      bookedBy: contentfulBookedDate.fields.bookedBy,
      returned: contentfulBookedDate.fields.returned,
      requestedGear: excludeGear ? [] : requestedGear.map((gear) => {
        return GearForLoan.fromContentfulObject(gear, { excludeDates: true})
      }),
    })
  }
}
