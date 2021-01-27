import React from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import Coin from '../assets/icons/coin.png';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import GameHistory from '../pages/GameHistory/index';
import Account from '../pages/Account/index';

import CartRoute from './cart.routes';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function HomeRoutes ({ navigation }) {

    function goToGames() { navigation.navigate('Games') }

    return (
        <>
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconActive;

                        if (route.name === 'Home') {                        
                            return focused ? (
                                iconActive = (
                                    <>
                                        <View style={{ 
                                            position: 'absolute', 
                                            backgroundColor: '#B5C401', 
                                            width: 27, 
                                            height: 4, 
                                            top: 0, 
                                            borderRadius: 10
                                        }} />   
                                        <Ionicons name='home-outline' size={30} color={color} />

                                        <Text style={{
                                            fontSize: 14,
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            color: '#707070',
                                        }}>Home</Text>
                                    </>
                                )
                            )
                            : 
                            <>
                                <Ionicons name='home-outline' size={30} color={color} />
                                <Text style={{fontSize: 14, fontStyle: 'italic', color: '#C1C1C1' }}>Home</Text>
                            </>
                        } 

                        if (route.name === 'Account') {
                            /* iconName = focused ? 'person-outline' : 'person-outline'; */
                            return focused ? (
                                iconActive = (
                                    <>
                                        <View style={{ 
                                            position: 'absolute', 
                                            backgroundColor: '#B5C401', 
                                            width: 27, 
                                            height: 4, 
                                            top: 0, 
                                            borderRadius: 10
                                        }} />   
                                        <Ionicons name='person-outline' size={30} color={color} />
                                        <Text style={{
                                            fontSize: 14,
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            color: '#707070',
                                        }}>Account</Text>
                                    </>
                                )
                            )
                            : 
                            <>
                                <Ionicons name='person-outline' size={30} color={color} />
                                <Text style={{fontSize: 14, fontStyle: 'italic', color: '#C1C1C1' }}>Account</Text>
                            </>
                        }

                        if (route.name === 'Games') {
                            /* iconName = focused ? 'person-outline' : 'person-outline'; */
                            return (
                                iconActive = (
                                    <>
                                        <TouchableOpacity onPress={goToGames} style={{ 
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute', 
                                            backgroundColor: '#B5C401', 
                                            width: 100, 
                                            height: 100, 
                                            top: -40, 
                                            borderRadius: 100,
                                            borderWidth: 5,
                                            borderColor: '#fff',
                                        }} >
                                            <Image 
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    tintColor: '#fff',
                                                    position: 'relative',
                                                }} 
                                                source={Coin} 
                                            />
                                            <AntDesign 
                                                style={{ 
                                                    backgroundColor: '#B5C401',
                                                    position: 'absolute',
                                                    right: 14,
                                                    bottom: 16,
                                                    borderRadius: 50
                                                }} 
                                                name="pluscircleo" size={24} color="#fff" 
                                            />
                                        </TouchableOpacity>
                                    </>
                                )
                            )
                        }
                    },
                })}
                tabBarOptions={{
                    showLabel: false,
                    inactiveTintColor: '#C1C1C1',
                    activeTintColor: '#B5C401',
                    labelStyle: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                    },

                    style: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: 70,
                        backgroundColor: "white",
                        marginBottom: 0,

                    },
                }}
            >
                
                <Tab.Screen name="Home" component={GameHistory} />
                <Tab.Screen name="Games" component={CartRoute} options={{ title: '' }} />
                <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>

            
        </>
    )
}