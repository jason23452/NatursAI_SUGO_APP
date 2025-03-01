import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientText from '@/components/GradientText';
import { Store, Treasure_Map, My_SUGO, Story_Book, Person } from '@/assets/images/NavBarImg/IMG_SVG';

import { useTheme } from '@/context/ThemeContext';
import { NavBarColor } from '@/constants/NavBarThemes';
import {scaleFactor, BASE_WIDTH, fontFamilyNotoSansTC } from '@/global/DimensionalControl';


const NavBar_Height = 81;

// 📌 你想要連結的路由路徑定義
const ROUTES = {
  Store: "/(tabs)/Store",
  TreasureMap: "/(tabs)/TreasureMap",
  MySugo: "/(tabs)",
  StoryBook: "/(tabs)/StoryBook",
  Person: "/(tabs)/Person/Preson",
} as const;

const NavBar: React.FC = () => {
  const { theme } = useTheme();
  const textColor1 = NavBarColor.NavBarTextColor[theme].Color1;
  const textColor2 = NavBarColor.NavBarTextColor[theme].Color2;
  const textColor3 = NavBarColor.NavBarTextColor[theme].Color3;
  const textColor4 = NavBarColor.NavBarTextColor[theme].Color4;

  const pathname = usePathname(); // 取得當前路徑，用於判斷是否高亮
  const [CurrentPathname, setCurrentPathname] = useState("");

  useEffect(() => {
    if (pathname === "/") {
      setCurrentPathname("/(tabs)")
      console.log("/(tabs)");

    } else {
      setCurrentPathname("/(tabs)" + pathname)
      console.log("/(tabs)" + pathname);

    }


  }, [pathname]);


  return (
    <SafeAreaView
      edges={['bottom']}
      style={[
        styles.navBar,
        {
          width: BASE_WIDTH * scaleFactor,
          height: NavBar_Height * scaleFactor,
        },
      ]}
    >
      {/* === Store 按鈕 === */}
      <Link href={ROUTES.Store} asChild>
        <TouchableOpacity style={styles.navBar_button}>
          <Store
            width={22.5 * scaleFactor}
            height={25 * scaleFactor}
            color={CurrentPathname === ROUTES.Store ? '#399983' : '#C6C6C6'}
            color2={CurrentPathname === ROUTES.Store ? '#538AA2' : '#C6C6C6'}
            borderWidth={0}
          />
          {CurrentPathname === ROUTES.Store ? (
            <GradientText
              text="商品"
              colors={[textColor1, textColor2]}
              colorOffsets={['-0.12%', '50%', '99.93%']}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              rotate={93}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          ) : (
            <GradientText
              text="商品"
              colors={[textColor3, textColor4]}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          )}
        </TouchableOpacity>
      </Link>

      {/* === TreasureMap 按鈕 === */}
      <Link href={ROUTES.TreasureMap} asChild>
        <TouchableOpacity style={styles.navBar_button}>
          <Treasure_Map
            width={22.5 * scaleFactor}
            height={25 * scaleFactor}
            color={CurrentPathname === ROUTES.TreasureMap ? '#399983' : '#C6C6C6'}
            color2={CurrentPathname === ROUTES.TreasureMap ? '#538AA2' : '#C6C6C6'}
            borderWidth={0}
          />
          {CurrentPathname === ROUTES.TreasureMap ? (
            <GradientText
              text="尋寶地圖"
              colors={[textColor1, textColor2]}
              colorOffsets={['-0.12%', '50%', '99.93%']}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              rotate={93}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          ) : (
            <GradientText
              text="尋寶地圖"
              colors={[textColor3, textColor4]}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          )}
        </TouchableOpacity>
      </Link>

      {/* === MySugo 按鈕 === */}
      <Link href={ROUTES.MySugo} asChild>
        <TouchableOpacity style={styles.navBar_button}>
          <My_SUGO
            width={61 * scaleFactor}
            height={61 * scaleFactor}
            color={CurrentPathname === ROUTES.MySugo ? '#399983' : '#C6C6C6'}
            color2={CurrentPathname === ROUTES.MySugo ? '#538AA2' : '#DEDEDE'}
            color3={CurrentPathname === ROUTES.MySugo ? '#85BBE4' : '#DEDEDE'}
            color4={CurrentPathname === ROUTES.MySugo ? 'black' : '#C6C6C6'}
            color5={CurrentPathname === ROUTES.MySugo ? '#85BBE4' : 'white'}
            color6={CurrentPathname === ROUTES.MySugo ? '#399983' : 'white'}
            color7={CurrentPathname === ROUTES.MySugo ? '#538AA2' : 'white'}
            borderWidth={4}
          />
          {CurrentPathname === ROUTES.MySugo ? (
            <GradientText
              text="我的SUGO"
              colors={[textColor1, textColor2]}
              colorOffsets={['-0.12%', '50%', '99.93%']}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              rotate={93}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          ) : (
            <GradientText
              text="我的SUGO"
              colors={[textColor3, textColor4]}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          )}
        </TouchableOpacity>
      </Link>

      {/* === StoryBook 按鈕 === */}
      <Link href={ROUTES.StoryBook} asChild>
        <TouchableOpacity style={styles.navBar_button}>
          <Story_Book
            width={20 * scaleFactor}
            height={25 * scaleFactor}
            color={CurrentPathname === ROUTES.StoryBook ? '#399983' : '#C6C6C6'}
            color2={CurrentPathname === ROUTES.StoryBook ? '#538AA2' : '#C6C6C6'}
            borderWidth={0}
          />
          {CurrentPathname === ROUTES.StoryBook ? (
            <GradientText
              text="故事集"
              colors={[textColor1, textColor2]}
              colorOffsets={['-0.12%', '50%', '99.93%']}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              rotate={93}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          ) : (
            <GradientText
              text="故事集"
              colors={[textColor3, textColor4]}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          )}
        </TouchableOpacity>
      </Link>

      {/* === Person 按鈕 === */}
      <Link href={ROUTES.Person} asChild>
        <TouchableOpacity style={styles.navBar_button}>
          <Person
            width={22.222 * scaleFactor}
            height={25 * scaleFactor}
            color={CurrentPathname === ROUTES.Person ? '#399983' : '#C6C6C6'}
            color2={CurrentPathname === ROUTES.Person ? '#538AA2' : '#C6C6C6'}
            borderWidth={0}
          />
          {CurrentPathname === ROUTES.Person ? (
            <GradientText
              text="個人"
              colors={[textColor1, textColor2]}
              colorOffsets={['-0.12%', '50%', '99.93%']}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              rotate={93}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          ) : (
            <GradientText
              text="個人"
              colors={[textColor3, textColor4]}
              fontSize={15 * scaleFactor}
              letterSpacing={2 * scaleFactor}
              lineHeight={20 * scaleFactor}
              fontFamily={fontFamilyNotoSansTC}
              fontWeight='700'
              style={styles.text}
            />
          )}
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingLeft: 15 * scaleFactor,
    paddingRight: 12.9 * scaleFactor,
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.25)', // Web 原生向上陰影
  },
  navBar_button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10 * scaleFactor,
    marginTop: 8.7 * scaleFactor,
  },
});
