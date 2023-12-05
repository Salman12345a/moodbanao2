import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

// Custom FlatButton component
function FlatButton({ children, onPress }) {
  // Styling for the flat button
  return (
    <Pressable
      // Apply styles based on the pressed state
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        {/* Text inside the flat button */}
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

// Styles for the FlatButton component
const styles = StyleSheet.create({
  // Base styles for the flat button
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  // Styles applied when the button is pressed
  pressed: {
    opacity: 0.7,
  },
  // Text styles inside the flat button
  buttonText: {
    textAlign: 'center',
    color: "black",
  },
});
