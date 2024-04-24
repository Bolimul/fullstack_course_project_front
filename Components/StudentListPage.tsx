import {FC, useEffect, useState} from "react";
import {FlatList, StatusBar, Text, View, StyleSheet, Button} from "react-native"
import StudentListRow from "./StudentListRow";
import StudentModel, {Student} from "../Model/StudentModel";


const StudentListPage: FC<{navigation: any}> = ({navigation}) => {
    const [data, setData] = useState<Student[]>([])
    const onItemSelected = (id: string) => {
        console.log('Item selected' + id)
        navigation.navigate('StudentDetailsPage', {id: id});
    }

    useEffect(()=>{
        const unsubsribe = navigation.addListener('focus',async()=>{
        let students = Array<Student>()
        try{
            students = await StudentModel.getAllStudents()
        }catch(err){
            console.log(err)
        }
        setData(students)
        console.log(students)
        console.log("screen in focus")
        navigation.setOptions(
            {
                headerTitle: "Students",
                headerRight: () => (
                  <Button
                  onPress={() => navigation.navigate('StudentAddPage')}
                  title="Add"
                  />
                )
              }
        )
        })
        return unsubsribe
        },[navigation])

// useEffect(() => {
//     let students = Array<Student>()
//     try{
//         const students = await StudentModel.getAllStudents()
//         setData(students)
//     }catch(err){
//         console.log(err)
//     }
//     setData(StudentModel.getAllStudents())
//     navigation.setOptions(
//         {
//             headerTitle: "Students",
//             headerRight: () => (
//               <Button
//               onPress={() => navigation.navigate('StudentAddPage')}
//               title="Add"
//               />
//             )
//           }
//     )
// }, [])

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

export default StudentListPage