import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile'
import Search from './Search'
import Settings from './Settings'

const Tab = createBottomTabNavigator();

export default function TabGroup() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="profile" component={Profile} options={{ headerShown: false }} />
            <Tab.Screen name="search" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="settings" component={Settings} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
