import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StatusBar, StatusBarStyle } from "react-native";

export function useStatusBar(Color: StatusBarStyle) {
    useFocusEffect(
        useCallback(() => StatusBar.setBarStyle(Color), [])
    )
}