import { useContext,useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from "./constants/LoadingScreen";


import ResetScreen from './screens/ResetScreen'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import CustomHeader from './constants/customheader';
import CustomHeader1 from './constants/CustomHeader1';
import EmailVerificationScreen from './screens/EmailVerification';

const Stack = createNativeStackNavigator();


function AuthStack() {

 
  return (
    <SafeAreaView style={{ flex: 1 }} >
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: Colors.primary100 }, // Use 'cardStyle' for the content background
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => <CustomHeader /> }} />
  
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />

      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} options={{ headerShown: false }} />     

      <Stack.Screen name="Reset" component={ResetScreen} options={{ headerShown: false }} />

    </Stack.Navigator>

    </SafeAreaView>
  );
  
  
}

console.log(LoginScreen);

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ header: () => <CustomHeader1 /> }}
            />
      
    </Stack.Navigator>
    </SafeAreaView>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}



function Root(){

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function loadAppData() {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken) {
          authCtx.authenticate(storedToken);
        }

        // Simulate additional loading (replace with your actual loading logic)
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsLoadingComplete(true);
      } catch (error) {
        console.error('Error loading app data:', error);
        setIsLoadingComplete(true); // In case of an error, still mark loading as complete
      }
    }

    loadAppData();
  }, [authCtx]);


   if(!isLoadingComplete){
    
        return <LoadingScreen />;
      }

      return <Navigation />; 
     
}


export default function App() {

  


  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>

        <Root />
        
      </AuthContextProvider>
    </>
  );
}