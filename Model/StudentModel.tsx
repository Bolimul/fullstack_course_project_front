import StudentApi from "../api/StudentApi"
import FormData from 'form-data';

export type Student = {
    name: string,
    id: string,
    imgUrl: string
}

const data: Student[] = [
    {
        name: 'Jane Smith',
        id: '123459',
        imgUrl: 'https://via.placeholder.com/150'
    },
    {
        name: 'John Smith',
        id: '123456',
        imgUrl: 'https://via.placeholder.com/150'
    },
    {
        name: 'Jacob Smith',
        id: '123457',
        imgUrl: 'https://via.placeholder.com/150'
    },
    {
        name: 'Jacce Smith',
        id: '1234598',
        imgUrl: 'https://via.placeholder.com/150'
    }
]

const getAllStudents = async () => {
    console.log("getAllStudentss")
    let data = Array<Student>()
    try {
        const students: any = await StudentApi.getAllStudents()
        if(students.data){
            for (let index = 0; index < students.data.length; index++) {
                console.log("element: " + students.data[index]._id)
                const st: Student = {
                    name: students.data[index].name,
                    id: students.data[index]._id,
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

const getStudent = (id: string): Student | undefined => {
    return data.find((student) => student.id == id);
}

const addStudent = async (student: Student) => {
    console.log("addStudent")
    const data = {_id: student.id, name: student.name, imgUrl: student.imgUrl}
    try {
        const res = await StudentApi.addStudent(data) 
        if(!res.ok){
            console.log("adding student failed")
        }
        else{
            console.log("adding student was successful")
        }
    } catch (error) {
        console.log(error)
    }
    
}

const deleteStudent = (id: string) => {
    const index = data.findIndex((student) => student.id == id);
    if(index != -1)
        data.splice(index, 1)
}

const uploadImage = async(imageURI: String) => {
        var body = new FormData();
        body.append('file', {name: "name",type: 'image/jpeg',"uri": imageURI});
        try{
            const res = await StudentApi.uploadImage(body)
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

export default {getAllStudents, getStudent, addStudent, deleteStudent, uploadImage}