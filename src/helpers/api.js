import axios from "axios";

const domain = process.env.NEXT_PUBLIC_API_ENDPOINT
export const api = axios.create({
    baseURL: domain + '/api',
})