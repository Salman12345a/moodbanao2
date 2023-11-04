import { useState } from 'react';
import { Alert, StyleSheet, View,ImageBackground,SafeAreaView, ScrollView ,Text,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (

  
    <ScrollView contentContainerStyle={styles.container1}>

      
 
    <ImageBackground
    source={require('../../image/img1.jpg')}
    style={styles.backgroundImage}
    
  >
    

    <View style={styles.authContent}>

 
   
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
       <View style={styles.container2}>
      <View style={styles.buttons}>

      <FlatButton onPress={() => navigation.navigate('Reset')}>
          {'Reset'}
        </FlatButton>

        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>

       
      </View>
    </View>

    </View>
   
    </ImageBackground>

    </ScrollView>
 
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 370,
    marginBottom:100,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 15,
   
  },

  b1:{
    height:20,
    width:20,
    justifyContent:'center',
    alignItems:'center'
    
  },

  container1: {
  
   
    justifyContent: 'center',
    padding: -1,
  },

  backgroundImage:{

    marginTop:-19
  },

  backmain: {
  
    backgroundColor: "white",


  },

  buttons: {
    marginTop: 4,
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Space between buttons
  },

  container: {
    flex: 1,
  },


  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});