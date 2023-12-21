module.exports = () => {
  return {
    name: "Cryptem",
    slug: "cyrptem",
    version: "1.1.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    assetBundlePatterns: ["**/*"],

    android: {
      versionCode: 7,
      runtimeVersion: "1.1.1",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#000000",
      },
      package: "com.emraksoy.cyrptem",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        },
      },
    },
    ios: {
      supportsTablet: true,
      runtimeVersion: {
        policy: "appVersion",
      },
    },

    web: {
      favicon: "./assets/favicon.png",
    },

    owner: "emraksoy",
    updates: {
      url: "https://u.expo.dev/6aa4e65c-0d42-462d-a960-bd7592c39419",
    },

    extra: {
      eas: {
        projectId: "6aa4e65c-0d42-462d-a960-bd7592c39419",
      },
    },
  };
};
