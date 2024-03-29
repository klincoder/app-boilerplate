// Import resources
import React from "react";

// Import custom files
import CustomButton from "./CustomButton";
import CustomAlertModal from "./CustomAlertModal";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import useAlertState from "../hooks/useAlertState";
import useAuthState from "../hooks/useAuthState";
import { tw, alertMsg } from "../config/data";

// Component
function LogoutBtn({ title, styleTitle, styleIcon, styleContainer }) {
  // Define state
  const { handleLogout } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // Debug
  //console.log("Debug logoutBtn: ")

  // FUNCTIONS
  // HANDLE CONFIRM LOGOUT
  const handleConfirmLogout = () => {
    alert.showAlert(alertMsg?.logoutConfirm);
  }; // close fxn

  // Return component
  return (
    <>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        confirmAction={async () => {
          alert.hideAlert();
          await handleLogout();
        }}
      />

      {/** BUTTON CONTAINER */}
      <CustomButton
        isTouchable
        onPress={handleConfirmLogout}
        styleTouchable={[styleContainer, tw`flex-row items-center`]}
      >
        {/** Icon */}
        <CustomIcon
          type="materialIcons"
          name="logout"
          size={24}
          style={[styleIcon, title && tw`mr-2`]}
        />

        {/** Title */}
        {title && (
          <CustomText style={[styleTitle, tw`text-lg text-black font-regular`]}>
            {title}
          </CustomText>
        )}
      </CustomButton>
    </>
  ); // close return
} // close component

// Export
export default LogoutBtn;
