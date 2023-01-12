// Import resources
import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomCarousel from "./CustomCarousel";
import CustomSwitch from "./CustomSwitch";
import CustomChip from "./CustomChip";
import useAppSettings from "../hooks/useAppSettings";

// Component
const HomeHeader = ({
  activeBrands,
  selectedBrand,
  onPressBrand,
  withDriverVal,
  onPressWithDriver,
}) => {
  // Define app settings
  const { siteInfo } = useAppSettings();

  // Debug
  //console.log("Debug homeHeader: ", siteInfo?.homeCarousel);

  // Return component
  return (
    <>
      {/** CAROUSEL */}
      <CustomCarousel
        data={siteInfo?.homeCarousel}
        styleContainer={tw`mb-4 rounded-xl`}
      />

      {/** BRANDS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`mt-2 mb-3`}
      >
        {/** Loop data */}
        {activeBrands?.map((item) => {
          // Define variables
          const isSelected = selectedBrand === item?.title?.toLowerCase();
          // Return
          return (
            <CustomChip
              key={item?.id}
              isSolid={isSelected}
              title={item?.title}
              onPress={() => onPressBrand(item?.title)}
              styleContainer={tw`mr-2`}
            />
          );
        })}
      </ScrollView>

      {/** WITH DRIVER */}
      <View style={tw`m-0`}>
        <CustomSwitch
          label="With driver"
          value={withDriverVal}
          onValueChange={onPressWithDriver}
        />
      </View>
    </>
  ); // close return
}; // close component

// Export
export default HomeHeader;
