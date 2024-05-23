import {FC, useEffect, useState} from "react";
import {FlatList, StatusBar, Text, View, StyleSheet, Button, Alert} from "react-native"
import {CommonActions, useIsFocused, useNavigation} from '@react-navigation/native'
import {HeaderBackButton} from '@react-navigation/elements'
import StudentListRow from "./StudentListRow";
import PostModel, { Post } from "../Model/PostModel";
import LoginRegisterDropdownMenu from "./LoginRegisterDropdownMenu";
import LoginRegistrationModel from "../Model/LoginRegistrationModel";


const PostListPage: FC<{route:any, navigation: any, }> = ({navigation, route}) => {
    const [data, setData] = useState<Post[]>([])
    const onItemSelected = (id: string) => {
        console.log('Item selected' + id)
        navigation.navigate('PostDetailsPage', {id: id, refreshToken: route.params.refreshToken, userID: route.params.userID});
    }

    const logout = async(refreshToken: string) => {
        const res = await LoginRegistrationModel.logout(refreshToken)
        if(res == true)
            navigation.navigate('LoginPage')
        else
            Alert.alert("Logout was not successful")}

    
    useEffect(()=>{
        console.log("Navigation route params: " + route.params.refreshToken)
        let posts: any
        const unsubscribeFocus = navigation.addListener('focus',async()=>{
        try{
            posts = await PostModel.getAllPosts(route.params.refreshToken)
            setData(posts.Posts)
            console.log("Navigation route params: " + route.params.data.refreshToken)
        }catch(err){
            console.log(err)
        }
        await navigation.setParams({refreshToken: posts.refreshToken})
        console.log("screen in focus")
        navigation.setOptions({
            headerRight:() => <LoginRegisterDropdownMenu onOptionSelected={onOptionSelected} refreshToken={posts.refreshToken}/>,
            headerLeft:(props:any) => (<HeaderBackButton {...props} onPress={() => logout(posts.refreshToken)}/>)
            }
        )
    })
        
        return () => {
            unsubscribeFocus()
        }
        },[navigation, route.params?.refreshToken])

        const onOptionSelected = async(option: string, refreshToken: string) => {
            console.log("From PostListPage: " + route.params.refreshToken)
            if (option == '2') {
                navigation.dispatch(CommonActions.navigate('PostAddPage', {refreshToken: refreshToken, userID: route.params.userID}))
            }
            else if(option == '1') {
                navigation.navigate('PostListPage', {refreshToken: refreshToken, userID: route.params.userID})
            }
            else if(option == '3') {
                navigation.navigate('UserEditPage', {refreshToken: refreshToken, userID: route.params.userID})
            }
            else if(option == '4') {
                navigation.navigate('UserPostsListPage', {refreshToken: refreshToken, userID: route.params.userID})
            }
            else if(option == '5') {
                const res = await LoginRegistrationModel.logout(refreshToken)
                if(res == true)
                    navigation.navigate('LoginPage')
                else
                    Alert.alert("Logout was not successful")
            }
        }

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