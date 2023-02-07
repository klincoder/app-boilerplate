// Import resources
import React from "react";
import { View, ImageBackground } from "react-native";

// Import custom files
import { tw, appImages } from "../config/data";

// Component
const CustomBgImage = ({ image, isNormal, styleBg, children, ...rest }) => {
  // Debug
  //console.log("Debug customBgImage: ",)

  // Return component
  return (
    <View style={tw`flex-1`}>
      {isNormal ? (
        <ImageBackground
          {...rest}
          source={image}
          resizeMode="cover"
          style={tw`flex-1 justify-center`}
        >
          {children}
        </ImageBackground>
      ) : (
        <ImageBackground
          {...rest}
          source={{ uri: image || appImages?.general }}
          resizeMode="cover"
          style={[styleBg, tw`flex-1 justify-center`]}
        >
          {children}
        </ImageBackground>
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomBgImage;
