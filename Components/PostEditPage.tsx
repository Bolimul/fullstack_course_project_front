import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import StudentModel, { User } from '../Model/UserModel';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostModel, { Post } from '../Model/PostModel';


const PostAddPage: FC<{route: any, navigation: any}> = ({navigation, route}) => {

    const [title, onChangeTitle] = useState('');
    const [txt, onChangeTxt] = useState('');
    const [avatarUri, setAvatarUri] = useState('url');
    const [id, setPostId] = useState('')

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
    const getPost = async() => {
      try{
        const post: any = await PostModel.getPost(route.params.id, route.params.refreshToken)
        navigation.setParams({refreshToken: post.refreshToken})
        const solidPost: Post = post.dispPost
        console.log(solidPost)
        console.log(route.params.userID)
        setAvatarUri(solidPost.imgUrl)
        onChangeTitle(solidPost.post_title)
        onChangeTxt(solidPost.post_text)
        setPostId(solidPost.id)
      }catch(err){
        console.log(err)
      }
    }
    useEffect(() => {
      askPermission()
      getPost()
    }, [])
  
    const onCancel = () => {
      navigation.navigate("StudentListPage")
    }
    const onSave = async() => {
      let post:Post = {
        creator_id: route.params.userID,
        post_title: title,
        post_text: txt,
        imgUrl: "url",
        id: id
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
      const result = await PostModel.updatePost(post, route.params.refreshToken, post.id);
      console.log(result)
      if(result){
        navigation.setParams({refreshToken: result.refreshToken})
        navigation.setParams({userID: route.params.userID})
        navigation.navigate("StudentDetailsPage", {refreshToken: result.refreshToken, userID: route.params.userID, id: post.id})
      }
        
      else
        Alert.alert("Something gone wrong while updating this post. Please try again")
    }
    return(    
    <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder='Enter your Title'
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
        
        
        <TextInput
          style={styles.input}
          onChangeText={onChangeTxt}
          value={txt}
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
      borderRadius: 100
    },
    cameraButton: {
      position: 'absolute',
      bottom: -10,
      left: 100,
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