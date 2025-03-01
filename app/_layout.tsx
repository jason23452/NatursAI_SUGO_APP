import React, { useEffect, useState, useRef } from 'react';
import { Animated, View, Easing, StyleProp, ViewStyle } from 'react-native';
import { useRouter, usePathname, Slot } from 'expo-router';
import NavBar from './(tabs)/NavBar';
import {BASE_WIDTH, scaleFactor } from '../global/DimensionalControl';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/context/ThemeContext';


// 定義 FadeView 的 props 型別，加入 style 屬性
interface FadeViewProps {
  children: React.ReactNode;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

const FadeView: React.FC<FadeViewProps> = ({ children, duration = 300, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 使用 Animated.timing 並加入 easing 讓動畫曲線更平滑
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [duration, opacity]);

  return (
    // 將外部傳入的 style 與內部 style 合併
    <Animated.View style={[{ opacity }, style]}>
      {children}
    </Animated.View>
  );
};

export default function Layout() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);




  return (
    <ThemeProvider >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: BASE_WIDTH * scaleFactor,
            alignItems: 'center',
            marginHorizontal: 'auto',
          }}
        >
          <FadeView key={pathname} style={{ width: "100%", flex: 1 }}>
            <Slot />
          </FadeView>

          {/* ✅ NavBar 固定在底部 */}
          <View style={{ width: '100%', backgroundColor: '#fff' }}>
            <NavBar />
          </View>
        </View>
      </SafeAreaView>
    </ThemeProvider >
  );
}