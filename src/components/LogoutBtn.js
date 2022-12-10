// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import CustomButton from "./CustomButton";
import CustomAlertModal from "./CustomAlertModal";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import useCustomAlertState from "../hooks/useCustomAlertState";
import { useAuthContext } from "../context/AuthContext";
import { alertMsg, appColors, appFonts } from "../config/data";

// Component
function LogoutBtn({ title, styleTitle, styleIcon, styleContainer }) {
  // Define auth context
  const { handleLogout } = useAuthContext();

  // Define alert
  const alert = useCustomAlertState();

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
        styleTouchable={[tw`flex-row items-center`, styleContainer]}
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
          <CustomText
            style={[
              styleTitle,
              tw`text-lg text-[${appColors?.black}]`,
              { fontFamily: appFonts?.regular },
            ]}
          >
            {title}
          </CustomText>
        )}
      </CustomButton>
    </>
  ); // close return
} // close component

// Export
export default LogoutBtn;
