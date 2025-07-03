import axios from "axios"

const microservice = 'http://localhost:8000/api/auth/'
const API = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

//public auth
export const register = (data) => axios.post(`${microservice}register`, data)

// admin
export const login = (data) => API.post(`auth/login`, data)

//admin category
export const readCategory = () => API.get(`/readcategory`)
export const createCategory = (data) => API.post(`/createcategory`, data)
export const deleteCategory = (id) => API.delete(`/destroycategory/${id}`)
export const readIdCategory = (id) => API.get(`/showcategory/${id}`)
export const updateCategory = (id, data) => { 
    data.append('_method', 'PUT') 
    data.append('id', id)  
    return API.post(`/updatecategory`, data)
}

//cashier
export const registercashier = (data) => API.post(`/registercashier`, data)

