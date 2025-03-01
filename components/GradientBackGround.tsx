// GradientBackGround.tsx
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackGroundProps {
  /** 角度，單位：度 (deg)，預設為 349 */
  angle?: number;
  /**
   * 漸層顏色陣列，必須至少包含兩個顏色
   * 預設為 ['#538AA2', '#C1DDD7']
   */
  colors?: readonly [string, string, ...string[]];
  /**
   * 顏色停點，數值介於 0 ~ 1 之間，必須至少包含兩個數值
   * 預設為 [0.327, 0.637]
   */
  locations?: readonly [number, number, ...number[]];
  /** 外部可傳入的 style */
  style?: StyleProp<ViewStyle>; // 確保這裡允許傳遞 StyleProp<ViewStyle>
  /** 子元件 */
  children?: React.ReactNode;
}

const GradientBackGround: React.FC<GradientBackGroundProps> = ({
  angle = 349,
  colors = ['#538AA2', '#C1DDD7'] as const,
  locations = [0.327, 0.637] as const,
  style,
  children,
}) => {
  // 轉換角度：CSS 中 0deg 表示向上，所以轉換公式為：
  //    theta = (angle - 90) * (Math.PI/180)
  // 並計算 start 與 end 的座標
  const theta = ((angle - 90) * Math.PI) / 180;
  const start = { x: 0.5 - Math.cos(theta) / 2, y: 0.5 - Math.sin(theta) / 2 };
  const end = { x: 0.5 + Math.cos(theta) / 2, y: 0.5 + Math.sin(theta) / 2 };

  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      end={end}
      style={[style]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackGround;