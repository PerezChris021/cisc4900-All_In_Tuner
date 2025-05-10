import React from 'react';
import "react-native-gesture-handler";
import { StyleSheet, Text, View} from 'react-native';
import {useState , useEffect} from 'react';
import { Buffer } from 'buffer';
import {StatusBar} from "expo-status-bar";
import Naviagtion from "./Navigation";
import useMicrophonePermission from './components/MicrophonePermission';
global.Buffer = Buffer;

export default function App() {
  /*const hasMicrophonePermission = useMicrophonePermission();

  if (hasMicrophonePermission === null){
      return(
        <View style={styles.container}>
          <Text>---Requesting Microphone Permission...---</Text>
        </View>
      );
  }

  if (hasMicrophonePermission === false){
    return(
      <View style={styles.container}>
        <Text>---Microphone access denied. Please enable it in Settings. </Text>
      </View>
    );
  }
  */

  return <Naviagtion />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

