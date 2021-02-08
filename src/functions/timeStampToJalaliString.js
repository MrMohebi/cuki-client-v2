export function timeStampToJalali (timestamp) {
    let date = new Date(parseInt(timestamp) * 1000);
    let jd = date.toLocaleDateString('fa-IR');
    return jd

}