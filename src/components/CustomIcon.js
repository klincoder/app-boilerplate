// Import resources
import React from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Ionicons,
  EvilIcons,
  MaterialCommunityIcons,
  Feather,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";

// Component
const CustomIcon = ({ type, name, size, ...rest }) => {
  // Define variables
  size = size || 24;

  // Debug
  //console.log("Debug customIcon: ")

  // Return component
  return (
    <>
      {/** Material Icons */}
      {type === "materialIcons" && (
        <MaterialIcons {...rest} name={name} size={size} />
      )}

      {/** Ant Design */}
      {type === "antDesign" && <AntDesign {...rest} name={name} size={size} />}

      {/** Font Awesome5 */}
      {type === "fontAwesome5" && (
        <FontAwesome5 {...rest} name={name} size={size} />
      )}

      {/** Entypo */}
      {type === "entypo" && <Entypo {...rest} name={name} size={size} />}

      {/** Ion Icons */}
      {type === "ionIcons" && <Ionicons {...rest} name={name} size={size} />}

      {/** Evil Icons */}
      {type === "evilIcons" && <EvilIcons {...rest} name={name} size={size} />}

      {/** Feather */}
      {type === "feather" && <Feather {...rest} name={name} size={size} />}

      {/** Oct Icons */}
      {type === "octIcons" && <Octicons {...rest} name={name} size={size} />}

      {/** Font Awesome */}
      {type === "fontAwesome" && (
        <FontAwesome {...rest} name={name} size={size} />
      )}

      {/** Material Community Icons */}
      {type === "materialCommunityIcons" && (
        <MaterialCommunityIcons {...rest} name={name} size={size} />
      )}
    </>
  ); // return component
}; // close component

// Export
export default CustomIcon;
