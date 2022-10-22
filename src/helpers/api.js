import axios from "axios";

const domain = process.env.NEXT_PUBLIC_API_ENDPOINT
const token = localStorage.getItem('token')
export const api = axios.create({
    baseURL: domain + '/api',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }
})