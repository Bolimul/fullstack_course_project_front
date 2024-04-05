import { useState, FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';

export default function StudentAddPage() {

    const [name, onChangeName] = useState('');
    const [id, onChangeID] = useState('');
    const [address, onChangeAddress] = useState('');
  
    const onCancel = () => {
      Alert.alert("Cancel")
    }
    const onSave = () => {
      Alert.alert("Save")
    }
    return(    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/avatar.png')}/>
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