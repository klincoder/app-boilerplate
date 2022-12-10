// Import resources
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomImage from "./CustomImage";
import CustomIcon from "./CustomIcon";
import { appColors, screenInfo } from "../config/data";

// Component
const CustomCarousel = ({ data, height, styleContainer }) => {
  // Define state
  const [activeSlide, setActiveSlide] = useState(0);

  // STYLES
  const styles = StyleSheet.create({
    wrap: {
      width: screenInfo?.width,
      height: screenInfo?.height * Number(height || 0.25),
      borderRadius: 5,
    },
  });

  // Debug
  //console.log("Debug CustomCarousel: ",)

  // FUNCTIONS
  // HANDLE SLIDE ONCHANGE
  const handleSlideOnChange = (e) => {
    // If event
    if (e) {
      const slide = Math.ceil(e.contentOffset.x / e.layoutMeasurement.width);
      // If slide
      if (slide != activeSlide) {
        // Set slide
        setActiveSlide(slide);
      } // close if
    } // close if
  }; // close fxn

  // Return component
  return (
    <View style={[styles.wrap, styleContainer]}>
      {/** Scroll view */}
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={({ nativeEvent }) => handleSlideOnChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        style={styles.wrap}
      >
        {/** Loop data */}
        {data?.map((item) => (
          <CustomImage isLink key={item} image={item} style={styles.wrap} />
        ))}
      </ScrollView>

      {/** Indicators */}
      {data?.length > 1 && (
        <View style={tw`absolute bottom-0 flex flex-row self-center`}>
          {/** Loop data */}
          {data?.map((item, index) => (
            <CustomIcon
              key={item}
              type="octIcons"
              icon="dot-fill"
              size={20}
              style={[
                tw`mx-2 mb-1`,
                activeSlide === index
                  ? tw`text-[${appColors?.primary}]`
                  : tw`text-white`,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomCarousel;
