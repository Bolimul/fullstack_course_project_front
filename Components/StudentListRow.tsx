import { useState, FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button, TouchableHighlight} from 'react-native';

const StudentListRow: FC<{
    name: string, 
    id:string, 
    imgURL: string, 
    onItemSelected: (id: string) => void
}> = ({name, id, imgURL, onItemSelected}) => {

const onPress = () => {
    onItemSelected(id)
}
  return(
    <TouchableHighlight onPress={onPress}
    underlayColor={'grey'}>
        <View style={styles.listrow}>
            {imgURL == "url" && <Image style={styles.avatar} source={require('../assets/avatar.png')}/>}
            {imgURL != "url" && <Image style={styles.avatar} source={{uri: imgURL}}/>}
            
            <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.id}>{id}</Text>
            </View>
        </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({

  listrow: {
    marginHorizontal: 5,
    flexDirection: 'row',
    elevation: 1,
    borderRadius: 2,
    marginVertical: 1,
    
  },
  avatar: {
    margin: 10,
    height: 100,
    width: 100,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  name: {
    marginBottom: 5,
    fontSize:25,
    fontWeight: 'bold'
  },
  id: {
    marginBottom: 5,
    fontSize:20
  }

});

export default StudentListRow;
