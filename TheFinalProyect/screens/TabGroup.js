import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Search from './Search';
import Settings from './Settings';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import DrawerGroup from './DrawerGroup'; 

const Tab = createBottomTabNavigator();

export default function TabGroup() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused, size }) => {
                let iconComponent;
                if (route.name === "Home") {
                    iconComponent = focused ? (
                        <Foundation name="home" size={size} color="black" />
                    ) : (
                        <Foundation name="home" size={size} color={color} />
                    );
                } else if (route.name === "Profile") {
                    iconComponent = focused ? (
                        <Ionicons name="person" size={size} color="black" />
                    ) : (
                        <Ionicons name="person-outline" size={size} color={color} />
                    );
                } else if (route.name === "Search") {
                    iconComponent = focused ? (
                        <Ionicons name="search" size={size} color="black" />
                    ) : (
                        <Ionicons name="search-outline" size={size} color={color} />
                    );
                } else if (route.name === "Settings") {
                    iconComponent = focused ? (
                        <Ionicons name="cog-outline" size={size} color="black" />
                    ) : (
                        <Ionicons name="cog-outline" size={size} color={color} />
                    );
                }
                return iconComponent;
            },
        })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    //headerShown: false,
                    
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    //headerShown: false,
                    
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    //headerShown: false,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    //headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}
