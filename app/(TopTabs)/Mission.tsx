import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Dimensions } from 'react-native';
import { scaleFactor, isDesktop, PAGE_HEIGHT } from '@/global/DimensionalControl';
import Top_NavBar from '@/app/(TopTabs)/TopNavBar';


export default function Mission() {

  return (
    <View style={[styles.container]}>  
        <Top_NavBar/>


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
  dark: {
    backgroundColor: '#222', // ✅ 深夜模式
  },
});