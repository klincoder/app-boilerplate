// Import resources
import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";

// Import custom files
import twStyles from "../config/twStyles";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import FormSearchProducts from "../components/FormSearchProducts";
import useProductState from "../hooks/useProductState";
import ProdItem from "../components/ProdItem";
import CustomAlertMsg from "../components/CustomAlertMsg";
import { appColors } from "../config/data";

// Component
const SearchCarsScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define route
  const route = useRoute();
  const rowData = route.params?.rowData;
  const rowCategory = rowData?.title?.toLowerCase();
  const rowSubCategories = rowData?.sub_categories;

  // Define state
  const { userID } = useAuthState();
  const [searchVal, setSearchVal] = useState("");
  const { activeProd, tempProd, setTempProd, handleSearchProducts } =
    useProductState();

  // Debug
  //console.log("Debug searchCarsScreen: ", );

  // SIDE EFFECTS
  // HANDLE SEARCH CATEGORIES
  useEffect(() => {
    // If empty arrgs, return
    if (!rowCategory || !rowSubCategories) return;
    // IIFE
    (() => {
      // Filter active prod
      const catProducts = activeProd?.filter((i) =>
        i?.category?.includes(rowCategory)
      );
      setTempProd(catProducts);
      // Debug
      //console.log("Debug fxnHandleSearchCat: ", catProducts?.length);
    })(); // close fxn
  }, [rowCategory, rowSubCategories]);

  // Return component
  return (
    <CustomSafeView>
      {/** SECTION - SEARCH FORM */}
      <View style={tw``}>
        {/** Search form */}
        <FormSearchProducts
          value={searchVal}
          onValueChange={(val) => {
            setSearchVal(val);
            handleSearchProducts(val);
          }}
        />
      </View>

      {/** SECTION - FLATLIST */}
      {tempProd?.length < 1 ? (
        <CustomAlertMsg />
      ) : (
        <View style={tw`px-4`}>
          <FlatList
            data={tempProd}
            keyExtractor={(i) => i?.id}
            numColumns={2}
            initialNumToRender={12}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ProdItem rowData={item} />}
          />
        </View>
      )}
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default SearchCarsScreen;
