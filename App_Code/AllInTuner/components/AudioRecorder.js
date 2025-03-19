import { useState, useEffect} from "react";
import {Audio} from "expo-av";

export const useRecorder = (onAudioDate) => {
    const [recording, setRecording] = useState(null);
    const [permission, setPermission] = useState(null);


    useEffect(()=> {
      (async () => {
        const {status} = await Audio.requestPermissionsAsync();
        setPermission(status === "granted");
        }) ();
    }, []);

    const startRecording = async () => {
    if (!permission) return ;

        try{
        const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets);
        setRecording (recording);

        const interval = setInterval(async () =>{
            const {sound,status} = await recording.getStatusAsync();
            if (status.isRecording){
                const audioBuffer = await recording.getURI();
                onAudioDate(audioBuffer);
            }
        }, 500); //500ms process time
        return () => clearInterval(interval);
        }catch (error){
        console.error("");
        }
    };

    const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    setRcording(null);
    };

    return {permission, startRecording, stopRecording};

};
