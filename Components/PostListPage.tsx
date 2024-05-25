import {FC, useEffect, useState} from "react";
import {FlatList, StatusBar, Text, View, StyleSheet, Button, Alert, ActivityIndicator} from "react-native"
import {CommonActions, useIsFocused, useNavigation} from '@react-navigation/native'
import {HeaderBackButton} from '@react-navigation/elements'
import StudentListRow from "./StudentListRow";
import PostModel, { Post } from "../Model/PostModel";
import LoginRegisterDropdownMenu from "./LoginRegisterDropdownMenu";
import LoginRegistrationModel from "../Model/LoginRegistrationModel";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';


const PostListPage: FC<{route:any, navigation: any, }> = ({navigation, route}) => {
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

    const logout = async(refreshToken: string) => {
        const res = await LoginRegistrationModel.logout(refreshToken)
        if(res == true)
        {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            navigation.navigate('LoginPage')
        }
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

        useEffect(() => {
            if (data.length > 0) {
                setLoading(false)
            }
            else {
                setLoading(true)
            }
        }, [data])

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
        <View style={styles.viewstyle}>
            {isLoading ? <ActivityIndicator size={'large'}/> : 
                <FlatList 
                style={styles.flatstyle}
                data = {data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <StudentListRow post_title={item.post_title} post_text={item.post_text} imgURL={item.imgUrl} id={item.id} creator_image={item.creator_imgUrl} onItemSelected={onItemSelected}/>
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

export default PostListPage