import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import StudentModel, { Student } from '../Model/StudentModel';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';


const StudentAddPage: FC<{navigation: any}> = ({navigation}) => {

    const [name, onChangeName] = useState('');
    const [id, onChangeID] = useState('');
    const [address, onChangeAddress] = useState('');
    const [avatarUri, setAvatarUri] = useState('');

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

    useEffect(() => {
      askPermission()
    }, [])
  
    const onCancel = () => {
      navigation.navigate("StudentListPage")
    }
    const onSave = async() => {
      console.log(avatarUri)
      let student:Student = {
        name: name,
        id: id,
        imgUrl: "url"
      }
      try {
        if(avatarUri != ""){
          console.log("uploading image")
          const url = await StudentModel.uploadImage(avatarUri)
          student.imgUrl = url
        }
      }catch(err){
        console.log(err)
      }
      StudentModel.addStudent(student);
      navigation.navigate("StudentListPage")
    }
    return(    
    <View style={styles.container}>
      <View>
        {avatarUri == "" && <Image style={styles.avatar} source={require('../assets/avatar.png')}/>}
        {avatarUri != "" && <Image style={styles.avatar} source={{uri: avatarUri}}/>}
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name={"image"} style={styles.cameraButton} size={50}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera}>
          <Ionicons name={"camera"} style={styles.cameraButton} size={50}/>
        </TouchableOpacity>
        
      </View>
        
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder='Enter your name'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeID}
          value={id}
          placeholder='Enter your ID'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeAddress}
          value={address}
          placeholder='Enter your address'
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

export default StudentAddPage;