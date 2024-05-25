import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button, ActivityIndicator} from 'react-native';
import PostModel, {Post} from '../Model/PostModel';
import {HeaderBackButton} from '@react-navigation/elements'
import LoginRegistrationModel from '../Model/LoginRegistrationModel';
import LoginRegisterDropdownMenu from './LoginRegisterDropdownMenu';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const PostDetailsPage: FC<{route: any, navigation: any}> = ({route, navigation}) => {
  const [post, setPost] = useState<Post>({creator_id: '0', post_title: '0', post_text: '0', imgUrl: '0', id: '0', creator_imgUrl: '0'})
  const [isOwner, setOwner] = useState(false)
  const [isLoading, setLoading] = useState(true)

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId: "904531963231-c4b8cdq9ua6nb2l3ln5h1i3etl087nef.apps.googleusercontent.com"
  })

  const onOptionSelected = async(option: string) => {
    if (option == '2') {
        navigation.navigate('PostAddPage', {refreshToken: route.params.refreshToken, userID: route.params.userID})
    }
    else if(option == '1') {
        navigation.navigate('PostListPage', {refreshToken: route.params.refreshToken, userID: route.params.userID})
    }
    else if(option == '3') {
        navigation.navigate('UserEditPage', {refreshToken: route.params.refreshToken, userID: route.params.userID})
    }
    else if(option == '4') {
        navigation.navigate('UserPostsListPage', {refreshToken: route.params.refreshToken, userID: route.params.userID})
    }
    else if(option == '5') {
        const res = await LoginRegistrationModel.logout(route.params.refreshToken)
        if(res == true)
        {
          await GoogleSignin.revokeAccess()
          await GoogleSignin.signOut()
          navigation.navigate('LoginPage')
        }
        else
            Alert.alert("Logout was not successful")
    }
}

  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus',async()=>{
      try{
        const post: any = await PostModel.getPost(route.params.id, route.params.refreshToken)
        setPost(post.dispPost)
        navigation.setParams({refreshToken: post.refreshToken}) 
        console.log(post)
        if(post.dispPost.creator_id == route.params.userID)
          setOwner(true)
        navigation.setOptions({
          headerLeft: (props: any) => (
            <HeaderBackButton {...props} onPress={() => {navigation.navigate("PostListPage", {refreshToken: post.refreshToken, userID: route.params.userID})}}/>
          ),
          headerRight:() => <LoginRegisterDropdownMenu onOptionSelected={onOptionSelected} refreshToken={post.refreshToken}/>
        })
      }catch(err){
        console.log(err)
      }
    })
    return unsubscribe
}, [navigation, route.params])


useEffect(() => {
  if (post.creator_id != '0' && post.post_title != '0' && post.post_text != '0' && post.imgUrl != '0' && post.id != '0') {
      setLoading(false)
  }
  else {
      setLoading(true)
  }
}, [post])


const OnEdit = () => {
  navigation.navigate("PostEditPage", {refreshToken: route.params.refreshToken, userID: route.params.userID, id: route.params.id})
}
const OnDelete = async() => {
  const res = await PostModel.deletePost(post.id, route.params.refreshToken)
  if(res){
    navigation.navigate("PostListPage", {refreshToken: res.refreshToken, userID: route.params.userID})
  }
}

    return(    
      <View style={styles.viewstyle}>
        {isLoading ? <ActivityIndicator size={'large'}/> : 
          <View style={styles.container}>
          <Text style={styles.title}>{post.post_title}</Text>
          <Image style={styles.image} source={{uri: post.imgUrl}}/>
          <Text style={styles.text}>{post.post_text}</Text>
          {isOwner && <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={OnDelete}>
              <Text style={styles.button}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={OnEdit}>
              <Text style={styles.button}>EDIT</Text>
            </TouchableOpacity>
          </View>}
          
      </View>
        }
      </View>
    
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'bisque',
      justifyContent: 'space-around'
    },
    title: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold'
    },
    image: {
      alignSelf: 'center',
      width: 200,
      height: 200,
      borderRadius: 100
    },
    text: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    button: {
      padding: 10
    },
    viewstyle: {
      flex: 1,
    }
})

export default PostDetailsPage;