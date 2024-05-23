import {FC, useEffect, useState} from "react";
import {FlatList, StatusBar, Text, View, StyleSheet, Button, Alert} from "react-native"
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {HeaderBackButton} from '@react-navigation/elements'
import StudentListRow from "./StudentListRow";
import PostModel, { Post } from "../Model/PostModel";
import LoginRegisterDropdownMenu from "./LoginRegisterDropdownMenu";
import LoginRegistrationModel from "../Model/LoginRegistrationModel";


const UserPostsListPage: FC<{route:any, navigation: any, }> = ({navigation, route}) => {
    const [data, setData] = useState<Post[]>([])
    const [refreshToken, setRefreshToken] = useState('')
    const onItemSelected = (id: string) => {
        console.log('Item selected' + id)
        navigation.navigate('PostDetailsPage', {id: id, refreshToken: route.params.refreshToken, userID: route.params.userID});
    }
    
    useEffect(()=>{
        console.log(route.params.refreshToken)
        let posts: any = null
        const unsubscribeFocus = navigation.addListener('focus',async()=>{
        
        try{
            posts = await PostModel.getAllPostsOfSpecificUser(route.params.refreshToken, route.params.userID)
            setData(posts.Posts)
        }catch(err){
            console.log(err)
        }
        console.log('Refresh token in UserPostsListPage: ' + posts.refreshToken)
        navigation.setParams({refreshToken: posts.refreshToken})
        setRefreshToken(refreshToken)
        console.log("In UserPostsListPage: " + route.params.refreshToken)
        console.log("screen in focus")
        navigation.setOptions({
            headerLeft:(props:any) => (
                <HeaderBackButton {...props} onPress={() => navigation.navigate("PostListPage", {refreshToken: posts.refreshToken, userID: route.params.userID})}/>
              ),
            headerRight:() => <LoginRegisterDropdownMenu onOptionSelected={onOptionSelected} refreshToken={posts.refreshToken}/>
          })
        })
        return () => {
            unsubscribeFocus()
        }
        },[navigation, route.params?.refreshToken])

    const onOptionSelected = async(option: string, refreshToken:string) => {
        console.log("From userPostsListPage: " + refreshToken)
        if (option == '2') {
            navigation.navigate('PostAddPage', {refreshToken: refreshToken, userID: route.params.userID})
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

export default UserPostsListPage