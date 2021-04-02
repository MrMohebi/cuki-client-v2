import moment from 'jalali-moment'

export default function isResOpen (openTimes){
    // start from Saturday
    let dayOfWeek = moment().day() + 1
    if (dayOfWeek === 7)
        dayOfWeek = 0

    let monthInJalali = moment().utcOffset('+0330').jMonth()
    let hourInTehran = moment().utcOffset('+0330').hour()

    // handle summer time (one hour)
    if(monthInJalali - 5 < 0)
        hourInTehran = moment().utcOffset('+0430').hour()

    return openTimes[dayOfWeek].includes(hourInTehran)
}