import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';



//---This is the Slider Metronome Option---


const MetronomePage = () => {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef(null);
  const soundRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadSound();
    return () => unloadSound();
  }, []);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/metronome-SoundEffect1.wav')
    );
    soundRef.current = sound;
  };

  const unloadSound = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }
  };

  const playClick = async () => {
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.6,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startMetronome = () => {
    setIsPlaying(true);
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const toggleMetronome = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        playClick();
      }, (60 / bpm) * 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [bpm, isPlaying]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Metronome 🎵</Text>
      <Text style={styles.bpm}>{bpm} BPM</Text>

      <Animated.View
        style={[
          styles.pulseCircle,
          { transform: [{ scale: scaleAnim }] },
        ]}
      />

      <Slider
        style={styles.slider}
        minimumValue={25}
        maximumValue={300}
        value={bpm}
        step={1}
        minimumTrackTintColor="#269627"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#269627"
        onValueChange={setBpm}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={isPlaying ? 'Stop' : 'Start'}
          color={isPlaying ? '#f87171' : '#34d399'}
          onPress={toggleMetronome}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf2f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7c3aed',
  },
  bpm: {
    fontSize: 28,
    marginBottom: 20,
    color: '#6b7280',
  },
  pulseCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#269627',
    shadowColor: '#269627',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    marginBottom: 40,
  },
  slider: {
    width: '80%',
    marginBottom: 30,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
});

export default MetronomePage;
