// @TODO consider replacing with date-fns

const dateDisplay = (passedDate) => {
  const date = new Date(passedDate)
  // if invalid date provided return null
  if (typeof date !== 'object' || isNaN(date.getTime())) {
    return null
  }

  return {
    date,
    shortMonths: false,
    coma: false,
    year: true,
    hours: false,
    separator: ' ',
    withShortMonths() {
      return {
        ...this,
        shortMonths: true,
      }
    },
    withComa() {
      return {
        ...this,
        coma: true,
      }
    },
    withoutYear() {
      return {
        ...this,
        year: false,
      }
    },
    withHours() {
      return {
        ...this,
        hours: true,
      }
    },
    withSeparator(separator) {
      return {
        ...this,
        separator,
      }
    },
    format() {
      const longMonthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      const shortMonthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ]

      const day = this.date.getDate(),
        monthNumber = this.date.getMonth(),
        lastDigit = day > 9 ? +day.toString().substr(-1) : day,
        dayStr = (() => {
          switch (lastDigit) {
            case 1:
              return `${day}st`
            case 2:
              return `${day}nd`
            case 3:
              return `${day}rd`
            default:
              return `${day}th`
          }
        })(),
        hours = this.hours
          ? (() => {
              const timeHours = ('0' + this.date.getHours()).slice(-2)
              const timeMinutes = ('0' + this.date.getMinutes()).slice(-2)

              return `${timeHours}:${timeMinutes}`
            })()
          : ''

      return `${dayStr}${this.separator}${
        this.shortMonths ? shortMonthNames[monthNumber] : longMonthNames[monthNumber]
      }${this.coma ? ',' : ''}${this.separator}${this.year ? this.date.getFullYear() : ''}${
        this.hours ? ' ' + hours : ''
      }`
    },
  }
}

export default dateDisplay
