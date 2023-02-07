// Import resources
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// Import custom files
import CustomImage from "./CustomImage";
import CustomIcon from "./CustomIcon";
import { tw, screenInfo } from "../config/data";

// Component
const CustomCarousel = ({
  data,
  width,
  height,
  styleContainer,
  styleImage,
  ...rest
}) => {
  // Define state
  const [activeSlide, setActiveSlide] = useState(0);

  // STYLES
  const styles = StyleSheet.create({
    wrap: {
      width: screenInfo?.width * Number(width || 1),
      height: screenInfo?.height * Number(height || 0.25),
      borderRadius: 10,
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
      if (slide != activeSlide) {
        setActiveSlide(slide);
      } // close if
    } // close if
  }; // close fxn

  // SIDE EFFECTS
  // HANDLE AUTO SCROLL
  // useEffect(() => {
  //   if (currTimer === 0) return;
  //   const interval = setInterval(() => handleCurrTimer(), 1000);
  //   return () => clearInterval(interval);
  // }, [handleCurrTimer]);

  // Return component
  return (
    <>
      <View style={[styles.wrap, styleContainer]}>
        {/** Scroll view */}
        <ScrollView
          horizontal
          pagingEnabled
          scrollEnabled
          onScroll={({ nativeEvent }) => handleSlideOnChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          style={styles.wrap}
        >
          {/** Loop data */}
          {data?.map((item) => (
            <CustomImage
              {...rest}
              isLink
              key={item}
              image={item}
              style={[styles.wrap, styleImage]}
            />
          ))}
        </ScrollView>
      </View>

      {/** Indicators */}
      <View style={tw`flex flex-row self-center`}>
        {data?.length > 1 &&
          data?.map((item, index) => (
            <CustomIcon
              key={item}
              type="octIcons"
              name="dot-fill"
              size={20}
              style={[
                tw`mx-1 mt-2`,
                activeSlide === index ? tw`text-primary` : tw`text-gray`,
              ]}
            />
          ))}
      </View>
    </>
  ); // close return
}; // close component

// Export
export default CustomCarousel;
