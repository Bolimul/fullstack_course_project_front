import apiClient from "./ClientApi";

const getAllStudents = async () => {
    return await apiClient.get('/student')
}

const getUser = async (id: string, refreshToken: string) => {
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('Authorization', 'Bearer ' + data.data['accessToken'])
    return await apiClient.get('/student/' + id)
}

const addStudent = async (student: any) => {
    return await apiClient.post('/student', student)
}

const uploadImage = async(image: any) => {
    return await apiClient.post("/file/file", image, {headers:{"Content-Type": 'multipart/form-data'}})
}

export default {
    getAllStudents,
    addStudent,
    uploadImage,
    getUser
}