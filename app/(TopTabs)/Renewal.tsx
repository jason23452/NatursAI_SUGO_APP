import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Dimensions } from 'react-native';
import { scaleFactor, isDesktop, PAGE_HEIGHT } from '@/global/DimensionalControl';
import Top_NavBar from '@/app/(TopTabs)/TopNavBar';



// ✅ 定義 `DetailsScreen` 組件的 `Props`（目前不需要 props）
const Renewal: React.FC = () => {

  return (
    <View style={[styles.container]}>
      {/* ✅ 滾動區域，確保手機端 `width: 100%`，電腦端 `scaledWidth` */}
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          width: "100%",
          alignItems: 'center',
          justifyContent: 'flex-start',
          // paddingBottom: isDesktop ? 100 * scaleFactor : 100,
        }}
      >
          
          <Top_NavBar/>










      </ScrollView>
    </View>
  );
};

export default Renewal;

// ✅ `Styles` 類型定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: isDesktop ? PAGE_HEIGHT : PAGE_HEIGHT * scaleFactor,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  dark: {
    backgroundColor: '#222', // ✅ 深夜模式
  },
  buttonContainer: {
    marginTop: 20,
    width: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
});