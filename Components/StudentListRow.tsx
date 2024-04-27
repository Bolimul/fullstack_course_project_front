import { useState, FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button, TouchableHighlight} from 'react-native';

const StudentListRow: FC<{
    post_title: string, 
    post_text:string, 
    imgURL: string,
    id: string,
    onItemSelected: (id: string) => void
}> = ({post_title, post_text, imgURL, id, onItemSelected}) => {

const onPress = () => {
    onItemSelected(id)
}
  return(
    <TouchableHighlight onPress={onPress}
    underlayColor={'grey'}>
        <View style={styles.listrow}>
            <Text style={styles.name}>{post_title}</Text>
            {imgURL == "url" && <Image style={styles.post_image} source={require('../assets/dish example.jpg')}/>}
            {imgURL != "url" && <Image style={styles.post_image} source={{uri: imgURL}}/>}
            <Text numberOfLines={2} style={styles.id}>{post_text}</Text>  
        </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({

  listrow: {
    marginHorizontal: 5,
    flexDirection: 'column',
    elevation: 1,
    borderRadius: 2,
    marginVertical: 1,
    alignItems: 'center',
    backgroundColor: 'bisque'
  },
  post_image: {
    margin: 10,
    height: 200,
    width: 200,
  },
  name: {
    marginBottom: 5,
    fontSize:25,
    fontWeight: 'bold'
  },
  id: {
    marginBottom: 5,
    fontSize:20,
    borderColor: 'black',
  },
  cont: {
    marginBottom: 5,
    fontSize:20,
    borderColor: 'black',
    alignSelf: 'flex-start'
  }

});

export default StudentListRow;
