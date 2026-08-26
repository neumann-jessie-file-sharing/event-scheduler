const TOKEN_KEY = "api_token"

export function saveToken(token: string){
    localStorage.setItem(TOKEN_KEY, token)
    //localStorage.setItem("api_token", "fake_token") //TODO: Replace with the actual token from the API response

}

export function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}

export function removeToken(){
    localStorage.removeItem(TOKEN_KEY)
}   

export function isTokenPresent(){
    return Boolean(getToken())
}