// Import resources
import tw from "twrnc";

// Import custom files
import { appColors, appFonts } from "./data";

// CUSTOM TW STYLES
const twStyles = {
  linkText: tw`text-base underline`,
  linkBtn: tw`text-lg text-center text-white p-3 uppercase no-underline rounded-lg bg-[${appColors?.primary}]`,

  fontBold: { fontFamily: appFonts?.medium },
  fontRegular: { fontFamily: appFonts?.regular },
  fontBoldPrimary: [
    tw`text-[${appColors?.primary}]`,
    { fontFamily: appFonts?.medium },
  ],

  walletTextLightGray: [
    tw`text-[${appColors?.lightGray}]`,
    { fontFamily: appFonts?.medium },
  ],

  btnPrimary: [tw`text-white rounded-lg bg-[${appColors?.primary}]`],
  btnPrimaryOutline: [
    tw`text-[${appColors?.primary}] rounded-lg bg-white border border-[${appColors?.primary}]`,
  ],
};

// Export
export default twStyles;
