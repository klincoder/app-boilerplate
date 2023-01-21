// Import resources
import { useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import twStyles from "../config/twStyles";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import SaveBtn from "../components/SaveBtn";
import StickyBottomView from "../components/StickyBottomView";
import useAlertState from "../hooks/useAlertState";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import useProductState from "../hooks/useProductState";
import CustomAlertModal from "../components/CustomAlertModal";
import CustomButton from "../components/CustomButton";
import CustomCarousel from "../components/CustomCarousel";
import ProdQtyInput from "../components/ProdQtyInput";
import CartIcon from "../components/CartIcon";
import { ProdItemPrice, ProdItemTitle } from "../components/ProdItem";
import { handleSliceString } from "../config/functions";
import { alertMsg, appColors } from "../config/data";

// Component
const ProductDetailsScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define route
  const route = useRoute();
  const rowData = route.params?.rowData;
  const slicedDesc = handleSliceString(rowData?.description, 0, 100);

  // Define state
  const { userID } = useAuthState();
  const [initialDesc, setInitialDesc] = useState(slicedDesc);
  const [readMore, setReadMore] = useState(false);
  const {
    prodInfo,
    isProdInCart,
    cartLen,
    cartProd,
    qtyInput,
    handleSaveProduct,
    handleAddToCart,
  } = useProductState(rowData);

  // Define alert
  const alert = useAlertState();

  // Debug
  //console.log("Debug prodDetailsScreen: ", qtyInput);

  // FUNCTIONS
  // HANDLE SAVE BUTTON
  const handleSaveBtn = async () => {
    // If userID
    if (userID) {
      // Try catch
      try {
        await handleSaveProduct(prodInfo?.id, userID, rowData);
      } catch (err) {
        //alert.showAlert(alertMsg?.generalErr);
        //console.warn("Debug handleSaveBtn: ", err.message);
      } // close try catch
    } else {
      //alert.error(alertMsg?.loginErr);
    } // close if
  }; // close fxn

  // HANDLE READ MORE
  const handleReadMore = () => {
    // If !readMore
    if (!readMore) {
      setInitialDesc(rowData?.description);
      setReadMore(true);
    } else {
      setInitialDesc(slicedDesc);
      setReadMore(false);
    } // close if
  }; // close fxn

  // HANDLE QTY INPUT
  const handleQtyInput = async (type, val) => {
    // If empty args, return
    if (!type) return;
    // Define variables
    const normalVal = val || 1;
    const plusVal = Number(qtyInput + 1);
    const minusVal = Number(qtyInput - 1);
    const addToCartVal = isProdInCart ? Number(qtyInput) + 1 : 1;
    // Switch val
    switch (type) {
      case "normal":
        await handleAddToCart(prodInfo?.id, normalVal);
        break;
      case "plus":
        await handleAddToCart(prodInfo?.id, plusVal);
        alert.success(alertMsg?.cartSucc);
        break;
      case "minus":
        await handleAddToCart(prodInfo?.id, minusVal);
        alert.error(alertMsg?.cartErr);
        break;
      case "add to cart":
        await handleAddToCart(prodInfo?.id, addToCartVal);
        alert.success(alertMsg?.cartSucc);
        break;
    } // close switch
  }; // close fxn

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerTitleAlign: "left",
      headerRight: () => (
        <View style={tw`flex flex-row items-center pr-4`}>
          {/** Save button */}
          <SaveBtn
            isSaved={prodInfo?.isSaved}
            onPress={handleSaveBtn}
            styleBtn={tw`mr-4`}
          />
          {/** Cart icon */}
          <CartIcon cartLen={cartLen} />
        </View>
      ), // close header right
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [navigation, isMounted, cartLen]);

  // Return component
  return (
    <CustomSafeView>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        cancelText="Close"
      />

      {/** STICKY BOTTOM VIEW */}
      <StickyBottomView
        styleContainer={tw`flex flex-row items-center justify-between bg-white border-t border-[#ddd]`}
      >
        {/** Product qty input */}
        <ProdQtyInput
          qtyInput={qtyInput}
          setQtyInput={async (val) => await handleQtyInput("normal", val)}
          onPressPlus={async () => await handleQtyInput("plus")}
          onPressMinus={async () => await handleQtyInput("minus")}
          styleContainer={tw`w-38`}
        />
        {/** Add to cart button */}
        <CustomButton
          isNormal
          title="Add to Cart"
          styleNormalButton={tw`px-4`}
          onPress={async () => await handleQtyInput("add to cart")}
        />
      </StickyBottomView>

      {/** SCROLL VIEW */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** CAROUSEL */}
        <View style={tw`mb-1`}>
          <CustomCarousel
            data={prodInfo?.images}
            height={0.45}
            resizeMode="contain"
            styleImage={tw`p-3`}
          />
        </View>

        {/** MAIN CONTAINER */}
        <View style={tw`p-4`}>
          {/** Title */}
          <ProdItemTitle title={prodInfo?.title} styleTitle={tw`text-xl`} />

          {/** Price container */}
          <View style={tw`flex flex-row items-center mt-2 mb-5`}>
            {/** Price */}
            <ProdItemPrice
              isPriceSale={prodInfo?.isPriceSale}
              price={prodInfo?.priceFormat}
              priceSale={prodInfo?.priceSaleFormat}
              styleContainer={tw`text-lg mr-3`}
            />
            {/** Cart qty */}
            {isProdInCart && (
              <CustomText
                style={[
                  tw`text-sm text-[${appColors?.primary}]`,
                  twStyles?.fontRegular,
                ]}
              >
                {`x${cartProd?.qty} in cart`}
              </CustomText>
            )}
          </View>

          {/** Description */}
          <View style={tw`mb-28`}>
            {/** Heading */}
            <CustomText style={[tw`text-lg mb-1`, twStyles?.fontBold]}>
              Description
            </CustomText>
            {/** Content */}
            <CustomText style={[tw`text-base`, twStyles?.fontRegular]}>
              {initialDesc}{" "}
              {rowData?.description?.length > 150 && (
                <CustomButton
                  isText
                  title={readMore ? "Show Less" : "Read More"}
                  onPress={handleReadMore}
                  styleTextTitle={tw`text-[${appColors?.primary}]`}
                />
              )}
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default ProductDetailsScreen;
