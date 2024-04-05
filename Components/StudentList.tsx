import {FC, useEffect, useState} from "react";
import {FlatList, StatusBar, Text, View, StyleSheet} from "react-native"
import StudentListRow from "./StudentListRow";
import StudentModel, {Student} from "../Model/StudentModel";


const StudentList: FC = () => {
    const [data, setData] = useState<Student[]>([])
    const onItemSelected = (id: string) => {
        console.log('Item selected' + id)
    }

useEffect(() => {
    setData(StudentModel.getAllStudents())
}, [])

    return(
        <FlatList 
            style={styles.flatstyle}
            data = {data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <StudentListRow name={item.name} id={item.id} imgURL={item.imgUrl} onItemSelected={onItemSelected}/>
            )}
        />
    )
}

const styles = StyleSheet.create({
    flatstyle: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
});

export default StudentList