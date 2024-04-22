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
        const unsubsribe = navigation.addListener('focus',()=>{
        setData([...StudentModel.getAllStudents()])
        console.log("screen in focus")
        })
        return unsubsribe
        },[navigation])

useEffect(() => {
    setData(StudentModel.getAllStudents())
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

export default StudentListPage