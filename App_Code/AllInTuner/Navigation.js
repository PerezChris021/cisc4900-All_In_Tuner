import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator}  from '@react-navigation/bottom-tabs'
//import MetronomeScreen from "./screens/TunerScreen";
import TunerScreen from './screens/TunerScreen';
//Casting error needs to be addressed later on
import SettingsScreen from './screens/SettingsScreen';
import MetronomeScreen from './screens/MetronomeScreen';
import MetronomeScreen2 from './screens/MetronomeScreen2';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import {Ionicon} from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MetronomeScreenProvider, useMetronomeScreen } from './screens/MetronomeScreenOption';


const Tab = createBottomTabNavigator();

function MetronomeWrapper() {
    const { metronomeType } = useMetronomeScreen();

    return metronomeType === 'slider' ? <MetronomeScreen /> : <MetronomeScreen2 />;
}


function TabGroup(){
    return (
        <Tab.Navigator
            screenOptions={ ({route, navigation}) => ({
                tabBarIcon: ({color, focused, size}) => {
                    let iconName;
                    if (route.name === "Tuner"){
                        iconName = focused ? "home" : "" ;
                    }else if ( route.name === "Settings") {
                        iconName = focused ? "Settings" : "" ;
                    }else if (route.name === "Metronome"){
                        iconName = focused ? "Metronome" : "";
                    }

                    return < Ionicon name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor : "#1DA1F2"
            })}
        
        >
            
            <Tab.Screen
            name="Metronome" component={MetronomeWrapper}

            options = {{ tabBarIcon: () => <MaterialCommunityIcons name="metronome" size={28} color="black" />}}
            />

            <Tab.Screen
            name="Tuner" component={TunerScreen}
            options={ {tabBarIcon: () => <AntDesign name="home" size={28} color="black" />}}
            />


            <Tab.Screen
            name="Settings" component={SettingsScreen}
            options={{tabBarIcon: () => <Feather name="settings" size={28} color="black" />}}
            />
        </Tab.Navigator>
    )
}
export default function Navigation(){

    return (
        <MetronomeScreenProvider>
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
        </MetronomeScreenProvider>
    )
}