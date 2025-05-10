import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Button,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg, Line, Circle } from "react-native-svg";
import AudioRecord from "react-native-audio-record";
import FFT from "fft.js";
import {
  getNoteFromFrequency,
  getCentsOff,
  getFrequencyFromNoteNumber,
} from "../components/PitchDetection";
import { tuningPresets } from "../components/InstrumentTuningPresets";

const BUFFER_SIZE = 2048;
const SAMPLE_RATE = 44100;

export default function TunerScreen() {
  const [frequency, setFrequency] = useState(null);
  const [note, setNote] = useState("");
  const [cents, setCents] = useState(0);
  const [micStatus, setMicStatus] = useState("Initializing mic...");
  const [isRecording, setIsRecording] = useState(false);

  const firstInstrument = Object.keys(tuningPresets)[0];
  const [selectedInstrument, setSelectedInstrument] = useState(firstInstrument);
  const [showInstrumentList, setShowInstrumentList] = useState(false);

  const audioBuffer = useRef([]);
  const fft = useRef(new FFT(BUFFER_SIZE));

  useEffect(() => {
    requestMicPermission();
    return () => AudioRecord.stop();
  }, []);

  useEffect(() => {
    if (isRecording) {
      AudioRecord.start();
      setMicStatus("Recording...");
    } else {
      AudioRecord.stop();
      setMicStatus("Stopped");
    }
  }, [isRecording]);

  const requestMicPermission = async () => {
    const options = {
      sampleRate: SAMPLE_RATE,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: "tuner.wav",
    };

    AudioRecord.init(options);

    AudioRecord.on("data", (data) => {
      const buffer = Buffer.from(data, "base64");
      const samples = new Int16Array(
        buffer.buffer,
        buffer.byteOffset,
        buffer.length / Int16Array.BYTES_PER_ELEMENT
      );
      const normalized = Float32Array.from(samples, (s) => s / 32768);

      audioBuffer.current = [...audioBuffer.current, ...normalized];

      if (audioBuffer.current.length >= BUFFER_SIZE) {
        const chunk = audioBuffer.current.slice(0, BUFFER_SIZE);
        audioBuffer.current = audioBuffer.current.slice(BUFFER_SIZE);
        processAudioData(chunk);
      }
    });

    setIsRecording(true);
  };

  const processAudioData = (audioData) => {
    const output = fft.current.createComplexArray();
    fft.current.realTransform(output, audioData);
    fft.current.completeSpectrum(output);

    const peakFrequency = getPeakFrequency(output);
    if (!peakFrequency || isNaN(peakFrequency) || peakFrequency < 40 || peakFrequency > 5000) return;

    const transpositionFactor = tuningPresets[selectedInstrument]?.transpositionFactor || 1;
    const transposedFreq = peakFrequency * transpositionFactor;

    const { noteName, noteNumber } = getNoteFromFrequency(transposedFreq);
    const targetFreq = getFrequencyFromNoteNumber(noteNumber);
    const offset = getCentsOff(transposedFreq, targetFreq);

    setFrequency(peakFrequency);
    setNote(noteName);
    setCents(offset);
  };

  const getPeakFrequency = (output) => {
    let peakIndex = 0;
    let peakAmplitude = 0;

    for (let i = 0; i < output.length / 2; i += 2) {
      const real = output[i];
      const imag = output[i + 1];
      const mag = Math.sqrt(real * real + imag * imag);
      if (mag > peakAmplitude) {
        peakAmplitude = mag;
        peakIndex = i / 2;
      }
    }

    return (peakIndex * SAMPLE_RATE) / BUFFER_SIZE;
  };

  const getNeedleAngle = (cents) => {
    const clamp = Math.max(-50, Math.min(50, cents));
    return (clamp / 50) * 45;
  };

  const angle = getNeedleAngle(cents);

  const toggleInstrumentList = () => {
    setShowInstrumentList((prev) => !prev);
  };

  const selectInstrument = (instrumentName) => {
    setSelectedInstrument(instrumentName);
    setShowInstrumentList(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        {/* Instrument Selector */}
        <View style={{ position: "relative", width: "45%" }}>
          <TouchableOpacity style={styles.button} onPress={toggleInstrumentList}>
            <Text style={styles.buttonText}>Instrument</Text>
          </TouchableOpacity>
          {showInstrumentList && (
            <FlatList
              data={Object.keys(tuningPresets)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectInstrument(item)}
                  style={styles.instrumentItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              style={styles.instrumentList}
              nestedScrollEnabled
            />
          )}
        </View>

        
        
      </View>

      <View style={styles.tunerContainer}>
        <Text style={styles.status}>{micStatus}</Text>

        <Svg height="200" width="200">
          <Circle cx="100" cy="100" r="90" stroke="#ccc" strokeWidth="5" fill="none" />
          <Line
            x1="100"
            y1="100"
            x2={100 - 70 * Math.sin((angle * Math.PI) / 180)}
            y2={100 - 70 * Math.cos((angle * Math.PI) / 180)}
            stroke="red"
            strokeWidth="4"
          />
        </Svg>

        <Text style={styles.note}>{note}</Text>
        <Text style={styles.freq}>
          {frequency ? frequency.toFixed(1) + " Hz" : "Detecting..."}
        </Text>
        <Text style={styles.cents}>
          {Math.abs(cents)} cents {cents > 0 ? "sharp" : cents < 0 ? "flat" : "in tune"}
        </Text>
        <Text style={styles.instrumentText}>
          {selectedInstrument.replace(/[-]/g, " ")} (
          {tuningPresets[selectedInstrument].transposition})
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    zIndex: 10,
    elevation: 10,
  },
  buttonContainer: {
    width: "45%",
  },
  button: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  instrumentList: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    maxHeight: 200,
    zIndex: 20,
    elevation: 20,
  },
  instrumentItem: {
    padding: 10,
  },
  tunerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  status: { fontSize: 14, color: "gray" },
  note: { fontSize: 32, fontWeight: "bold", marginTop: 20 },
  freq: { fontSize: 18, marginTop: 10 },
  cents: { fontSize: 16, color: "gray", marginTop: 5 },
  instrumentText: { fontSize: 18, marginTop: 10, color: "gray" },
});
