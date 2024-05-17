import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Pages/Home';
import About from './Pages/About';
import MovieDetails from './Pages/MovieDetails';
import { NavigationContainer } from '@react-navigation/native';
import routes from './Utilies/routes';
import StackNavigation from './Navigations/stackNavigation';
import DrawerNavigation from './Navigations/drawerNavigation';



export default function App() {
  return (
    
    //3- wrap the app with Navigation container
    //4- in stack we navigate through button or icon so put the button in the screen.
    //options attribute is used to change the style of the header 

    //nesting navigators
    <NavigationContainer>
      <StackNavigation></StackNavigation>
      {/* <DrawerNavigation></DrawerNavigation> */}
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
