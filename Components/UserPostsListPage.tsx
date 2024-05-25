import {FC, useEffect, useState} from "react";
import {FlatList, StatusBar, Text, View, StyleSheet, Button, Alert, ActivityIndicator} from "react-native"
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {HeaderBackButton} from '@react-navigation/elements'
import PostListContent from "./PostListContent";
import PostModel, { Post } from "../Model/PostModel";
import LoginRegisterDropdownMenu from "./LoginRegisterDropdownMenu";
import LoginRegistrationModel from "../Model/LoginRegistrationModel";
import { GoogleSignin } from "@react-native-google-signin/google-signin";


const UserPostsListPage: FC<{route:any, navigation: any, }> = ({navigation, route}) => {
    const [data, setData] = useState<Post[]>([])
    const [isLoading, setLoading] = useState(true)

    GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId: "904531963231-c4b8cdq9ua6nb2l3ln5h1i3etl087nef.apps.googleusercontent.com"
      })

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

    useEffect(() => {
        if (data.length > 0) {
            setLoading(false)
        }
        else {
            setLoading(true)
        }
    }, [data])

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
            {
                await GoogleSignin.signOut()
                navigation.navigate('LoginPage')
            }
            else
                Alert.alert("Logout was not successful")
        }
    }

    return(
        <View style={styles.viewstyle}>
            {isLoading ? <ActivityIndicator size={'large'}/> : 
                <FlatList 
                style={styles.flatstyle}
                data = {data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <PostListContent post_title={item.post_title} post_text={item.post_text} imgURL={item.imgUrl} id={item.id} creator_image={item.creator_imgUrl} onItemSelected={onItemSelected}/>
                )}
            />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    flatstyle: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    viewstyle: {
        flex: 1,
    }
});

export default UserPostsListPage