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

const getAllStudents = (): Student[] => {
    return data
}

const getStudent = (id: string): Student | undefined => {
    return data.find((student) => student.id === id);
}

const addStudent = (student: Student) => {
    data.push(student)
}

const deleteStudent = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if(index != -1)
        data.splice(index, 1)
}

export default {getAllStudents, getStudent, addStudent, deleteStudent}