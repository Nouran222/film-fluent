import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import routes from '../Utilies/routes';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Favorites from '../Pages/Favorites';


const drawer = createDrawerNavigator();
const DrawerNavigation = () => {


    return (
        <drawer.Navigator>
            <drawer.Screen
                name={routes.home}
                component={Home}
            >
            </drawer.Screen>
            <drawer.Screen
                name={routes.about}
                component={About}
            >
            </drawer.Screen>
            <drawer.Screen
                name={routes.favorites}
                component={Favorites}
            >
            </drawer.Screen>
        </drawer.Navigator>
    );
}

const styles = StyleSheet.create({})

export default DrawerNavigation;
