// Import resources
import React from "react";
import { Image } from "react-native";

// Import custom files
import { appImages } from "../config/data";

// Component
const CustomImage = ({ isLink, image, resizeMode, ...rest }) => {
  // Return component
  return (
    <>
      {/** Image */}
      {isLink ? (
        <Image
          {...rest}
          source={{ uri: image || appImages?.general }}
          resizeMode={resizeMode || "cover"}
        />
      ) : (
        <Image {...rest} source={image} resizeMode={resizeMode || "cover"} />
      )}
    </>
  ); // cloe return
}; // close component

// Export
export default CustomImage;
