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
      {/** ICONS */}
      {/** MaterialIcons */}
      {type === "materialIcons" && (
        <MaterialIcons {...rest} name={name} size={size} />
      )}

      {/** AntDesign */}
      {type === "antDesign" && <AntDesign {...rest} name={name} size={size} />}

      {/** FontAwesome5 */}
      {type === "fontAwesome5" && (
        <FontAwesome5 {...rest} name={name} size={size} />
      )}

      {/** Entypo */}
      {type === "entypo" && <Entypo {...rest} name={name} size={size} />}

      {/** Ionicons */}
      {type === "ionIcons" && <Ionicons {...rest} name={name} size={size} />}

      {/** Evilicons */}
      {type === "evilIcons" && <EvilIcons {...rest} name={name} size={size} />}

      {/** Material community icons */}
      {type === "materialCommunityIcons" && (
        <MaterialCommunityIcons {...rest} name={name} size={size} />
      )}

      {/** Feather */}
      {type === "feather" && <Feather {...rest} name={name} size={size} />}

      {/** Octicons */}
      {type === "octIcons" && <Octicons {...rest} name={name} size={size} />}

      {/** FontAwesome */}
      {type === "fontAwesome" && (
        <FontAwesome {...rest} name={name} size={size} />
      )}
    </>
  ); // return component
}; // close component

// Export
export default CustomIcon;
