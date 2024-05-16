import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Pages/Home';
import About from './Pages/About';
import MovieDetails from './Pages/MovieDetails';
import { NavigationContainer } from '@react-navigation/native';
import routes from './Utilies/routes';

//1-cteate the navigation stack
const stack = createNativeStackNavigator();

export default function App() {
  return (
    //2- add the parent stack.Navigator and put the pages that we need to navigate to them
    //3- wrap the app with Navigation container
    //4- in stack we navigate through button or icon so put the button in the screen.
    //options attribute is used to change the style of the header 
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
        name={routes.home}
        component={Home}
        options={{
          headerTitle:'Film Fluent',
          headerStyle:{
            backgroundColor:'gray'
          },
          headerTintColor:'white',
          headerTitleAlign:'center',
          // headerTitleStyle:{fontSize:25}
        }}
        ></stack.Screen>
        <stack.Screen name={routes.about} component={About}></stack.Screen>
        <stack.Screen name={routes.details} component={MovieDetails}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
