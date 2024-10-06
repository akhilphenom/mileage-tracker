import { StyleSheet } from 'react-native';
import LinearGradientBackground from '@/components/linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { DrawerToggleButton } from "@react-navigation/drawer";
import SafeView from '@/components/safe-view';

export default function HomeScreen() {
  return (
    <>
      <LinearGradientBackground />
      <SafeView>
        <DrawerToggleButton></DrawerToggleButton>
        <ThemedText>Home</ThemedText>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  
});
