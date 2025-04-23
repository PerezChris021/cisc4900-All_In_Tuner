import {Alert, Button, StyleSheet, View, TouchableOpacity} from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useMetronomeScreen} from './MetronomeScreenOption';
import { useState } from "react";

export default function Settings(){

    const { metronomeType, setMetronomeType } = useMetronomeScreen();

    const [currentTheme, setTheme] = useState('Light');
    const onPress =() => setTheme(currentTheme);

    return (
        <SafeAreaView style = {styles.allContain}>
            <Text style={styles.title}>Tutorial</Text>
            <Button
            title="Info"
            onPress={() => {Alert.alert("Will show Instructions")}}/>
            


            <View style={styles.itemSpacing}>
            <Text style={styles.title}>Choose Metronome Layout</Text>

            <TouchableOpacity
                style={[styles.option, metronomeType === 'slider' && styles.selected]}
                onPress={() => setMetronomeType('slider')}
            >
                <Text style={styles.optionText}>Slider Metronome</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, metronomeType === 'select' && styles.selected]}
                onPress={() => setMetronomeType('select')}
            >
                <Text style={styles.optionText}>Select List Metronome</Text>
             </TouchableOpacity>
            
            </View>

            <View marginTop="50">
                <Text style = {styles.title}>Theme</Text>
            </View>
           
            <View style={styles.container}>
            <Button
            title="Dark"
            color=""
            onPress={() => {Alert.alert("Will change App to Dark theme")}}/>
            
            <Button
            title="Light"
            color=""
            onPress={() => {Alert.alert("Will change App to Light theme")}}/>
            </View>
            

            <View>
            <View style = {styles.itemSpacing}>
                <Text style ={styles.title}>Pitch Adjuster</Text>
            </View>
            <Button 
            title="HZ"
            color=""
            onPress ={ () => Alert.alert("Options for different frequency adjustment")}
            />
            </View>

        </SafeAreaView>
        
        
    )

    
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // or 'flex-start', 'center', 'flex-end', 'space-around', 'space-evenly'
        padding: 1,
        backgroundColor: '',
        
    },
    allContain: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,

    },
    optionText:{
        fontSize:20,
    },

    itemSpacing: {
        marginTop: 50,
        fontSize: 20,
    },

    title: {
        fontSize:25,

    },

    option: { 
        padding: 15, 
        backgroundColor: '#ddd', 
        marginVertical: 10, 
        borderRadius: 10, 
        width: 'auto', 
        alignItems: 'center',
        
    },

    selected: { 
    backgroundColor: '#1DA1F2' 
    },
});