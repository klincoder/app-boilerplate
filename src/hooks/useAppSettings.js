// Import resources
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import { appSettingsAtom, networkDataAtom } from "../recoil/atoms";
import { handleDayJsFormat, handleGetInfoById } from "../config/functions";

// Component
const useAppSettings = () => {
  // Define state
  const appSettings = useRecoilValue(appSettingsAtom);
  const networkState = useRecoilValue(networkDataAtom);

  // Define ref
  const isMounted = useRef(false);

  // Define navigaion
  const navigation = useNavigation();

  // Define settings
  const general = handleGetInfoById(appSettings, "general")?.data;
  const links = handleGetInfoById(appSettings, "links")?.data;
  const bank = handleGetInfoById(appSettings, "bank")?.data;
  const slides = handleGetInfoById(appSettings, "slides")?.data;

  // Define variables
  const todaysDate = handleDayJsFormat();
  const todaysDate1 = handleDayJsFormat(todaysDate, 1);
  const todaysDate2 = handleDayJsFormat(todaysDate, 2);
  const siteInfo = {
    logo: general?.app_logo, // General
    name: general?.app_name,
    email: general?.support_email,
    phone: general?.support_phone,
    noReply: general?.support_email_reply,
    copyrightName: general?.copyright_name,
    adminName: general?.admin_name,
    adminEmail: general?.admin_email,
    workingHours: general?.working_hours,
    location: general?.location,
    android: links?.android, // Links
    ios: links?.ios,
    github: links?.github,
    instagram: links?.instagram,
    tiktok: links?.tiktok,
  };
  const networkInfo = {
    bssID: networkState?.details?.bssid,
    frequency: networkState?.details?.frequency,
    ipAddress: networkState?.details?.ipAddress,
    isConnExpensive: networkState?.details?.isConnectionExpensive,
    strength: networkState?.details?.strength,
    subnet: networkState?.details?.subnet,
    isConnected: networkState?.isConnected,
    isReachable: networkState?.isInternetReachable,
    isWifiEnabled: networkState?.isWifiEnabled,
    type: networkState?.type,
  };

  // Debug
  //console.log("Debug appSettings: ",);

  // Return component
  return {
    siteInfo,
    todaysDate,
    todaysDate1,
    todaysDate2,
    networkInfo,
    isMounted,
    navigation,
  }; // close return
}; // close component

// Export
export default useAppSettings;
