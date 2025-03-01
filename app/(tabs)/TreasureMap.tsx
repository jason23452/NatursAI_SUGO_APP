import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Dimensions } from 'react-native';
import { scaleFactor, isDesktop } from '@/global/DimensionalControl';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton';



// ✅ 定義 `DetailsScreen` 組件的 `Props`（目前不需要 props）
const Treasure_Map: React.FC = () => {

  return (
    <View style={[styles.container]}>
      {/* ✅ 滾動區域，確保手機端 `width: 100%`，電腦端 `scaledWidth` */}
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          width: "100%",
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
          <ThemeToggleButton/>




        {/* 🔥 測試滾動 */}
        {Array.from({ length: 50 }).map((_, i) => (
          <Text key={i} style={{ fontSize: 16 * scaleFactor }}>
            這是首頁內容 {i + 1}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default Treasure_Map;

// ✅ `Styles` 類型定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    width: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
});