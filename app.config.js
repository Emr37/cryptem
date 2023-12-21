module.exports = ({ config }) => {
  return {
    ...config,
    android: {
      versionCode: 4,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#000000",
      },
      package: "com.emraksoy.cyrptem",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API_KEY,
        },
      },
    },

    extra: {
      eas: {
        projectId: "6aa4e65c-0d42-462d-a960-bd7592c39419",
      },
    },
  };
};
