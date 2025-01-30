import axios from 'axios';
import { getUser } from './storage';

export const URL = "https://api.ipesti-bf.org/"
//export const URL = "http://127.0.0.1:8000/" 
export const URL_ = URL

const user = getUser()

console.log(user)

const request = axios.create({
    baseURL: URL+"api/",
    headers: {
        'Accept':'application/json',
        'Authorization' : `Bearer ${user?.token}`,
        "Content-Type":"multipart/form-data"
    },
});



export default request