import {FC, useEffect, useState} from "react";
import {FlatList, StatusBar, Text, View, StyleSheet, Button} from "react-native"
import StudentListRow from "./StudentListRow";
import PostModel, { Post } from "../Model/PostModel";


const PostListPage: FC<{route:any, navigation: any, }> = ({navigation, route}) => {
    const [data, setData] = useState<Post[]>([])
    const onItemSelected = (id: string) => {
        console.log('Item selected' + id)
        navigation.navigate('StudentDetailsPage', {id: id, refreshToken: route.params.refreshToken, userID: route.params.userID});
    }
    let refToken = ''
    useEffect(()=>{
        const unsubsribe = navigation.addListener('focus',async()=>{
        try{
            const posts: any = await PostModel.getAllPosts(route.params.refreshToken)
            setData(posts.Posts)
            route.params.refreshToken = posts.refreshToken
        }catch(err){
            console.log(err)
        }
        console.log("screen in focus")
        navigation.setOptions(
            {
                headerTitle: "Students",
                headerRight: () => (
                  <Button
                  onPress={() => navigation.navigate('PostAddPage', {refreshToken: route.params.refreshToken, userID: route.params.userID})}
                  title="Add"
                  />
                )
              }
        )
        })
        return unsubsribe
        },[navigation, route.params])

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
                <StudentListRow post_title={item.post_title} post_text={item.post_text} imgURL={item.imgUrl} id={item.id} onItemSelected={onItemSelected}/>
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

export default PostListPage