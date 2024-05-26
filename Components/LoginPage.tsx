import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import LoginRegistrationModel from '../Model/LoginRegistrationModel';
import LoginRegisterDropdownMenu from '../Components/LoginRegisterDropdownMenu'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';


const LoginPage: FC<{navigation: any}> = ({navigation}) => {

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId: "904531963231-c4b8cdq9ua6nb2l3ln5h1i3etl087nef.apps.googleusercontent.com"
    })

    const signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const b = await GoogleSignin.hasPreviousSignIn();
        if(b == true)
          {
           //await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
          }
          
        const userInfo = await GoogleSignin.signIn();
        const idToken = userInfo.idToken
        const result: any = await LoginRegistrationModel.googleSignin(idToken)
        console.log(result)
        if(result != null){
          navigation.navigate('PostListPage',{accessToken: result.accessToken, refreshToken: result.refreshToken, userID: result.userID})
        }else{
          Alert.alert("Login Error:", "Your email or password are incorrect")
        }
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };
  
    const onSave = async() => {
      const user = {
        email: email,
        password: password,
      }
      const result: any = await LoginRegistrationModel.login(user.email, user.password)
      if(result != null){
        navigation.navigate('PostListPage',{accessToken: result.accessToken, refreshToken: result.refreshToken, userID: result.userID})
      }else{
        Alert.alert("Login Error:", "Your email or password are incorrect")
      }
          
    }
    return(    
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Your email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          placeholder='Your password'
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.button}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("RegisterPage")}}>
            <Text style={styles.button}>REGISTER</Text>
          </TouchableOpacity>
        </View>
        <GoogleSigninButton style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        />
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
    googleButton: {
      alignSelf: 'center'
    }
})

export default LoginPage;