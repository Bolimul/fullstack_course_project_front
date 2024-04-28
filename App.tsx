import { StyleSheet, View, StatusBar, Text, Button} from 'react-native';
import PostListPage from './Components/PostListPage';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FC } from 'react';
import StudentAddPage from './Components/StudentAddPage';
import PostDetailsPage from './Components/PostDetailsPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import PostAddPage from './Components/PostAddPage';
import PostEditPage from './Components/PostEditPage';



//const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const StudentListStack = createNativeStackNavigator()

const TestFunctions: FC = () => {
  return(
    <View>
      <Text>PostList</Text>
    </View>
  )
}

const StudentListScreen: FC = () => {
  return (
    <StudentListStack.Navigator>
      <StudentListStack.Screen name="LoginPage" component={LoginPage} options={{title: 'Login'}}/>
      <StudentListStack.Screen name="RegisterPage" component={RegisterPage} options={{title: 'Register'}}/>
      <StudentListStack.Screen name="PostListPage" component={PostListPage} options={{title: 'Post List'}}/>
      <StudentListStack.Screen name="PostEditPage" component={PostEditPage} options={{title: 'Post Edit'}}/>
      <StudentListStack.Screen name="PostDetailsPage" component={PostDetailsPage} options={{title: 'Post Details'}}/>
      <StudentListStack.Screen name="PostAddPage" component={PostAddPage} options={{title: 'Add New Post'}}/>
    </StudentListStack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <StudentListStack.Screen name="StudentListScreen" component={StudentListScreen} options={{title: 'Login', headerShown: false}}/>
        <StudentListStack.Screen name="RegisterPage" component={RegisterPage} options={{title: 'Register'}}/>
      </Tab.Navigator>
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
