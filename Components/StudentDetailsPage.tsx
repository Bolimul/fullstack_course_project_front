import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import PostModel, {Post} from '../Model/PostModel';

const StudentDetailsPage: FC<{route: any, navigation: any}> = ({route, navigation}) => {
  const [post, setPost] = useState<Post>({creator_id: '0', post_title: '0', post_text: '0', imgUrl: '0', id: '0'})
  const [isOwner, setOwner] = useState(false)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',async()=>{
      try{
        const post: any = await PostModel.getPost(route.params.id, route.params.refreshToken)
        setPost(post.dispPost)
        navigation.setParams({refreshToken: post.refreshToken}) 
        console.log(post)
        if(post.dispPost.creator_id == route.params.userID)
          setOwner(true)
      }catch(err){
        console.log(err)
      }
      
    })
    return unsubscribe
}, [navigation, route.params])

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
    }
})

export default StudentDetailsPage;