// Import resources
import React from "react";
import { View } from "react-native";
import { Dialog } from "@rneui/themed";

// Import custom files
import CustomDivider from "./CustomDivider";
import CustomText from "./CustomText";
import CustomOverlay from "./CustomOverlay";
import { tw } from "../config/data";

// Component
const CustomAlertModal = ({
  isSpinner,
  isCustomContent,
  title,
  visible,
  hideDialog,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  styleConfirmTitle,
  styleCancelTitle,
  ...rest
}) => {
  // Return component
  return (
    <>
      {/** If isSpinner */}
      {isSpinner ? (
        <CustomOverlay visible={visible} {...rest}>
          <Dialog.Loading />
        </CustomOverlay>
      ) : (
        <Dialog
          {...rest}
          visible={visible}
          onBackdropPress={hideDialog}
          backdropStyle={tw`bg-black opacity-90`}
          overlayStyle={tw`rounded-lg`}
        >
          {/** Title */}
          {title && <Dialog.Title title={title} titleStyle={tw`text-2xl`} />}

          {/** Content */}
          <View style={tw`p-2`}>
            {/** If customContent */}
            {isCustomContent ? (
              <>{content}</>
            ) : (
              <CustomText style={tw`text-base font-medium`}>
                {content}
              </CustomText>
            )}
          </View>

          {/** Divider */}
          <CustomDivider />

          {/** Actions */}
          <Dialog.Actions>
            {/** Confirm button */}
            {onConfirm && (
              <Dialog.Button
                title={confirmText || "Confirm"}
                onPress={onConfirm}
                buttonStyle={tw`py-1`}
                titleStyle={[
                  styleConfirmTitle,
                  tw`text-base text-success font-medium`,
                ]}
              />
            )}

            {/** Cancel button */}
            {onCancel && (
              <Dialog.Button
                title={cancelText || "Cancel"}
                onPress={onCancel}
                buttonStyle={tw`py-1`}
                titleStyle={[
                  styleCancelTitle,
                  tw`text-base text-danger font-medium`,
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
