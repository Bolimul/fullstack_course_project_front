import apiClient from "./ClientApi";


const getUser = async (id: string, refreshToken: string) => {
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('Authorization', 'Bearer ' + data.data['accessToken'])
    const user = await apiClient.get('/user/' + id)
    console.log(user.data)
    if(user)
        return {currentUser: user.data, refreshToken: data.data.refreshToken}
    else{
        return false
    }
}

const updateUser = async (user: any, refreshToken: string) => {
    console.log(user)
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('Authorization', 'Bearer ' + data.data['accessToken'])
    const result = await apiClient.put('/user/' + user.id, user)
    if(result)
        return {refreshToken: data.data.refreshToken}
    else
        return false
}

const uploadImage = async(image: any) => {
    return await apiClient.post("/file/file", image, {headers:{"Content-Type": 'multipart/form-data'}})
}

export default {
    updateUser,
    uploadImage,
    getUser
}