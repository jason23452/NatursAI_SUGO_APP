import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {  scaleFactor  } from '@/global/DimensionalControl';


export default function StoreScreen() {

  return (
    <View style={[styles.container]}>  
      <ScrollView
        style={{ flex: 1, width: "100%", }}
        contentContainerStyle={{
          width: "100%",
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingBottom: "27.583%",  // 避免 `NavBar` 遮擋內容
        }}
      >
        <Text style={[styles.text, { fontSize: 24 * scaleFactor }]}>🏠 Home Page</Text>
        <Text style={{ fontSize: 16 * scaleFactor }}>這是首頁內容</Text>
        
        {Array.from({ length: 50 }).map((_, i) => (
          <Text key={i} style={{ fontSize: 16 * scaleFactor }}>
            這是首頁內容 {i + 1}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});