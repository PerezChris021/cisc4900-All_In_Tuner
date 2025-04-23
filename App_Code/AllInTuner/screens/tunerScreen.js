import React from "react";
import { View, Alert, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TunerScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      {/* Header buttons */}
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <Button
            title="Instrument"
            color="black"
            onPress={() => {
              Alert.alert("Will show instruments options");
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Metronome"
            color="black"
            onPress={() => {
              Alert.alert("Will play the metronome from the tuner page");
            }}
          />
        </View>
      </View>

      {/* Tuner display */}
      <View style={styles.tunerContainer}>
        <Text style={styles.tunerText}>🎵 Tuner Placeholder 🎵</Text>
        <Text style={styles.tunerSubtext}>
          (Pitch detection logic goes here)
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  buttonContainer: {
    width: "45%",
  },
  tunerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tunerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tunerSubtext: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },
});
