import { useState} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import { useRecorder } from "../components/AudioRecorder";
import { analyzePitch } from "../components/PitchDetection";

export default function TunerScreen () {
    const [note, setNote] = useState("");
    const [status, setStatus] = useState("");
    const {permission, startRecording, stopRecording} = useRecorder(async (audioBuffer) =>{
        const results =await analyzePitch(audioBuffer, 44100);
        setNote(results.note);
        setStatus(results.status);
    });
    return (
        <View style={style.container}>
            <Text style={style.text}>
                {permission ? "Microphone Acess Granted": "Requesting Permission..."}
            </Text>
            <Text style={styles.note}>Note: {note}</Text>
            <Text style={styles.status}>{status}</Text>
            <Button title="Start Tuning" onPress={startRecording} />
            <Button title="Stop Tuning" onPress={stopRecording} />
        </View>
    );
}

const styles = StyleSheet.create({
        container: { flex: 1, alignItems:"center", justtifyContent:"center"},
        text: {fontSize: 20},
        note: {fontSize:30, fontWeight:"bold"},
        status: {fontSize:20, marginTop:10}    
});
