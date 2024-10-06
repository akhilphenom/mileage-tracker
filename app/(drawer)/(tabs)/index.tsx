import { ThemedText } from '@/components/themed-text';
import { DrawerToggleButton } from "@react-navigation/drawer";
import ComposedSafeView from '@/components/safe-view-composed';

export default function HomeScreen() {
  return (
    <ComposedSafeView>
      <DrawerToggleButton></DrawerToggleButton>
      <ThemedText>Home</ThemedText>
    </ComposedSafeView>
  );
}
