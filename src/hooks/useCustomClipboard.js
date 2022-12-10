// Import resources
import React from "react";
import * as Clipboard from "expo-clipboard";

// Import custom files
import useAppSettings from "./useAppSettings";

// Component
const useCustomClipboard = () => {
  // Define app settings
  const { toast } = useAppSettings();

  // Debug
  //console.log("Debug useCustomClipboard: ", address);

  // FUNCTIONS
  // Handle copy to clipboard
  const handleCopyToClipboard = (value) => {
    // If no address
    if (!value) return;
    // Copy string
    Clipboard.setString(value);
    // Alert succ
    toast.success("Copied!");
  }; // close fxn

  // Return component
  return { handleCopyToClipboard }; // close return
}; // close component

// Export
export default useCustomClipboard;
