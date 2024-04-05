import { useState, FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import StudentList from './Components/StudentList';


export default function App() {

  return (
    <View style={styles.container}>
      <StudentList />
    </View>
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
