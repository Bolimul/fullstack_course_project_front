import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [txt, setText] = useState("Welcome!!!")
  const text = () => {
    setText("to SCE!")
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {setText("Hello World!!!")}}>
        <Image style={styles.image}source={require('./assets/icon.png')}/>
      </TouchableOpacity>
      <Text style={styles.title} onPress={text}>{txt}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100
  }
});
