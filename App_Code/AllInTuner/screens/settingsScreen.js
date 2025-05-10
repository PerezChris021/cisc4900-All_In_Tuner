import { StyleSheet, View, TouchableOpacity, Button } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMetronomeScreen } from './MetronomeScreenOption';
import { useState } from "react";
import { useTheme } from "../components/ThemeSelection";

export default function Settings() {
    const {toggleTheme} = useTheme();
    const {theme} = useTheme();
    const { metronomeType, setMetronomeType } = useMetronomeScreen();
    const [currentTheme, setTheme] = useState('Light');
    const [showInfo, setShowInfo] = useState(false); // 👈 new state

    const onPress = () => setTheme(currentTheme);

    return (
        <SafeAreaView style={[styles.allContain, {backgroundColor: theme.backgroundColor}]}>
            {!showInfo ? (
                <>
                    <Text style={[styles.title, {color: theme.color}]}>Tutorial</Text>
                    <Button
                        title="Info"
                        onPress={() => setShowInfo(true)} 
                    />

                    <View style={styles.itemSpacing}>
                        <Text style={[styles.title, {color: theme.color}]}>Choose Metronome Layout</Text>

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

                    <View style={styles.itemSpacing}>
                        <Text style={[styles.title, {color: theme.color}]}>Theme</Text>
                    </View>

                    <View style={styles.container}>
                        <Button
                            title="Dark"
                            style={styles.buttonStyle}
                            onPress={() => toggleTheme('dark')}
                        />
                        <Button
                            title="Light"
                            style={styles.buttonStyle}
                            onPress={() => toggleTheme('light')}
                        />
                    </View>
                </>
            ) : (
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        Welcome to the All In Tuner!{"\n\n"}
                        - Use the slider or select box to choose your perfered layout for the metronome.{"\n\n"}
                        - Switch App visual color theme using the Dark & Light Buttons Below.{"\n\n"}
                        - Tap the Tuner or Metronome Tab to start practicing!{"\n\n"}
                        - Tap the Instrument Button on the Tuner Screen and pick your Instrument.{"\n\n"}
                        - Enjoy & Have FUN!!!
                    </Text>
                    <Button title="Close" onPress={() => setShowInfo(false)} />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5,
    },
    allContain: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    optionText: {
        fontSize: 20,
    },
    itemSpacing: {
        marginTop: 50,
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        color: 'white'
    },
    option: {
        padding: 15,
        backgroundColor: '#ddd',
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#1DA1F2',
    },
    buttonStyle: {
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    infoBox: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        marginTop: 40,
        width: '90%',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center',
        fontStyle: 'italic'
    },
});
