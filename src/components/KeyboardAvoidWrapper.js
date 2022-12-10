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
          {/** Dismiss keyboard */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/** Form - children */}
            <View>{children}</View>
          </TouchableWithoutFeedback>
          {/** Bottom space */}
          <View style={{ height: 50 }} />
        </>
      </ScrollView>
    </KeyboardAvoidingView>
  ); // close return
}; // close component

// Export
export default KeyboardAvoidWrapper;
