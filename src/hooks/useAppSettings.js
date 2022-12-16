// Import resources
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import dayjsUTC from "dayjs/plugin/utc";
dayjs.extend(dayjsUTC);

// Import custom files
import { handleDayJsFormat } from "../config/functions";
import { appSettingsAtom, networkDataAtom } from "../recoil/atoms";

// Component
const useAppSettings = () => {
  // Define isMounted
  const isMounted = useRef();

  // Define state
  const appSettings = useRecoilValue(appSettingsAtom);
  const networkState = useRecoilValue(networkDataAtom);

  // Define navigaion
  const navigation = useNavigation();

  // Define todays date
  const todaysDate = dayjs().utc().format();
  const todaysDate1 = handleDayJsFormat(todaysDate, 1);
  const todaysDate2 = handleDayJsFormat(todaysDate, 2);

  // Define site info
  const siteInfo = {
    logo: appSettings?.app_logo,
    name: appSettings?.app_name,
    email: appSettings?.support_email,
    phone: appSettings?.support_phone,
    noReply: appSettings?.support_email_reply,
    copyrightName: appSettings?.copyright_name,
    adminName: appSettings?.admin_name,
    adminEmail: appSettings?.admin_email,
    bank: appSettings?.bank_info,
    workingHours: appSettings?.working_hours,
    location: appSettings?.location,
  };

  // Define network info
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
