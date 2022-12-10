// Import resources
import React from "react";
import { View, ImageBackground } from "react-native";
import tw from "twrnc";

// Import custom files
import { appImages } from "../config/data";

// Component
const CustomBgImage = ({ image, isLink, styleBg, children, ...rest }) => {
  // Debug
  //console.log("Debug customBgImage: ",)

  // Return component
  return (
    <View style={tw`flex-1`}>
      {isLink ? (
        <ImageBackground
          source={{ uri: image || appImages?.general }}
          resizeMode="cover"
          style={[tw`flex-1 justify-center`, styleBg]}
          {...rest}
        >
          {children}
        </ImageBackground>
      ) : (
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={tw`flex-1 justify-center`}
          {...rest}
        >
          {children}
        </ImageBackground>
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomBgImage;
