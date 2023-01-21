// Import resources
import React, { useEffect } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import { useRecoilState } from "recoil";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import FormCreateAddress from "../components/FormCreateAddress";
import useAlertState from "../hooks/useAlertState";
import CustomAlertModal from "../components/CustomAlertModal";
import { locationsAtom } from "../recoil/atoms";
import {
  collection,
  fireDB,
  handleGetDocs,
  orderBy,
  query,
  where,
} from "../config/firebase";

// Component
const MyAddressScreenCreate = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { userID } = useAuthState();
  const [locations, setLocations] = useRecoilState(locationsAtom);

  // Define row data
  const route = useRoute();

  // Define alert
  const alert = useAlertState();

  // Define variables
  const rowData = route.params?.rowData;
  const locationsLen = locations?.length;

  // Debug
  //console.log("Debug myAddressScreenCreate: ", locationsLen);

  // SIDE EFFECTS
  // GET DATA
  useEffect(() => {
    // If empty args, return
    if (locationsLen > 0) return;
    // IIFE
    (async () => {
      // Show loading
      alert.showLoading();
      // Try catch
      try {
        // Get locations data
        const getLocRef = query(
          collection(fireDB, "locations"),
          where("status", "==", "active"),
          orderBy("country", "asc")
        );
        const getLocData = await handleGetDocs(getLocRef);
        setLocations(getLocData);
        alert.hideLoading();
      } catch (err) {
        alert.hideLoading();
        console.log("Debug fxnCreatAddr: ", err.message);
      } // close try catch
    })(); // close fxn
  }, []);

  // Return component
  return (
    <CustomSafeView style={tw`px-4 py-2`}>
      {/** Spinner */}
      <CustomAlertModal isSpinner visible={alert.loading} />

      {/** SECTION - CREATE ADDRESS FORM */}
      <FormCreateAddress rowData={rowData} locations={locations} />
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default MyAddressScreenCreate;
