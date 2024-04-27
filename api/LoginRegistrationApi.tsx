import apiClient from "./ClientApi";

const login = async(email: string, password: string) => {
    return await apiClient.post('/auth/login', {email: email, password: password})
}

const registration = async(user: any) => {
    return await apiClient.post('/auth/register', user)
}

export default {
    login,
    registration
}