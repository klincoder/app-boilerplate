// Import resources
import "dotenv/config";

// Export
export default {
  expo: {
    name: "KlinStore",
    slug: "klinstore-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",
    description: "A better buy to shop online.",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./src/assets/favicon.png",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos",
          // microphonePermission:
          //   "Allow $(PRODUCT_NAME) to access your microphone",
        },
      ],
    ],
    extra: {
      // Firebase dev
      fireDevApiKey: process.env.FIREBASE_DEV_API_KEY,
      fireDevAuthDomain: process.env.FIREBASE_DEV_AUTH_DOMAIN,
      fireDevProjectId: process.env.FIREBASE_DEV_PROJECT_ID,
      fireDevStorageBucket: process.env.FIREBASE_DEV_STORAGE_BUCKET,
      fireDevMsgSenderId: process.env.FIREBASE_DEV_MESSAGING_SENDER_ID,
      fireDevAppId: process.env.FIREBASE_DEV_APP_ID,
      fireDevMeasurementId: process.env.FIREBASE_DEV_MEASUREMENT_ID,
      // Firebase prod
      fireProdApiKey: process.env.FIREBASE_PROD_API_KEY,
      fireProdAuthDomain: process.env.FIREBASE_PROD_AUTH_DOMAIN,
      fireProdProjectId: process.env.FIREBASE_PROD_PROJECT_ID,
      fireProdStorageBucket: process.env.FIREBASE_PROD_STORAGE_BUCKET,
      fireProdMsgSenderId: process.env.FIREBASE_PROD_MESSAGING_SENDER_ID,
      fireProdAppId: process.env.FIREBASE_PROD_APP_ID,
      fireProdMeasurementId: process.env.FIREBASE_PROD_MEASUREMENT_ID,
      // Paystack
      paystackDevPublic: process.env.PAYSTACK_DEV_PUBLIC_KEY,
      paystackDevSecret: process.env.PAYSTACK_DEV_SECRET_KEY,
      paystackProdPublic: process.env.PAYSTACK_PROD_PUBLIC_KEY,
      paystackProdSecret: process.env.PAYSTACK_PROD_SECRET_KEY,
    },
  },
};
