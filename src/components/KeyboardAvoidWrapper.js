// Import resources
import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

// Import custom files
import { tw } from "../config/data";

// Component
const KeyboardAvoidWrapper = ({ children }) => {
  // Return component
  return (
    <KeyboardAvoidingView>
      {/** Scroll view */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <>{children}</>
      </ScrollView>
    </KeyboardAvoidingView>
  ); // close return
}; // close component

// Export
export default KeyboardAvoidWrapper;
