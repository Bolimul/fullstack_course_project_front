import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import StudentModel from '../Model/StudentModel';

const StudentDetailsPage: FC<{route: any, navigation: any}> = ({route, navigation}) => {
  const student = StudentModel.getStudent(route.params.id)
  useEffect(() => {
    navigation.setOptions(
        {
            title: student?.name,
            right: () => (
              <Button
              onPress={() => navigation.navigate('StudentAddPage')}
              title="Edit"
              />
            )
          }
    )
}, [])
    return(    
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/avatar.png')}/>
        <Text style={styles.input}>{student?.name}</Text>
        <Text style={styles.input}>{student?.id}</Text>
        <Text style={styles.input}>{student?.imgUrl}</Text>  
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

export default StudentDetailsPage;