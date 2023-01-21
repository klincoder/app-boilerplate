// Import resources
import React, { useEffect, useLayoutEffect } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { useRecoilState } from "recoil";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import custom files
import routes from "./routes";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAlertState from "../hooks/useAlertState";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import CustomAlertMsg from "../components/CustomAlertMsg";
import CustomIcon from "../components/CustomIcon";
import CustomChip from "../components/CustomChip";
import CustomAlertModal from "../components/CustomAlertModal";
import CustomButton from "../components/CustomButton";
import AddressItem from "../components/AddressItem";
import { userAddressAtom } from "../recoil/atoms";
import { hanadleGetUserAddr } from "../config/functions";
import { appColors } from "../config/data";

// Component
const MyAddressScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { userID } = useAuthState();
  const [userAddr, setUserAddr] = useRecoilState(userAddressAtom);

  // Define alert
  const alert = useAlertState();

  // Define variables
  const userAddrLen = userAddr?.length;

  // Debug
  //console.log("Debug myAddressScreen: ", userAddr);

  // FUNCTIONS
  // HANDLE REFERESH DATA
  const handleRefreshData = async () => {
    // Get user address
    alert.showLoading();
    const getUserAddr = (await hanadleGetUserAddr(userID)) || [];
    setUserAddr(getUserAddr);
    alert.hideLoading();
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
        <View style={tw`flex flex-row pr-4`}>
          <CustomIcon
            type="antDesign"
            name="pluscircle"
            size={26}
            style={tw`text-[${appColors?.primary}]`}
            onPress={() => navigation.navigate(routes?.MY_ADDRESS_CREATE)}
          />
        </View>
      ), // close header right
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [navigation, isMounted]);

  // SIDE EFFECTS
  // GET DATA
  useEffect(() => {
    // If empty args, return
    //if (userAddrLen > 0) return;
    // IIFE
    (async () => {
      // Show loading
      alert.showLoading();
      // Try catch
      try {
        // Get user address
        const getUserAddr = await hanadleGetUserAddr(userID);
        setUserAddr(getUserAddr);
        alert.hideLoading();
      } catch (err) {
        alert.hideLoading();
        //console.log("Debug fxnGetAddr: ", err.message);
      } // close try catch
    })(); // close fxn
  }, [isMounted, userID]);

  // Return component
  return (
    <CustomSafeView>
      {/** Spinner */}
      <CustomAlertModal isSpinner visible={alert.loading} />

      {/** IF !USERADDR  */}
      {userAddrLen < 1 ? (
        <CustomAlertMsg
          actions={
            <CustomChip
              isSolid
              title="Create New"
              onPress={() => navigation.navigate(routes.MY_ADDRESS_CREATE)}
            />
          }
        />
      ) : (
        <View style={tw`px-4 py-2`}>
          {/** FLATLIST */}
          <FlatList
            data={userAddr}
            keyExtractor={(i) => i?.id}
            initialNumToRender={12}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={alert.loading}
                onRefresh={handleRefreshData}
              />
            }
            renderItem={({ item }) => (
              <AddressItem rowData={item} styleContainer={tw`mb-4`} />
            )}
          />

          {/** TEST BUTTON */}
          {/* <View>
            <CustomButton
              isNormal
              title="TEST BUTTON"
              onPress={async () => await AsyncStorage.removeItem("guestAddr")}
            />
          </View> */}
        </View>
      )}
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default MyAddressScreen;
