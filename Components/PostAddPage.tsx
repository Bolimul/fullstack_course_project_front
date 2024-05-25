import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements'
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostModel, { Post } from '../Model/PostModel';
import LoginRegisterDropdownMenu from './LoginRegisterDropdownMenu';
import LoginRegistrationModel from '../Model/LoginRegistrationModel';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const PostAddPage: FC<{route: any, navigation: any}> = ({navigation, route}) => {

    const [title, onChangeTitle] = useState('');
    const [txt, onChangeTxt] = useState('');
    const [avatarUri, setAvatarUri] = useState('');

    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId: "904531963231-c4b8cdq9ua6nb2l3ln5h1i3etl087nef.apps.googleusercontent.com"
    })

    const askPermission = async () => {
      try {
        const res = await ImagePicker.getCameraPermissionsAsync()
        if(!res.granted){
          alert("Camera permission is required!!!")
        }
      } catch (error) {
        console.log("askPermmition error: " + error)
      }
    }


    const openCamera = async () => {
      try{
        const res = await ImagePicker.launchCameraAsync()
        if(!res.canceled && res.assets.length>0){
          const uri = res.assets[0].uri
          setAvatarUri(uri)
        }
      }catch(err){
        console.log("open camera error: " + err)
      }
      
    }

    const openGallery = async() => {
      try{
        const res = await ImagePicker.launchImageLibraryAsync()
        if(!res.canceled && res.assets.length>0){
          const uri = res.assets[0].uri
          setAvatarUri(uri)
        }
      }catch(err){
        console.log("open camera error: " + err)
      }
    }

    const onOptionSelected = async(option: string, refreshToken: string) => {
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

    useEffect(() => {
      askPermission()
      navigation.setOptions({
        headerLeft:(props: any) => (
          <HeaderBackButton {...props} onPress={() => navigation.navigate("PostListPage", {refreshToken: route.params.refreshToken, userID: route.params.userID})}/>

        ),
        headerRight:() => <LoginRegisterDropdownMenu onOptionSelected={onOptionSelected} refreshToken={route.params.refreshToken}/>
      })
    }, [])
  
    const onCancel = () => {
      navigation.navigate("PostListPage", {refreshToken: route.params.refreshToken, userID: route.params.userID})
    }
    const onSave = async() => {
      console.log(avatarUri)
      console.log(JSON.stringify(route.params))
      let post:Post = {
        creator_id: route.params.userID,
        post_title: title,
        post_text: txt,
        imgUrl: avatarUri,
        id: '',
        creator_imgUrl: ''
      }
      try {
        if(avatarUri != ""){
          console.log("uploading image")
          const url = await PostModel.uploadImage(avatarUri)
          post.imgUrl = url
        }
      }catch(err){
        console.log(err)
      }
      const result = await PostModel.addPost(post, route.params.refreshToken);
      console.log(result)
      if(result)
        navigation.navigate("PostListPage", {refreshToken: result.refreshToken, userID: route.params.userID})
      else
        Alert.alert("Something gone wrong while creating this post. Please try again")
    }
    return(    
    <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          placeholder='Enter your Title'
        />
        <View>
        {avatarUri == "" && <Image style={styles.avatar} source={require('../assets/dish example.jpg')}/>}
        {avatarUri != "" && <Image style={styles.avatar} source={{uri: avatarUri}}/>}
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name={"image"} style={styles.galleryButton} size={50}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera}>
          <Ionicons name={"camera"} style={styles.cameraButton} size={50}/>
        </TouchableOpacity>
        </View>
        
        
        <TextInput
          style={styles.input}
          onChangeText={onChangeTxt}
          placeholder='Enter your Text'
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.button}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.button}>SAVE</Text>
          </TouchableOpacity>
        </View>
  
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      
    },
    avatar: {
      height: 250,
      resizeMode: "contain",
      alignSelf: 'center',
      width: '100%'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold'
    },
    image: {
      alignSelf: 'center',
      width: 200,
      height: 200,
    },
    cameraButton: {
      position: 'absolute',
      bottom: -10,
      left: 10,
      width: 50,
      height: 50,
    },
    galleryButton: {
      position: 'absolute',
      bottom: -10,
      right: 10,
      width: 50,
      height: 50,
    },
    input: {
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
    }
})

export default PostAddPage;