import { Stack } from "expo-router";

export default function OnboardingLayout() {
    return (
        <Stack>
            <Stack.Screen name="first-time" options={{ headerShown: false }} />
            <Stack.Screen name="returning" options={{ headerShown: false }} />
        </Stack>
    )
}