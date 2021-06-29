export default function getComName(){
    let urlPath = window.location.pathname
    let urlPathArr = urlPath.split("/")
    let fullName = urlPathArr[1].split("-")
    if(fullName[0] === "c"){
        return fullName[1];
    }else {
        return '';
    }
}

export function getFullName(){
    let urlPath = window.location.pathname
    let urlPathArr = urlPath.split("/")
    let fullName = urlPathArr[1].split("-")
    if(fullName[0] === "c"){
        return urlPathArr[1];
    }else {
        return '';
    }
}
