import apiClient from "./ClientApi";

const getAllStudents = async () => {
    return await apiClient.get('/student')
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
    uploadImage
}