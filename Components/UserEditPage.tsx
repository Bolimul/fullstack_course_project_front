import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button, ActivityIndicator} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements'
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostModel, { Post } from '../Model/PostModel';
import UserModel, { User } from '../Model/UserModel';
import LoginRegistrationModel from '../Model/LoginRegistrationModel';
import LoginRegisterDropdownMenu from './LoginRegisterDropdownMenu';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const PostAddPage: FC<{route: any, navigation: any}> = ({navigation, route}) => {

    const [name, onChangeName] = useState('');
    const [age, onChangeAge] = useState('');
    const [avatarUri, setAvatarUri] = useState('url');
    const [email, onChangeEmail] = useState('');
    const [refreshToken, setRefreshToken] = useState('')
    const [isLoading, setLoading] = useState(true)

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
              await GoogleSignin.revokeAccess()
              await GoogleSignin.signOut()
              navigation.navigate('LoginPage')
          }
          else
              Alert.alert("Logout was not successful")
      }
  }

    const getUser = async() => {
      try{
        if(name == '' && age == '' && avatarUri == 'url' && email == ''){
          const currentUser: any = await UserModel.getUserById(route.params.userID, route.params.refreshToken)
        const extractedUser: User = {
          name: currentUser.currentUser.name, 
          age: currentUser.currentUser.age, 
          email: currentUser.currentUser.email, 
          imgUrl: currentUser.currentUser.imgUrl}
        setAvatarUri(extractedUser.imgUrl)
        onChangeName(extractedUser.name)
        onChangeAge(extractedUser.age)
        onChangeEmail(extractedUser.email)
        setRefreshToken(currentUser.refreshToken)
        navigation.setOptions({
          headerLeft:(props:any) => (
            <HeaderBackButton {...props} onPress={() => navigation.navigate("PostListPage", {refreshToken: currentUser.refreshToken, userID: route.params.userID, id: route.params.id})}/>
          ),
          headerRight:() => <LoginRegisterDropdownMenu onOptionSelected={onOptionSelected} refreshToken={currentUser.refreshToken}/>
        })
        }
        
      }catch(err){
        console.log(err)
      }
    }
    useEffect(() => {
      askPermission()
      getUser()
      if (name != '') {
          setLoading(false)
      }
      else {
          setLoading(true)
      }
    }, [name])

    const onSave = async(refreshToken: string) => {
      let user:User = {
        name: name,
        age: age,
        email: email,
        imgUrl: avatarUri
      }
      try {
        if(user.imgUrl != ""){
          console.log("uploading image")
          const url = await PostModel.uploadImage(avatarUri)
          user.imgUrl = url
        }
      }catch(err){
        console.log(err)
      }
      console.log(route.params.userID)
      const result = await UserModel.updateUser(user, refreshToken, route.params.userID);
      console.log(result)
      if(result){
        navigation.navigate("PostListPage", {refreshToken: result, userID: route.params.userID})
      }
        
      else
        Alert.alert("Something gone wrong while updating this post. Please try again")
    }
    return(    
      <View style={styles.viewstyle}>
        {isLoading ? <ActivityIndicator size={'large'}/> : 
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder='Enter your Name'
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAge}
            value={age}
            placeholder='Enter your Age'
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder='Enter your Email'
          />
          <View>
            {avatarUri == "url" && <Image style={styles.avatar} source={require('../assets/avatar.png')}/>}
            {avatarUri != "url" && <Image style={styles.avatar} source={{uri: avatarUri}}/>}
            <TouchableOpacity onPress={openGallery}>
              <Ionicons name={"image"} style={styles.galleryButton} size={50}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <Ionicons name={"camera"} style={styles.cameraButton} size={50}/>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => onSave(refreshToken)}>
              <Text style={styles.button}>SAVE</Text>
            </TouchableOpacity>
          </View>
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
      borderRadius: 100
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
    },
    viewstyle: {
        flex: 1,
    }
})

export default PostAddPage;