import { useEffect, useState } from "react";
import { Audio } from "expo-av";

export default function useMicrophonePermission() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        console.warn("Microphone permission error:", error);
        setHasPermission(false);
      }
    };

    requestPermission();
  }, []);

  return hasPermission;
}
