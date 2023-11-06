import React from 'react';
import { View, Text, StyleSheet,Pressable,Linking ,Image} from 'react-native';

function SimpleApp() {

  const openGmail = () => {
    const yourEmail = 'moodbanao186org@gmail.com';
    const subject = 'Updating Details or Any other Query...';

    Linking.openURL(`mailto:${yourEmail}?subject=${encodeURIComponent(subject)}`);
   
  };

  return (
    <View style={styles.container}>

      <Image source={require('../image/help.jpg')} style={styles.helpicon} />
      <Text style={styles.text}>
   
        {'\n'}{'Hi,If you want to update login details just email us,with your registered email.'}
        {'\n'} {''}
        {'\n'}{'Thank you for choosing MoodBanao,and rest assured that your information is in safe hands. If you have any questions or concerns, feel free to reach out to our support team anytime.'}
        {'\n'} {''}
        {'\n'}{'Your security and satisfaction are our top priorities.'}
        {'\n'} {''}
        {'\n'}{'Best regards,'}
        {'\n'}{'"The MoodBanao Team"'}
      
      </Text>    

      <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={openGmail}
    >
      <View>
        <Text style={styles.buttonText}>Email Us!</Text>
      </View>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgb(16,196,40)',
    resizeMode:'cover'
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    lineHeight: 24,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    margin: 10,
  },

  button: {
    paddingVertical: 6,
    marginTop:40,
    paddingHorizontal: 12,
    backgroundColor:'red',
    borderRadius:10,
    shadowColor:'black'
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
  },

  helpicon:{
    height:105,
    width:125
  }
});

export default SimpleApp;
