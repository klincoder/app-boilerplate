// Import resources
import * as Clipboard from "expo-clipboard";

// Import custom files
import useAlertState from "./useAlertState";

// Component
const useCustomClipboard = () => {
  // Define alert
  const alert = useAlertState();

  // Debug
  //console.log("Debug useCustomClipboard: ", address);

  // FUNCTIONS
  // HANDLE COPY TO CLIPBOARD
  const copy = (val) => {
    // If no address
    if (!val) return;
    Clipboard.setString(val);
    alert.success("Copied!");
  }; // close fxn

  // Return component
  return { copy }; // close return
}; // close component

// Export
export default useCustomClipboard;
