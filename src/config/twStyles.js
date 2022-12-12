// Import resources
import tw from "twrnc";

// Import custom files
import { appColors, appFonts } from "./data";

// CUSTOM TW STYLES
const twStyles = {
  linkText: tw`text-base underline`,
  linkBtn: tw`text-lg text-center text-white p-3 uppercase no-underline rounded-lg bg-[${appColors?.primary}]`,
  fontBold: { fontFamily: appFonts?.medium },
  fontBoldPrimary: [
    tw`text-[${appColors?.primary}]`,
    { fontFamily: appFonts?.medium },
  ],
};

// Export
export default twStyles;
