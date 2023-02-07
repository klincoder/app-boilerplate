// Import resources
import React from "react";
import { Image } from "react-native";

// Import custom files
import { appImages } from "../config/data";

// Component
const CustomImage = ({ isNormal, image, resizeMode, ...rest }) => {
  // Return component
  return (
    <>
      {/** Image */}
      {isNormal ? (
        <Image {...rest} source={image} resizeMode={resizeMode || "cover"} />
      ) : (
        <Image
          {...rest}
          source={{ uri: image || appImages?.general }}
          resizeMode={resizeMode || "cover"}
        />
      )}
    </>
  ); // cloe return
}; // close component

// Export
export default CustomImage;
