import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function LoadingScreen() {
  const [loading, setLoading] = React.useState(true);

  // Simulate loading for a few seconds
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#10C428" }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../image/img2.png')}
          style={{ width: 105, height: 105, tintColor: 'white' }}
        />
        {loading ? (
          // Add some spacing between the image and the text
          <View style={{ marginTop: 2 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>moodbanao</Text>
        </View>
        
        ) : (
          // Customize your loading screen here
          <Text style={{ color: 'white' }}>Loading complete</Text>
        )}
      </View>
    </View>
  );
}

export default LoadingScreen;
