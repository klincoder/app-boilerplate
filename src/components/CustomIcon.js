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
  // Debug
  //console.log("Debug customIcon: ")

  // Return component
  return (
    <>
      {/** ICONS */}
      {/** MaterialIcons */}
      {type === "materialIcons" && (
        <MaterialIcons {...rest} name={name} size={size || 24} />
      )}

      {/** AntDesign */}
      {type === "antDesign" && (
        <AntDesign {...rest} name={name} size={size || 24} />
      )}

      {/** FontAwesome5 */}
      {type === "fontAwesome5" && (
        <FontAwesome5 {...rest} name={name} size={size || 24} />
      )}

      {/** Entypo */}
      {type === "entypo" && <Entypo {...rest} name={name} size={size || 24} />}

      {/** Ionicons */}
      {type === "ionIcons" && (
        <Ionicons {...rest} name={name} size={size || 24} />
      )}

      {/** Evilicons */}
      {type === "evilIcons" && (
        <EvilIcons {...rest} name={name} size={size || 24} />
      )}

      {/** Material community icons */}
      {type === "materialCommunityIcons" && (
        <MaterialCommunityIcons {...rest} name={name} size={size || 24} />
      )}

      {/** Feather */}
      {type === "feather" && (
        <Feather {...rest} name={name} size={size || 24} />
      )}

      {/** Octicons */}
      {type === "octIcons" && (
        <Octicons {...rest} name={name} size={size || 24} />
      )}

      {/** FontAwesome */}
      {type === "fontAwesome" && (
        <FontAwesome {...rest} name={name} size={size || 24} />
      )}
    </>
  ); // return component
}; // close component

// Export
export default CustomIcon;
