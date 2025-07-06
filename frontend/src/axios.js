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

export const readHistory = () => API.get(`/readhistory`)
export const readCashierAcc = () => API.get(`/readcashieracc`)

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

//admin member
export const readMember = () => API.get(`/readmember`)
export const createMember = (data) => API.post(`/createmember`, data)
export const deleteMember = (id) => API.delete(`/deletemember/${id}`)
export const readIdMember = (id) => API.get(`/getbyidmember/${id}`)
export const updateMember = (id, data) => {
    data.append('_method', 'PUT')
    data.append('id', id)
    return API.post(`/updatemember`, data)
}

//admin supplier
export const readSupplier = () => API.get(`/readsupplier`)
export const createSupplier = (data) => API.post(`/createsupplier`, data)
export const deleteSupplier = (id) => API.delete(`/destroysupplier/${id}`)
export const readIdSupplier = (id) => API.get(`/showsupplier/${id}`)
export const updateSupplier = (id, data) => {
    data.append('_method', 'PUT')
    data.append('id', id)
    return API.post(`/updatesupplier`, data)
}

//admin payment
export const readPayment = () => API.get(`/readpayment`)
export const createPayment = (data) => API.post(`/createpayment`, data)
export const deletePayment = (id) => API.delete(`/destroypayment/${id}`)
export const readIdPayment = (id) => API.get(`/getbyidpayment/${id}`)
export const updatePayment = (id, data) => {
    data.append('_method', 'PUT')
    data.append('id', id)
    return API.post(`/updatepayment`, data)
}

//admin product
export const readProduct = () => API.get(`/readproduk`)
export const createProduct = (data) => API.post(`/createproduk`, data)
export const deleteProduct = (id) => API.delete(`/destroyproduk/${id}`)
export const readIdProduct = (id) => API.get(`/showproduk/${id}`)
export const categoryIdProduct = (id) => API.get(`/getbycategoryproduk/${id}`)
export const updateProduct = (id, data) => {
    data.append('_method', 'PUT')
    data.append('id', id)
    return API.post(`/updateproduk`, data)
}
//cashier
export const registercashier = (data) => API.post(`/registercashier`, data)
export const readCashierProduct = () => API.get(`/readcashierproduk`)
export const createOrder = (data) => API.post(`/createcart`, data)
export const readCashierPayment = () => API.get(`/readcashierpayment`)
export const readCashierMember = () => API.get(`/readcashiermember`)
export const readCashierCategory = () => API.get(`/readcashiercategory`)
export const readCashierIdProduct = (id) => API.get(`/getbycashiercategoryproduk/${id}`)
export const readCashierSupplier = () => API.get(`/readcashiersupplier`)
export const searchProduct = (data) => API.post(`/searchproduk`, data)
