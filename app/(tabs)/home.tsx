import AppBar from "@/components/app-bar/app-bar";
import NearbyHotels from "@/components/home/nearby-hotels";
import Places from "@/components/home/countries";
import Recommendations from "@/components/home/recommendations";
import { AppRoutePath } from "@/constants/app-route/app-route-path";
import SIZES from "@/constants/tokens/sizes";
import { useStoreUser } from "@/library/store/user";
import { Utils } from "@/utils/utils";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useServiceCountryPaginate } from "@/library/service/country.service";

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { prefetch: prefetchCountries } = useServiceCountryPaginate();

  const flatListRef = useRef<FlatList<any>>(null);

  const slides = [
    {
      key: "1",
      title: "Welcome to Our App",
      description: "Discover new experiences and places with our app.",
      image: require("@/assets/images/travel/travel1.jpg"),
    },
    {
      key: "2",
      title: "Plan Your Trips",
      description: "Easily plan and organize your trips.",
      image: require("@/assets/images/travel/travel2.jpg"),
    },
    {
      key: "3",
      title: "Stay Connected",
      description: "Stay connected with your travel companions.",
      image: require("@/assets/images/travel/travel3.jpg"),
    },
  ];

  const { user } = useStoreUser();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SIZES.width);
    setCurrentIndex(index);
  };

  const isLastSlide = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      (flatListRef.current as any).scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("(tabs)");
    }
  };

  const handleSearchClick = () => {
    router.push(AppRoutePath.search.normalSearch);
  };

  useEffect(() => {
    prefetchCountries();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <AppBar
          title={`${Utils.getIsNight() ? "🌙" : "☀️"}  ${
            user?.name ?? "User!"
          }`}
          // onSearch={handleSearch}
          onSearchClick={handleSearchClick}
        />

        <Places />
        <Recommendations />
        <NearbyHotels />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    width: SIZES.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor:'red',
  },
});
