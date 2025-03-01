import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface ProgressBarProps {
  maxValue: number; // 最大值
  currentValue: number; // 當前值
  boxWidth?: number; // 方塊寬度（可選）
  boxHeight?: number; // 方塊高度（可選）
  containerStyle?: ViewStyle; // 容器樣式（可選）
  boxStyle?: ViewStyle; // 方塊樣式（可選）
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  maxValue,
  currentValue,
  boxWidth = 27.64, // 預設寬度
  boxHeight = 12.9, // 預設高度
  containerStyle,
  boxStyle,
}) => {
  const filledBlocks = Math.round((currentValue / maxValue) * 3); // 計算填滿的數量

  return (
    <View style={[styles.container, containerStyle]}>
      {[...Array(3)].map((_, index) => (
        <View
          key={index}
          style={[
            boxStyle,
            {
              width: boxWidth,
              height: boxHeight,
              backgroundColor: index < filledBlocks ? "#83BBAE" : "#CDE4DF",
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // 均勻分布
    width: 100, // 預設總寬度
  },
 
});

export default ProgressBar;