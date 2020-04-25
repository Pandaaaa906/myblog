import Cookies from "js-cookie";

export function isAuthorized(){
    console.log(Cookies.get("sessionid"));
    return !!Cookies.get("sessionid")
}

