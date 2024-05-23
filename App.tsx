import { StyleSheet, View, StatusBar, Text, Button} from 'react-native';
import PostListPage from './Components/PostListPage';
import { EventListenerCallback, NavigationContainer, useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FC, useEffect, useState } from 'react';
import PostDetailsPage from './Components/PostDetailsPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import PostAddPage from './Components/PostAddPage';
import PostEditPage from './Components/PostEditPage';
import UserEditPage from './Components/UserEditPage';
import UserPostsListPage from './Components/UserPostsListPage';

const Tab = createBottomTabNavigator()
const StudentListStack = createNativeStackNavigator()

const StackScreen: FC = () => {
  return (
    <StudentListStack.Navigator>
      <StudentListStack.Screen name="PostListPage" component={PostListPage} options={{title: 'Post List'}}/>
      <StudentListStack.Screen name="PostEditPage" component={PostEditPage} options={{title: 'Post Edit'}}/>
      <StudentListStack.Screen name="PostDetailsPage" component={PostDetailsPage} options={{title: 'Post Details'}}/>
      <StudentListStack.Screen name="PostAddPage" component={PostAddPage} options={{title: 'Add New Post'}}/>
    </StudentListStack.Navigator>
  );
}


const PostAddPageTab: FC = () => {
    return (
      <StudentListStack.Navigator>
        <StudentListStack.Screen name="PostAddPage" component={PostAddPage} options={{title: 'Add New Post'}}/>
      </StudentListStack.Navigator>
    )
}


export default function App() {  

  return (
    <NavigationContainer>
      <StudentListStack.Navigator>
      <StudentListStack.Screen name="LoginPage" component={LoginPage} options={{title: 'Login'}}/>
      <StudentListStack.Screen name="RegisterPage" component={RegisterPage} options={{title: 'Register'}}/>
      <StudentListStack.Screen name="PostListPage" component={PostListPage} options={{title: 'Post List'}}/>
      <StudentListStack.Screen name="PostEditPage" component={PostEditPage} options={{title: 'Post Edit'}}/>
      <StudentListStack.Screen name="PostDetailsPage" component={PostDetailsPage} options={{title: 'Post Details'}}/>
      <StudentListStack.Screen name="PostAddPage" component={PostAddPage} options={{title: 'Add New Post'}}/>
      <StudentListStack.Screen name="UserEditPage" component={UserEditPage} options={{title: 'Personal Data'}}/>
      <StudentListStack.Screen name="UserPostsListPage" component={UserPostsListPage} options={{title: 'User Posts'}}/>
    </StudentListStack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

});
