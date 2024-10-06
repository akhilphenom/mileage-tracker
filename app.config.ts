import 'ts-node/register'; // Add this to import TypeScript files
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'mileage-tracker',
  slug: 'mileage-tracker',
  scheme: 'mileagetracker', //Added as it was showing warning
  plugins: [
    [
      "expo-image-picker",
      {
        "photosPermission": "The app accesses your photos to let you share them with your friends."
      }
    ]
  ]
};

export default config;
