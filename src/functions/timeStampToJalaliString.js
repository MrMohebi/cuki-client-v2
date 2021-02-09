import moment from "jalali-moment";

export function timeStampToJalali (timestamp) {
    let date = new Date(parseInt(timestamp) * 1000);
    let jd = date.toLocaleDateString('fa-IR');
    return jd
}

export function timeStampToGregorian(timeStamp){
    moment.locale('lt')
    return moment.unix(timeStamp - 24*60*60).format("MM/DD/YYYY").split('/')
}
export function jalaliToGregorian(year,month,day){
    let dateToC = year+'/'+month+'/'+day
    let myMoment = moment.from(dateToC, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD').split('/');
    let tempYear = myMoment[0]
    let tempMonth = myMoment[1]
    let tempDay = myMoment[2]
    return {year:tempYear,month:tempMonth,day:tempDay}
}


export function gregorianToTimeStamp(year,month,day){
    let mdate = day.toString()+'-'+month+'-'+year+'-'
    let myDate = "30-05-2002";
    mdate = mdate.split("-");
    let newDate = new Date( mdate[2], mdate[1] - 1, mdate[0]);
    return newDate.getTime()/1000+24*60*60

}