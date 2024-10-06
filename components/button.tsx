import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemedText, ThemedTextProps } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color.hook';
import { secondaryColor } from '@/constants/colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  textProps?: Omit<ThemedTextProps, 'style'>;
}

export function Button({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
  textProps,
}: ButtonProps) {
  const backgroundColor = useThemeColor({ 
      light: '#FF4E4E', 
    // light: secondaryColor, 
    dark: '#FF9669' 
}, 'background');
  const textColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'text');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <ThemedText
        style={[styles.text, { color: textColor }, textStyle]}
        {...textProps}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
