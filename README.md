# Welcome to TEST app 👋

## Get started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   Create a .env file in the project root:

   ```env
   TMDB_TOKEN=your_tmdb_api_token
   BASE_URL=base_url
   ```

3. Run the app:

### Available Scripts

- `npx run expo` - start Expo
- `npm run android` - run on Android
- `npm run ios` - run on iOS

Implemented functionality:

- Movie list
- Movie search
- Filtering
- Favorites list
- Ability to add and remove favorite movies

Tech stack:

- Expo
- Zustand
- React Hook Form
- Zod
- Axios
- TanStack Query

### Opportunity for improvement

First of all, I would work on color schemes for different phone themes, as this should be done at the beginning of the project implementation.
I would also make the implementation a little cleaner and more readable.
I would go through the code and remove any logic or constants that might be duplicated somewhere.
I would also implement Google OAuth2.

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
