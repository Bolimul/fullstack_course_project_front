import { StyleSheet, View, StatusBar, Text, Button} from 'react-native';
import StudentListPage from './Components/StudentListPage';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FC } from 'react';
import StudentAddPage from './Components/StudentAddPage';
import StudentDetailsPage from './Components/StudentDetailsPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



//const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const StudentListStack = createNativeStackNavigator()

const StudentListScreen: FC = () => {
  return (
    <StudentListStack.Navigator>
      <StudentListStack.Screen name="StudentListPage" component={StudentListPage} options={{title: 'Students List'}}/>
      <StudentListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{title: 'Student Details'}}/>
      <StudentListStack.Screen name="StudentAddPage" component={StudentAddPage} options={{title: 'Add New Student'}}/>
    </StudentListStack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StudentListScreen" component={StudentListScreen} options={{title: 'Students List',  headerShown: false}}/>
        <Tab.Screen name="StudentAddPage" component={StudentAddPage} options={{title: 'Add New Student'}}/>
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
