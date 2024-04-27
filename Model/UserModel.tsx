import UserApi from "../api/UserApi"
import FormData from 'form-data';

export type User = {
    name: string,
    age: string,
    email: string,
    imgUrl: string
}


const getAllStudents = async () => {
    console.log("getAllStudentss")
    let data = Array<User>()
    try {
        const students: any = await UserApi.getAllStudents()
        if(students.data){
            for (let index = 0; index < students.data.length; index++) {
                console.log("element: " + students.data[index]._id)
                const st: User = {
                    name: students.data[index].name,
                    age: students.data[index].age,
                    email: students.data[index].email,
                    imgUrl: students.data[index].imgUrl
                }
                data.push(st)
            }
        }
        console.log(data)
        return data
    } catch (error) {
        console.log("Fail reading students from server: " + error)
    }
    return data
    
    
}

const getUserById = async(id: string, refreshToken: string) => {
    try{
        const user: any = await UserApi.getUser(id, refreshToken)
    if(user)
        {
            return user
        }
    }catch(err){
        console.log(err)
    }
    
}

// const addStudent = async (student: User) => {
//     console.log("addStudent")
//     const data = {_id: student.id, name: student.name, imgUrl: student.imgUrl}
//     try {
//         const res = await StudentApi.addStudent(data) 
//         if(!res.ok){
//             console.log("adding student failed")
//         }
//         else{
//             console.log("adding student was successful")
//         }
//     } catch (error) {
//         console.log(error)
//     }
    
// }

// const deleteStudent = (id: string) => {
//     const index = data.findIndex((student) => student.id == id);
//     if(index != -1)
//         data.splice(index, 1)
// }

const uploadImage = async(imageURI: String) => {
        var body = new FormData();
        body.append('file', {name: "name",type: 'image/jpeg',"uri": imageURI});
        try{
            const res = await UserApi.uploadImage(body)
            if(!res.ok){
                console.log("save failed " + res.problem)
            }else{
                if(res.data){
                    const d:any = res.data
                    return d.url
                }
            }
        }catch(err){
            console.log("save failed " + err)
        }
        return ""
        
        
}

export default {getUserById, uploadImage}