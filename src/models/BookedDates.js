import GearForLoan from "./GearForLoan";

export default class BookedDates {
  constructor({startDate, endDate, bookedBy, requestedGear}) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.bookedBy = bookedBy
    this.requestedGear = requestedGear || []
  }

  toJSON() {
    return {
      'startDate': this.startDate,
      'endDate': this.endDate,
      'bookedBy': this.bookedBy,
      'requestedGear': this.requestedGear.map((gear) => gear.toJSON()),
    }
  }

  static fromJSON(json) {
    return new BookedDates({
      'startDate': json.startDate,
      'endDate': json.endDate,
      'bookedBy': json.bookedBy,
      'requestedGear': json.requestedGear.map((gearJSON) => GearForLoan.fromJSON(gearJSON))
    })
  }

  static fromContentfulObject(contentfulBookedDate) {
    let requestedGear = contentfulBookedDate.fields.gearBooked || []

    return new BookedDates({
      startDate: contentfulBookedDate.fields.startDate,
      endDate: contentfulBookedDate.fields.endDate,
      bookedBy: contentfulBookedDate.fields.bookedBy,
      requestedGear: requestedGear.map((gear) => {
        return GearForLoan.fromContentfulObject(gear)
      }),
    })
  }
}
