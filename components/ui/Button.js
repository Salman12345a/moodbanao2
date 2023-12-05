import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

// Custom Button component
function Button({ children, onPress }) {
  // Styling for the button
  return (
    <Pressable
      // Apply styles based on the pressed state
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        {/* Text inside the button */}
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

// Styles for the Button component
const styles = StyleSheet.create({
  // Base styles for the button
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgb(16,196,40)",
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  // Styles applied when the button is pressed
  pressed: {
    opacity: 0.7,
  },
  // Text styles inside the button
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
