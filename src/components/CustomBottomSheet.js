// Import resources
import React, { useMemo, forwardRef, useCallback } from "react";
import tw from "twrnc";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

// Import custom files
import { appColors, screenInfo } from "../config/data";

// Component
const CustomBottomSheet = forwardRef(
  ({ snapPoints, onPressBackdrop, children, ...rest }, ref) => {
    // Define variables
    const snapPointsDefault = useMemo(() => ["40%"], []);
    snapPoints = snapPoints || snapPointsDefault;

    // Debug
    //console.log("Debug customBottomSheet: ",)

    // Return component
    return (
      <BottomSheetModal
        {...rest}
        index={0}
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={tw`px-4 rounded-t-xl`}
        handleStyle={tw`mb-3`}
        backdropComponent={useCallback(
          (props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              onPress={onPressBackdrop}
            />
          ),
          []
        )}
      >
        {children}
      </BottomSheetModal>
    ); // close return
  }
); // close component

// Export
export default CustomBottomSheet;
