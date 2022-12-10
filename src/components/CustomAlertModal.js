// Import resources
import React from "react";
import { View } from "react-native";
import { Dialog } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomDivider from "./CustomDivider";
import CustomText from "./CustomText";
import CustomOverlay from "./CustomOverlay";
import CustomImage from "./CustomImage";
import { appColors, appFonts, appImages } from "../config/data";

// Component
const CustomAlertModal = ({
  isSpinner,
  title,
  visible,
  hideDialog,
  content,
  customContent,
  confirmAction,
  confirmText,
  cancelAction,
  cancelText,
  ...rest
}) => {
  // Return component
  return (
    <>
      {/** If isSpinner */}
      {isSpinner ? (
        <CustomOverlay visible={visible} {...rest}>
          <CustomImage
            image={appImages?.logo}
            resizeMode="cover"
            style={tw`w-15 h-15 rounded-full`}
          />
        </CustomOverlay>
      ) : (
        <Dialog
          {...rest}
          visible={visible}
          onBackdropPress={hideDialog}
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          overlayStyle={tw`rounded-lg`}
        >
          {/** Title */}
          {title && <Dialog.Title title={title} titleStyle={tw`text-2xl`} />}

          {/** Divider */}
          {/* <CustomDivider /> */}

          {/** Content */}
          <View style={tw`p-2`}>
            {/** If customContent */}
            {customContent ? (
              <>{customContent}</>
            ) : (
              <CustomText
                style={[tw`text-lg`, { fontFamily: appFonts?.regular }]}
              >
                {content}
              </CustomText>
            )}
          </View>

          {/** Divider */}
          <CustomDivider />

          {/** Actions */}
          <Dialog.Actions>
            {/** Cancel button */}
            {cancelAction && (
              <Dialog.Button
                title={cancelText || "Cancel"}
                onPress={cancelAction}
                buttonStyle={tw`py-1`}
                titleStyle={[
                  tw`text-base text-[${appColors?.danger}]`,
                  { fontFamily: appFonts?.medium },
                ]}
              />
            )}

            {/** Confirm button */}
            {confirmAction && (
              <Dialog.Button
                title={confirmText || "Confirm"}
                onPress={confirmAction}
                buttonStyle={tw`py-1`}
                titleStyle={[
                  tw`text-base text-[${appColors?.success}]`,
                  { fontFamily: appFonts?.medium },
                ]}
              />
            )}
          </Dialog.Actions>
        </Dialog>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomAlertModal;
