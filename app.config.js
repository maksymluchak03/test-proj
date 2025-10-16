import 'dotenv/config';

export default {
  expo: {
    name: "test-proj",
    slug: "test-proj",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "testproj",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: { supportsTablet: true },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundColor: "#E6F4FE",
      },
      edgeToEdgeEnabled: true,
    },
    web: { output: "static", favicon: "./assets/images/favicon.png" },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-secure-store",
    ],
    experiments: { typedRoutes: true, reactCompiler: true },
    extra: {
      BASE_URL: process.env.BASE_URL,
      TMDB_TOKEN: process.env.TMDB_TOKEN,
    },
  },
};
