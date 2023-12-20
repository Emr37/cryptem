module.exports = () => {
  if (process.env.MY_ENVIRONMENT === "production") {
    return {
      name: "Cryptem",
      slug: "cryptem",
      version: "1.0.0",
      sdkVersion: "49.0.0",
      platforms: ["ios", "android"],
      extra: {
        eas: {
          projectId: "6aa4e65c-0d42-462d-a960-bd7592c39419",
        },
      },
    };
  } else {
    return {
      /* your development config */
    };
  }
};
