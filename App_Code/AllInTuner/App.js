import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState , useEffect} from 'react';
import {Audio} from 'expo-av';


export default function App() {

  const [permission, setPermission] = useState(null);



  useEffect( () => {
    (async () => {
      const {status} = await Audio.requestPermissionsAsync();
      setPermission(status === 'granted');
    }) ();          }, [] 
  );
  
  return (
    <View style={styles.container}>
      <Text>{permission === null
            ? "Requesting Permission..."
            : permission
            ? "Microphone Acess Granted"
            : "Permission Denied"}
       </Text>
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
});
