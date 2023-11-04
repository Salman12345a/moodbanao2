import React from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

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
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{ color: 'white' }}
      />
      {/* Customize your loading screen here */}
      
    </View>
  );
}

export default LoadingScreen;