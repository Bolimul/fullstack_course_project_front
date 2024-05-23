import apiClient from "./ClientApi";

const login = async(email: string, password: string) => {
    return await apiClient.post('/auth/login', {email: email, password: password})
}

const registration = async(user: any) => {
    return await apiClient.post('/auth/register', user)
}

const logout = async(refreshToken: string) => {
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('Authorization', 'Bearer ' + data.data.refreshToken)
    return await apiClient.post('/auth/logout')
}

export default {
    login,
    registration,
    logout
}