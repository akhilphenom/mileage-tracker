import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color.hook';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'extraLight' | 'light' | 'black' | 'extraLightItalic' | 'lightItalic' | 'regularItalic' | 'semiBoldItalic' | 'boldItalic' | 'blackItalic';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'extraLight' ? styles.extraLight : undefined,
        type === 'light' ? styles.light : undefined,
        type === 'black' ? styles.black : undefined,
        type === 'extraLightItalic' ? styles.extraLightItalic : undefined,
        type === 'lightItalic' ? styles.lightItalic : undefined,
        type === 'regularItalic' ? styles.regularItalic : undefined,
        type === 'semiBoldItalic' ? styles.semiBoldItalic : undefined,
        type === 'boldItalic' ? styles.boldItalic : undefined,
        type === 'blackItalic' ? styles.blackItalic : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-Regular',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'SourceSansPro-Bold',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: 'SourceSansPro-Bold',
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0a7ea4',
    fontFamily: 'SourceSansPro-Regular',
  },
  extraLight: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-ExtraLight',
  },
  light: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-Light',
  },
  black: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-Black',
  },
  extraLightItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-ExtraLightItalic',
  },
  lightItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-LightItalic',
  },
  regularItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-RegularItalic',
  },
  semiBoldItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-SemiBoldItalic',
  },
  boldItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-BoldItalic',
  },
  blackItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SourceSansPro-BlackItalic',
  },
});
