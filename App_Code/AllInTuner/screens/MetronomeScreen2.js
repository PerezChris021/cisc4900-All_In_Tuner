import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeSelection';

const bpmOptions = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150,
                   160, 170, 180,190, 200, 210, 220, 230, 240, 250,260,270, 280, 290, 300];


//---This is Select List Metronome Option---

const MetronomePage = () => {
  const {theme} = useTheme();
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBpmModal, setShowBpmModal] = useState(false);
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
  };

  const startMetronome = () => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      playClick();
    }, (60 / bpm) * 1000);
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

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={styles.title}> 🎵 Metronome 🎵</Text>

      <Text style={{color: theme.color, fontSize: theme.fontSize}}>{bpm} BPM</Text>

      <View style={styles.bpmControls}>
        <TouchableOpacity
          style={styles.bpmButton}
          onPress={() => setBpm(prev => Math.max(25, prev - 1))}
        >
          <Text style={styles.bpmButtonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bpmSelector}
          onPress={() => setShowBpmModal(true)}
        >
          <Text style={styles.bpmSelectorText}>
               {/*  {bpm}  */} BPM
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bpmButton}
          onPress={() => setBpm(prev => Math.min(300, prev + 1))}
        >
          <Text style={styles.bpmButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Button title={isPlaying ? 'Stop' : 'Start'} onPress={toggleMetronome} />

      <Modal visible={showBpmModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SafeAreaView style={{flex:10}}>
            <FlatList
              data={bpmOptions}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setBpm(item);
                    setShowBpmModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item} BPM</Text>
                </TouchableOpacity>
              )}
            />
            </SafeAreaView>
            <Button title="Close" onPress={() => setShowBpmModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6EC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6B6B',
  },
  bpm: {
    fontSize: 28,
    color: '#333',
    marginBottom: 20,
  },
  bpmControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  bpmButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 30,
  },
  bpmButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  bpmSelector: {
    backgroundColor: '#FFE66D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    height:50,
    width:130,
    
  },
  bpmSelectorText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    
  },

  modalContainer: {
    
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '70%',
  },
  modalItem: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    
  },
  modalItemText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MetronomePage;

