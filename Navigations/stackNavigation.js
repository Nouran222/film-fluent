import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from '../Utilies/routes';
import Home from '../Pages/Home';
import MovieDetails from '../Pages/MovieDetails';
import DrawerNavigation from './drawerNavigation';

//1-cteate the navigation stack
const stack = createNativeStackNavigator();

//2- add the parent stack.Navigator and put the pages that we need to navigate to them

// In nesting navigation the first thing in the stack is the other navigator that we need 
const StackNavigation = () => {
    return (

        <stack.Navigator>
            <stack.Screen
                name={routes.drawer}
                component={DrawerNavigation}
                options={{
                    // headerShown:false
                    headerTitle: 'Film Fluent',
                    // headerStyle: {
                    //     backgroundColor: 'gray'
                    // },
                    // headerTintColor: 'white',
                    // headerTitleAlign: 'center',
                    // headerTitleStyle:{fontSize:25}
                }}
            ></stack.Screen>
            <stack.Screen
                name={routes.details}
                component={MovieDetails}
            >
            </stack.Screen>

        </stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default StackNavigation;
