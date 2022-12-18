// Import resources
import React from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// Component
const KeyboardAvoidWrapper = ({ children }) => {
  // Return component
  return (
    <KeyboardAvoidingView>
      {/** Scroll view */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          {/** Form - children */}
          <View>{children}</View>
          {/** Bottom space */}
          <View style={{ height: 10 }} />
        </>
      </ScrollView>
    </KeyboardAvoidingView>
  ); // close return
}; // close component

// Export
export default KeyboardAvoidWrapper;
