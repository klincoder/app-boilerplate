// Import resources
import React, { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import twStyles from "../config/twStyles";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import CustomIcon from "../components/CustomIcon";
import CartItem from "../components/CartItem";
import useProductState from "../hooks/useProductState";
import StickyBottomView from "../components/StickyBottomView";
import CustomButton from "../components/CustomButton";
import CustomAlertMsg from "../components/CustomAlertMsg";
import CustomChip from "../components/CustomChip";
import { appColors } from "../config/data";

// Component
const CartScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { userID } = useAuthState();
  const { cart, cartLen, cartSubTotalFormat, cartSubTotal } = useProductState();

  // Define variables

  // Debug
  // console.log("Debug CartScreen: ", {
  //   cartSubTotal,
  //   cartSubTotalFormat,
  //   cart: cart?.[0],
  // });

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Cart",
      headerTitleAlign: "center",
      // headerRight: () => (
      //   <View style={tw`flex flex-row pr-5`}>
      //     <CustomIcon
      //       type="antDesign"
      //       name="windowso"
      //       size={28}
      //       onPress={() => navigation.navigate(routes.CATEGORIES)}
      //     />
      //   </View>
      // ), // close header right
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [navigation, isMounted]);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** IF CARTLEN */}
      {cartLen < 1 ? (
        <CustomAlertMsg
          title="Cart Empty"
          //description="Get the best deals today."
          actions={
            <CustomChip
              isSolid
              title="Go Shopping Now"
              onPress={() => navigation.navigate(routes.SEARCH)}
            />
          }
        />
      ) : (
        <>
          {/** STICKY BOTTOM VIEW */}
          <StickyBottomView
            styleContainer={tw`bg-white border-t border-[#ddd]`}
          >
            {/** Subtotal sum */}
            <View style={tw`flex flex-row items-center justify-center`}>
              <CustomText style={[tw`text-base mr-2`, twStyles?.fontBold]}>
                Subtotal:
              </CustomText>
              <CustomText
                style={[
                  tw`text-xl text-[${appColors?.primary}]`,
                  twStyles?.fontBold,
                ]}
              >
                {cartSubTotalFormat}
              </CustomText>
            </View>
            {/** Checkout button */}
            <CustomButton
              isNormal
              title="Checkout"
              onPress={() => navigation.navigate(routes.CHECKOUT)}
            />
          </StickyBottomView>

          {/** SECTION - FLATLIST */}
          <View style={tw`mb-30`}>
            <FlatList
              data={cart}
              keyExtractor={(i) => i?.id}
              initialNumToRender={12}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <CartItem rowData={item} />}
            />
          </View>
        </>
      )}
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CartScreen;
