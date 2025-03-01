

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { scaleFactor, fontFamilyNotoSansTC, fontFamilyNotoSans } from '@/global/DimensionalControl';
import { Card, Mission, Coin_Img, Add_Img } from '@/assets/images/TopNavBarImg/IMG_SVG';
import GradientBackGround from '@/components/GradientBackGround';

let user_Renewal = 1200;


let TopNavBar_Width = 338;
let TopNavBar_Height = 33;




// 📌 定義 RoutePath 類型（方法 3，使用 `as const` 來確保字串不變）
const ROUTES = {
  Renewal: "/(TopTabs)/Renewal",
  Mission: "/(TopTabs)/Mission",
  Card: "/(TopTabs)/Card",


} as const;

type RouteKey = keyof typeof ROUTES; // "Renewal" | "Mission" | "Card"

const Top_NavBar: React.FC = () => {

  const pathname = usePathname(); // 取得當前路徑，用於判斷是否高亮
  const [CurrentPathname, setCurrentPathname] = useState("");

  useEffect(() => {
    if (pathname === "/") {
      setCurrentPathname("/(TopTabs)")
      console.log("/(TopTabs)");

    } else {
      setCurrentPathname("/(TopTabs)" + pathname)
      console.log("/(TopTabs)" + pathname);

    }


  }, [pathname]);

  return (
    <View
      style={[
        styles.TopNavBar_container,
        {
          width: TopNavBar_Width * scaleFactor,// 📌 電腦用 `scaledWidth`，手機用全寬
          height: TopNavBar_Height * scaleFactor,
        },
      ]}
    >




      <Link href={ROUTES.Renewal} asChild>
        <TouchableOpacity
          style={StyleSheet.flatten([styles.TopNavBar, styles.TopNavBar_Renewal])}
        >
          <Coin_Img width={23 * scaleFactor} height={22 * scaleFactor} style={[styles.TopNavBar_Renewal_icon_coin]} />

          <Text style={[styles.text, styles.TopNavBar_Renewal_text]}>
            {user_Renewal}
          </Text>
          <Add_Img width={28 * scaleFactor} height={28 * scaleFactor} style={styles.TopNavBar_Renewal_icon_add} />

        </TouchableOpacity>
      </Link>

      <Link href={ROUTES.Mission} asChild>
        <TouchableOpacity style={StyleSheet.flatten([styles.TopNavBar, styles.TopNavBar_Mission])}>
          <GradientBackGround
            angle={93}
            colors={CurrentPathname === ROUTES.Mission ? ['#399983', '#538AA2'] : ['#FFFFFF', '#FFFFFF']}
            locations={[-0.0012, 0.9993]}
            style={StyleSheet.flatten([styles.TopNavBar, styles.TopNavBar_Mission])}
          >
            <Mission
              width={22 * scaleFactor}
              height={22 * scaleFactor}
              color={CurrentPathname === ROUTES.Mission ? 'white' : '#538AA2'}
              style={styles.TopNavBar_Mission_icon}
            />
            <Text
              style={[
                styles.text,
                styles.TopNavBar_Mission_text,
                { color: CurrentPathname === ROUTES.Mission ? 'white' : '#538AA2' },
              ]}
            >
              任務
            </Text>
          </GradientBackGround>
        </TouchableOpacity>
      </Link>


      <Link href={ROUTES.Card} asChild>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.TopNavBar,
            styles.TopNavBar_Card,
            { backgroundColor: CurrentPathname === ROUTES.Card ? '#538AA2' : '#FEFEFE' }
          ])}
        >
          <Card
            width={18.57 * scaleFactor}
            height={22 * scaleFactor}
            color={CurrentPathname === ROUTES.Card ? "white" : "#538AA2"}
            style={styles.TopNavBar_Card_icon}
          />
        </TouchableOpacity>
      </Link>




    </View>
  );
};

export default Top_NavBar;

const styles = StyleSheet.create({


  TopNavBar_container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    marginTop: 53 * scaleFactor

  },

  TopNavBar: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 28.5,
    backgroundColor: "#FEFEFE",
    height: "100%",
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', // 原生 CSS 陰影
  },



  icon: {
    resizeMode: 'cover', // ✅ React Native 替代 backgroundSize: cover
    alignSelf: 'center', // ✅ 確保圖片垂直置中

  },
  text: {
    fontWeight: 400,
    color: '#538AA2',
    textAlign: "left",
    alignItems: "center",
  },
  text_Noto_Sans_TC: {
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "400",
  },
  text_Noto_Sans: {
    fontFamily: fontFamilyNotoSans,
    fontWeight: "400",
  },


  TopNavBar_Renewal: {
    width: 146 * scaleFactor,
  },
  TopNavBar_Mission: {
    width: 96 * scaleFactor,
  },
  TopNavBar_Card: {
    width: 54 * scaleFactor,
  },
  TopNavBar_Renewal_icon_coin: {
    width: 23 * scaleFactor,
    height: 22 * scaleFactor,
    marginLeft: 7 * scaleFactor
  },
  TopNavBar_Renewal_icon_add: {
    width: 28 * scaleFactor,
    height: 28 * scaleFactor,
    marginLeft: "auto",
    marginRight: 2 * scaleFactor,
  },
  TopNavBar_Mission_icon: {
    marginLeft: 6 * scaleFactor,
  },
  TopNavBar_Card_icon: {
    marginInline: "auto",
  },
  TopNavBar_Renewal_text: {
    fontSize: 16 * scaleFactor,
    lineHeight: 24 * scaleFactor,
    marginLeft: 11 * scaleFactor,

  },
  TopNavBar_Mission_text: {
    fontSize: 15 * scaleFactor,
    lineHeight: 22.5 * scaleFactor,
    marginLeft: 13 * scaleFactor,
  }
});



