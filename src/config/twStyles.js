// Import resources
import tw from "twrnc";

// Import custom files
import { appColors } from "./data";

// CUSTOM TW STYLES
export const twStyles = {
  linkText: tw`text-base underline`,
  linkBtn: tw`text-lg text-center text-white p-3 uppercase no-underline rounded-lg bg-[${appColors?.primary}]`,
};
