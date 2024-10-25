//  ******************** Base URL ***********************
let baseUrl = "https://game-leaderboard-api.vercel.app/api";
//  ******************** Token ***********************
var token = localStorage.getItem('user-token');

export const userLogin = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "/login", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const getPlayers = async (keword) => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "authorization": token 
        },
    }
    const response = await fetch(baseUrl + `/players?search=${keword}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const getAPlayer = async (id) => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
    }
    const response = await fetch(baseUrl + `/players/${id}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const userProfile = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
    }
    const response = await fetch(baseUrl + "/profile", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response.json();
    return { data: data, ok: true }
}

export const editPlayer = async (body,id) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + `/player/${id}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

