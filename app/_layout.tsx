import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { themeColor } from '@/constants/colors';
import { View } from 'react-native';
import { MileageTrackerIcon } from '@/components/icons/mileage-tracker';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded, error] = useFonts({
    'SourceSansPro-ExtraLight': require('../assets/fonts/SourceSansPro-ExtraLight.ttf'),
    'SourceSansPro-Light': require('../assets/fonts/SourceSansPro-Light.ttf'),
    'SourceSansPro-Regular': require('../assets/fonts/SourceSansPro-Regular.ttf'),
    'SourceSansPro-SemiBold': require('../assets/fonts/SourceSansPro-SemiBold.ttf'),
    'SourceSansPro-Bold': require('../assets/fonts/SourceSansPro-Bold.ttf'),
    'SourceSansPro-Black': require('../assets/fonts/SourceSansPro-Black.ttf'),
    'SourceSansPro-ExtraLightItalic': require('../assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
    'SourceSansPro-LightItalic': require('../assets/fonts/SourceSansPro-LightItalic.ttf'),
    'SourceSansPro-RegularItalic': require('../assets/fonts/SourceSansPro-Italic.ttf'),
    'SourceSansPro-SemiBoldItalic': require('../assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
    'SourceSansPro-BoldItalic': require('../assets/fonts/SourceSansPro-BoldItalic.ttf'),
    'SourceSansPro-BlackItalic': require('../assets/fonts/SourceSansPro-BlackItalic.ttf'),
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (fontsLoaded) {
      timeout = setTimeout(() => {
        SplashScreen.hideAsync();
        setShowSplash(false);
      }, 500)
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [fontsLoaded]);

  if (showSplash) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: themeColor,
        }}>
        <MileageTrackerIcon />
      </View>
    )
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
