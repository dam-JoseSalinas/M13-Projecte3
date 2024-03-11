import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function StackGroup() {
}

export default function DrawerGroup() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="StackGroup" component={StackGroup}/>
        </Drawer.Navigator>
    );
}
