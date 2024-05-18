import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigations/stackNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function App() {
  return (

    //3- wrap the app with Navigation container
    //4- in stack we navigate through button or icon so put the button in the screen.
    //options attribute is used to change the style of the header 

    //nesting navigators
    //wrap the app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackNavigation></StackNavigation>
        {/* <DrawerNavigation></DrawerNavigation> */}
      </NavigationContainer>
    </QueryClientProvider>

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
