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
const CustomIcon = ({ type, name, ...rest }) => {
  // Debug
  //console.log("Debug customIcon: ")

  // Return component
  return (
    <>
      {/** ICONS */}
      {/** MaterialIcons */}
      {type === "materialIcons" && <MaterialIcons name={name} {...rest} />}

      {/** AntDesign */}
      {type === "antDesign" && <AntDesign name={name} {...rest} />}

      {/** FontAwesome5 */}
      {type === "fontAwesome5" && <FontAwesome5 name={name} {...rest} />}

      {/** Entypo */}
      {type === "entypo" && <Entypo name={name} {...rest} />}

      {/** Ionicons */}
      {type === "ionIcons" && <Ionicons name={name} {...rest} />}

      {/** Evilicons */}
      {type === "evilIcons" && <EvilIcons name={name} {...rest} />}

      {/** Material community icons */}
      {type === "materialCommunityIcons" && (
        <MaterialCommunityIcons name={name} {...rest} />
      )}

      {/** Feather */}
      {type === "feather" && <Feather name={name} {...rest} />}

      {/** Octicons */}
      {type === "octIcons" && <Octicons name={name} {...rest} />}

      {/** FontAwesome */}
      {type === "fontAwesome" && <FontAwesome name={name} {...rest} />}
    </>
  ); // return component
}; // close component

// Export
export default CustomIcon;
