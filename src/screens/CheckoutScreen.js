// Import resources
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { Paystack } from "react-native-paystack-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import custom files
import routes from "./routes";
import twStyles from "../config/twStyles";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import StickyBottomView from "../components/StickyBottomView";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import useProductState from "../hooks/useProductState";
import CustomButton from "../components/CustomButton";
import CustomIcon from "../components/CustomIcon";
import FormCouponCode from "../components/FormCouponCode";
import CustomAlertMsg from "../components/CustomAlertMsg";
import CustomChip from "../components/CustomChip";
import AddressItem from "../components/AddressItem";
import useAlertState from "../hooks/useAlertState";
import CustomAlertModal from "../components/CustomAlertModal";
import { alertMsg, appColors, paystackConfig } from "../config/data";
import { CartItemCheckout } from "../components/CartItem";
import { hanadleGetUserAddr, handleGenTranxRef } from "../config/functions";
import {
  collection,
  doc,
  fireDB,
  handleGetDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "../config/firebase";
import {
  cartAtom,
  selectedAddressAtom,
  shippingRatesAtom,
  userAddressAtom,
} from "../recoil/atoms";

// Component
const CheckoutScreen = () => {
  // Define app settings
  const { navigation, isMounted, siteInfo, todaysDate } = useAppSettings();

  // Define state
  const [userAddr, setUserAddr] = useRecoilState(userAddressAtom); // Atoms
  const [selectedAddr, setSelectedAddr] = useRecoilState(selectedAddressAtom);
  const setShippingRatesAtom = useSetRecoilState(shippingRatesAtom);
  const resetCartAtom = useResetRecoilState(cartAtom);
  const resetSelectedAddrAtom = useResetRecoilState(selectedAddressAtom);
  const { userID, user } = useAuthState(); // Normal
  const [isGuest, setisGuest] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const {
    cart,
    cartProd,
    cartTotal,
    cartShipping,
    cartSubTotalFormat,
    cartShippingFormat,
    cartVatFormat,
    cartTotalFormat,
    couponInput,
    setCouponInput,
  } = useProductState();

  // Define ref
  const paystackRef = useRef(null);

  // Define alert
  const alert = useAlertState();

  // Define variables
  const isContinue = userID || isGuest;
  const userAddrLen = userAddr?.length;
  const totalsArr = [
    { key: "Subtotal", value: cartSubTotalFormat },
    { key: `VAT (${siteInfo?.vat}%)`, value: cartVatFormat },
    { key: "Shipping", value: cartShippingFormat },
    { key: "Total", value: cartTotalFormat },
  ];

  // Debug
  //console.log("Debug checkoutScreen: ", isProdEnv);

  // FUNCTIONS
  // HANDLE PAYSTACK INIT
  const handlePaystackInit = () => {
    paystackRef.current.startTransaction();
  }; // close fxn

  // HANDLE ABANDONED CART
  const handleAbandCart = async (response) => {
    // If empty args, return
    if (!userID || !response) return;
    // Show loading
    alert.showLoading();
    // Try catch
    try {
      // Add to db
      const abandRef = doc(
        collection(fireDB, "users", userID, "abandoned_cart")
      );
      await setDoc(abandRef, {
        id: abandRef?.id,
        product_id: cartProd?.id,
        amount: cartTotal,
        payment_status: response?.status,
        user_id: userID,
        date_created: todaysDate,
        date_updated: todaysDate,
      });
      // Hide loading
      alert.hideLoading();
    } catch (err) {
      alert.showAlert(alertMsg?.generalErr);
      alert.hideLoading();
      console.log("Debug abandCart: ", err.message);
    } // close try catch
  }; // close fxn

  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (response) => {
    // If empty args, return
    if (!response || isComplete) return;
    // Set loading
    alert.showLoading();
    //console.log("Debug submitForm: ", values);
    // Try catch
    try {
      // If userID
      if (userID) {
        // Add to user orders
        const addOrderRef = doc(collection(fireDB, "users", userID, "orders"));
        await setDoc(addOrderRef, {
          id: addOrderRef?.id,
          order_id: handleGenTranxRef(),
          product_bought: cart,
          customer: selectedAddr,
          tranxAmt: cartTotal,
          payment_status: response?.status,
          payment_message: response?.transactionRef?.message?.toLowerCase(),
          payment_reference: response?.transactionRef?.reference,
          payment_trans: response?.transactionRef?.trans,
          status: "pending",
          user_id: userID,
          date_created: todaysDate,
          date_updated: todaysDate,
        });
      } else {
        // Add to guest orders
        const guestOrderRef = doc(collection(fireDB, "guest_orders"));
        await setDoc(guestOrderRef, {
          id: guestOrderRef?.id,
          order_id: handleGenTranxRef(),
          product_bought: cart,
          customer: selectedAddr,
          tranxAmt: cartTotal,
          payment_status: response?.status,
          payment_message: response?.transactionRef?.message?.toLowerCase(),
          payment_reference: response?.transactionRef?.reference,
          payment_trans: response?.transactionRef?.trans,
          status: "pending",
          seller_id: cartProd?.userID || null,
          date_created: todaysDate,
          date_updated: todaysDate,
        });
      } // close if
      // Reset state
      await AsyncStorage.removeItem("cart"); // Cart async storage
      resetCartAtom(); // Cart atom
      resetSelectedAddrAtom(); // Selected address atom
      setIsComplete(true);
      alert.hideLoading();
    } catch (err) {
      alert.showAlert(alertMsg?.generalErr);
      alert.hideLoading();
      //console.log("Debug submitForm: ", err.message);
    } // close try catch
  }; // CLOSE FXN

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerShown: true,
      headerTitle: isComplete ? "Checkout Complete" : "Checkout",
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [navigation, isMounted]);

  // SIDE EFFECTS
  // GET DATA
  useEffect(() => {
    // IIFE
    (async () => {
      // Show loading
      alert.showLoading();
      // Try catch
      try {
        // Get user address
        const getUserAddr = await hanadleGetUserAddr(userID);
        setUserAddr(getUserAddr);
        // Get shipping rates
        const getShippingRef = query(
          collection(fireDB, "shipping_rates"),
          where("status", "==", "active"),
          orderBy("country", "asc")
        );
        const getShippingData = await handleGetDocs(getShippingRef);
        setShippingRatesAtom(getShippingData);
        // Hide loading
        alert.hideLoading();
      } catch (err) {
        alert.hideLoading();
        //console.log("Debug fxnGetAddr: ", err.message);
      } // close try catch
    })(); // close fxn
  }, []);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** Spinner */}
      <CustomAlertModal isSpinner visible={alert.loading} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        content={alert.message}
        cancelText="Close"
      />

      {/** PAYSTACK PAYMENT */}
      <Paystack
        ref={paystackRef}
        paystackKey={paystackConfig?.public}
        amount={cartTotal}
        billingEmail={user?.email || selectedAddr?.email_address}
        channels={["card", "bank", "ussd", "qr", "mobile_money"]}
        activityIndicatorColor={appColors?.primary}
        onCancel={async (res) => {
          await handleAbandCart(res);
        }}
        onSuccess={async (res) => {
          await handleSubmitForm(res);
        }}
      />

      {/** IF IS COMPLETE */}
      {isComplete ? (
        <CustomAlertMsg
          title="Congratulations!"
          description="Order placed successfully. Expect a call from our agent within 5 minutes."
          iconType="feather"
          iconName="check-circle"
          iconColor={appColors?.success}
          titleColor={appColors?.success}
          actions={
            <View style={tw`flex flex-row items-center justify-between`}>
              <CustomChip
                isSolid
                title="Continue Shopping"
                bgColor={appColors?.success}
                onPress={() => navigation.navigate(routes.SEARCH)}
              />
              {userID && (
                <CustomChip
                  title="My Orders"
                  styleContainer={tw`ml-3`}
                  onPress={() => navigation.navigate(routes.MY_ORDERS)}
                />
              )}
            </View>
          }
        />
      ) : (
        <>
          {/** IF IS CONTINUE */}
          {!isContinue ? (
            <CustomAlertMsg
              title="Not Logged In?"
              description="Login or register to keep track of your orders, shipping & more."
              actions={
                <View style={tw`flex flex-row items-center justify-between`}>
                  <CustomChip
                    isSolid
                    title="Login or Register"
                    onPress={() => navigation.navigate(routes.LOGIN)}
                    styleContainer={tw`mr-3`}
                  />
                  <CustomChip title="Guest" onPress={() => setisGuest(true)} />
                </View>
              }
            />
          ) : (
            <>
              {/** STICKY BOTTOM VIEW */}
              <StickyBottomView styleContainer={tw`bg-white`}>
                {/** Coupon code */}
                <FormCouponCode
                  value={couponInput}
                  setValue={(val) => setCouponInput(val)}
                  onPressApply={() => console.log("Coupon Applied!")}
                  styleContainer={tw`mb-3`}
                />
                {/** Total sum */}
                {totalsArr?.map((item) => (
                  <View
                    key={`totals${item?.key}`}
                    style={tw`flex flex-row items-center justify-between mb-0.5`}
                  >
                    <CustomText style={[tw`text-base`, twStyles?.fontBold]}>
                      {item?.key}:
                    </CustomText>
                    <CustomText
                      style={[
                        tw`text-lg text-[${appColors?.primary}]`,
                        twStyles?.fontBold,
                      ]}
                    >
                      {item?.value}
                    </CustomText>
                  </View>
                ))}
                {/** Place order button */}
                <CustomButton
                  isNormal
                  title="Place Order"
                  disabled={!selectedAddr?.id || !cartShipping}
                  onPress={handlePaystackInit}
                />
                {/** Secured by */}
                <View
                  style={tw`flex flex-row items-center justify-center mt-1`}
                >
                  <CustomIcon
                    type="feather"
                    name="lock"
                    size={14}
                    style={tw`mr-1 text-[${appColors?.lightBlack}]`}
                  />
                  <CustomText
                    style={[
                      tw`text-xs uppercase text-[${appColors?.lightBlack}]`,
                      twStyles?.fontBold,
                    ]}
                  >
                    Secured by Paystack
                  </CustomText>
                </View>
              </StickyBottomView>

              {/** CONTENT */}
              <View style={tw`h-98`}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/** SHIPPING ADDRESS */}
                  <View style={tw`mb-6 mt-3`}>
                    {/** Heading container */}
                    <View
                      style={tw`flex flex-row items-center justify-between mb-2`}
                    >
                      <CustomText style={[tw`text-base`, twStyles?.fontBold]}>
                        Shipping Address
                      </CustomText>
                      <CustomIcon
                        type="antDesign"
                        name="pluscircle"
                        size={26}
                        style={tw`text-[${appColors?.primary}]`}
                        onPress={() =>
                          navigation.navigate(routes?.MY_ADDRESS_CREATE)
                        }
                      />
                    </View>
                    {/** Addresses */}
                    {userAddr?.length > 0 && (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        {userAddr?.map((item, index) => (
                          <AddressItem
                            showEditIcon
                            key={`addr${index}`}
                            rowData={item}
                            styleContainer={tw`w-50 mr-2`}
                            isSelected={item?.id === selectedAddr?.id}
                            onPress={() => setSelectedAddr(item)}
                          />
                        ))}
                      </ScrollView>
                    )}
                  </View>

                  {/** ORDER SUMMARY */}
                  <View style={tw`mb-3`}>
                    {/** Heading */}
                    <CustomText
                      style={[tw`text-base mb-2`, twStyles?.fontBold]}
                    >
                      Order Summary
                    </CustomText>
                    {/** Cart items */}
                    {cart?.map((item) => (
                      <CartItemCheckout key={item?.id} rowData={item} />
                    ))}
                  </View>
                </ScrollView>
              </View>
            </>
          )}
        </>
      )}
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CheckoutScreen;
