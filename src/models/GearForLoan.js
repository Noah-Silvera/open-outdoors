import BookedDates from "./BookedDates";

export default class GearForLoan {
  constructor({ id, title, description, bookedDatesArray, types, images }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.bookedDatesArray = bookedDatesArray;
    this.types = types;
    this.images = images;
  }

  toJSON({ excludeDates } = {}) {
    let json = {
      'id': this.id,
      'title': this.title,
      'description': this.description,
      'bookedDatesArray': this.bookedDatesArray.map((bookedDates) => bookedDates.toJSON({ excludeGear: true })),
      'types': this.types,
      'images': this.images
    }

    if (excludeDates) {
      delete json['bookedDatesArray']
    }

    return json
  }

  static fromJSON(json) {
    return new GearForLoan(json)
  }

  static fromContentfulObject(contentfulGearForLoan, { excludeDates } = {}) {
    let gearTypes = contentfulGearForLoan.fields.types || [];
    if (gearTypes.length > 0 && gearTypes[0].sys.type == 'Link') {
      gearTypes = []
    }

    let bookedDatesArray;

    if (excludeDates) {
      bookedDatesArray = [];
    } else if (contentfulGearForLoan.fields.bookedDates) {
      bookedDatesArray = contentfulGearForLoan.fields.bookedDates.filter((bookedDate) => bookedDate.sys['type'] === 'Entry').map((bookedDate) => BookedDates.fromContentfulObject(bookedDate, { excludeGear: true }))
    } else {
      bookedDatesArray = [];
    }

    return new GearForLoan({
      id: contentfulGearForLoan.sys.id,
      title: contentfulGearForLoan.fields.title,
      description: contentfulGearForLoan.fields.description,
      bookedDatesArray: bookedDatesArray,
      types: gearTypes.map((type) => type.fields['type']),
      images: contentfulGearForLoan.fields.images.map((image) => {
        return {
          'url': image.fields.file.url,
          'description': image.fields.description
        }
      })
    })
  }
}
