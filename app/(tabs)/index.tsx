import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Platform, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, Animated, Keyboard, Easing } from 'react-native';
import { fontFamilyMontserrat, fontFamilyNotoSansTC, getFontForWeight, scaleFactor } from '@/global/DimensionalControl';
import Top_NavBar from '@/app/(TopTabs)/TopNavBar';
import GradientBackGround from '@/components/GradientBackGround';
import { Card, Exchange, Health, Interaction, Latest_news, Text_mission, Add_file, Talking, Enter, Store, SUGO_Bubble, Progress_Bar, Arrow, Coin_Img } from '@/assets/images/MySugoImg/IMG_SVG';
import { Link, usePathname, useRouter } from 'expo-router';
import { currentValue, generateReply, maxValue, mission_Carousel_items, Number_of_uses, percentage, progressBarData, sugo } from '@/api/MySugoApi';
import Carousel from '@/components/ui/Carousel';
import { Route } from 'expo-router/build/Route';
import ProgressBar from '@/components/ui/ProgressBar';



const ROUTES = {
  Store: "/(tabs)/Store",
  TreasureMap: "/(tabs)/TreasureMap",
  MySugo: "/(tabs)",
  StoryBook: "/(tabs)/StoryBook",
  Person: "/(tabs)/Person/Preson",
  Exchange: "/(tabs)/Person/Exchange",
  LatestNews: "/(tabs)/Person/LatestNews",
  Card: '/(TopTabs)/Card',
  Mission: "/(TopTabs)/Mission"

} as const;





type RouteKey = keyof typeof ROUTES; // "store" | "Treasure_Map" | "My_SUGO" | "Story_Book" | "person"



// ✅ 定義 `DetailsScreen` 組件的 `Props`（目前不需要 props）
const indexScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('互動');
  const [isFocused, setIsFocused] = useState(false); // 追蹤是否聚焦
  const textInputRef = useRef<TextInput>(null);
  const [message, setMessage] = useState<string>("");
  const [botResponse, setBotResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);


  // 淡入淡出
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 中段高度（用 Animated.Value 來平滑增高）
  const midAnimHeight = useRef(new Animated.Value(40 * scaleFactor)).current;
  const [currentMidHeight, setCurrentMidHeight] = useState(40 * scaleFactor);

  // 監聽 midAnimHeight 變動，更新 state
  useEffect(() => {
    const id = midAnimHeight.addListener(({ value }) => {
      setCurrentMidHeight(value);
    });
    return () => {
      midAnimHeight.removeListener(id);
    };
  }, []);

  // 每次 botResponse 改變，就計算新高度
  useEffect(() => {
    // 依字數計算加高量 (範例：每 10 字 + 20)
    const baseMid = 40 * scaleFactor;
    const extra = Math.ceil(botResponse.length / 10) * (20 * scaleFactor);
    const newMid = baseMid + extra;

    Animated.timing(midAnimHeight, {
      toValue: newMid,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [botResponse]);

  // 發送訊息
  const sendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) return;

    console.log("User message:", trimmedMessage);
    generateReply(trimmedMessage, setBotResponse, fadeAnim, setIsTyping);
    Keyboard.dismiss();
    setMessage("");
  }, [message]);

  // 監聽 Enter
  const handleKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (event.nativeEvent.key === "Enter") {
        event.preventDefault?.();
        sendMessage();
      }
    },
    [sendMessage]
  );

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);


  const tabs = [
    { key: '互動', label: '互動', style_text: styles.customTab_text_interaction, icon: <Interaction width={16 * scaleFactor} height={14 * scaleFactor} color={activeTab === '互動' ? 'white' : '#538AA2'} />, style_icon: styles.icon_interaction },
    { key: '健康度', label: '健康度', style_text: styles.customTab_text_health, icon: <Health width={16 * scaleFactor} height={14 * scaleFactor} color={activeTab === '健康度' ? 'white' : '#538AA2'} />, style_icon: styles.icon_health },
    { key: '任務', label: '任務', style_text: styles.customTab_text_mission, icon: <Text_mission width={20 * scaleFactor} height={16 * scaleFactor} color={activeTab === '任務' ? 'white' : '#538AA2'} />, style_icon: styles.icon_mission }
  ];

  // 在 Carousel 組件中使用這些數據
  const carouselItems = mission_Carousel_items.map((item) => (
    <View key={item.id} style={[styles.mission_Carousel_items_container]}>
      <Text style={[styles.mission_Carousel_items_title_text]}>{item.title}</Text>
      <View style={[styles.mission_Carousel_items_Coin_container]}>
        <Text style={[styles.mission_Carousel_items_Coin_text]}>總獎勵</Text>
        <Coin_Img width={22.87 * scaleFactor} height={20.18 * scaleFactor} color="#538AA1" style={{ marginLeft: 11.34 * scaleFactor, marginTop: 1.58 * scaleFactor }} />
        <Text style={[styles.mission_Carousel_items_Coin_num]}>{item.coinNum}</Text>
      </View>
      <Text style={[styles.mission_Carousel_items_schedule_text]}>進度：{item.currentValue}/{item.maxValue}</Text>
      <ProgressBar boxWidth={27.64 * scaleFactor} boxHeight={12.9 * scaleFactor} containerStyle={{ width: 92.13 * scaleFactor, height: 12.9 * scaleFactor, marginTop: 10.8 * scaleFactor, marginLeft: 23.33 * scaleFactor }} maxValue={item.maxValue} currentValue={item.currentValue} />
      <TouchableOpacity style={[styles.mission_Carousel_items_Button]}>
        <Text style={[styles.mission_Carousel_items_Button_text]}>前往賺點</Text>
      </TouchableOpacity>
    </View>
  ));




  const router = useRouter();
  const pathname = usePathname(); // ✅ 取得當前路徑

  const handlePress = (tabName: RouteKey) => {
    router.push(ROUTES[tabName] as any);
  };


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
        <GradientBackGround angle={349} colors={['#538AA2', '#C1DDD7']} locations={[0.327, 0.637]} style={styles.container_bg}>
          <Top_NavBar />
          <View style={[styles.container_bg_circle_contaner]}>
            <Animated.View
              style={[
                styles.SUGO_TEXT_IMG_container,
                {
                  opacity: fadeAnim, // 跟打字機邏輯淡入淡出
                  // 也可用絕對定位 top/left，如原本 style
                },
              ]}
            >
              {/* 1) 三段式氣泡 */}
              <SUGO_Bubble
                width={154 * scaleFactor}      // 這裡假設只用來表示最外層寬度
                topWidth={154 * scaleFactor}   // 這裡才是真正要餵給 top 的寬
                topHeight={16 * scaleFactor}
                midWidth={154 * scaleFactor}
                midHeight={currentMidHeight}   // 如果中段高度是動態的，就直接用動態值
                bottomWidth={154 * scaleFactor}
                bottomHeight={25 * scaleFactor}
                top={2 * scaleFactor}
                bottom={2 * scaleFactor}
              />

              {/* 2) 把文字疊在氣泡上方 (絕對定位) */}
              <View
                style={[
                  styles.SUGO_TEXT_Container,
                  {
                    // 三段總高度 = topHeight + currentMidHeight + bottomHeight
                    height: (16 + 25) * scaleFactor + currentMidHeight,
                  },
                ]}
              >
                <Text style={styles.SUGO_TEXT}>{botResponse}</Text>
              </View>
            </Animated.View>


            <TouchableOpacity style={[styles.Rounter_circle, styles.Card_circle]} onPress={() => handlePress("Card")}>
              <Card width={23 * scaleFactor} height={23 * scaleFactor} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Rounter_circle, styles.Exchange_circle]} onPress={() => handlePress("Exchange")}>
              <Exchange width={33 * scaleFactor} height={21 * scaleFactor} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Rounter_circle, styles.Latest_news_circle]} onPress={() => handlePress("LatestNews")}>
              <Latest_news width={22.22 * scaleFactor} height={25 * scaleFactor} />
            </TouchableOpacity>


            <View style={[styles.container_bg_circle]}>
              <Image
                source={sugo}
                style={styles.SUGO}  // 注意這裡的 style (不是 styles)
              />
            </View>
          </View>

          <View style={[styles.container_bg_2]}>
            <View style={styles.select_contaner}>
              <View style={styles.select_contaner_button_container} >
                {tabs.map(tab => (
                  <TouchableOpacity
                    key={tab.key}
                    style={[styles.tabButton, activeTab === tab.key && styles.active_tabButton]}
                    onPress={() => setActiveTab(tab.key)}
                  >
                    <View style={tab.style_icon}>{tab.icon}</View>

                    <Text style={[styles.customTab_text, tab.style_text, activeTab === tab.key && styles.active_tabText]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={[styles.Line]}></View>
              <View>
                {activeTab === '互動' && (
                  <View style={[styles.interaction_container]}>
                    <TouchableOpacity style={[styles.interaction_Button]}>
                      <Text style={[styles.interaction_Text]}>打招呼</Text>

                    </TouchableOpacity >
                    <TouchableOpacity style={[styles.interaction_Button, { marginTop: 23 * scaleFactor }]}>
                      <Text style={[styles.interaction_Text]}>送禮</Text>

                    </TouchableOpacity >
                    <TouchableOpacity style={[styles.interaction_Button, { marginTop: 23 * scaleFactor }]}>
                      <Text style={[styles.interaction_Text]}>問問題</Text>
                    </TouchableOpacity >
                    <View style={[styles.Free_User_Title_container]}>
                      <View style={[styles.Free_User_Title_text_container]}>
                        <Text style={[styles.Free_User_Title_text]}>免費版每日訊息上限：{Number_of_uses}</Text>
                      </View>
                      <GradientBackGround angle={135} colors={['#399983', '#538AA2']} locations={[0, 1]} style={styles.Free_User_Title_Button}>
                        <TouchableOpacity style={styles.Free_User_Title_Button}>
                          <Text style={[styles.Free_User_Title_Button_text]}>升級會員</Text>
                        </TouchableOpacity>
                      </GradientBackGround >
                    </View>
                    <View
                      style={[
                        styles.input_container,
                        isFocused && styles.input_container_focused, // 當聚焦時 container 會有自訂的 outline
                      ]}
                    >
                      <TextInput
                        ref={textInputRef}
                        style={styles.input} // TextInput 自身不會呈現 outline
                        placeholder={isTyping ? "等等再輸入" : "請輸入文字"}
                        placeholderTextColor="#3F3F46" // 定義 placeholder 的文字顏色
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        multiline={false} // 開啟多行輸入功能
                        value={message}
                        onChangeText={setMessage}
                        onKeyPress={handleKeyPress}
                        onSubmitEditing={sendMessage} // ✅ **iOS / Android**
                        returnKeyType="done" // ✅ **iOS / Android 確保 `Enter` 送出**
                        editable={!isTyping} // ★ 當 isTyping = true 時，無法再編輯
                      />
                      <TouchableOpacity style={{ marginLeft: "auto", marginRight: 16.59 * scaleFactor }} onPress={sendMessage}>
                        <Enter width={30.376 * scaleFactor} height={32 * scaleFactor} color={"#3F3F46"} ></Enter>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {activeTab === '健康度' && (
                  <View style={[styles.health_container]}>
                    <View style={[styles.Health_Progress_Bar_container]}>
                      {progressBarData.map(({ key, label, currentValue, maxValue, color, textColor }) => (
                        <View key={key} style={[styles.Health_Progress_Bar]}>
                          <View style={[styles.Health_Progress_Bar_text_container]}><Text style={[styles.Health_Progress_Bar_text, { color: "#538AA2" }]}>{label}</Text></View>
                          <Progress_Bar currentValue={currentValue} maxValue={maxValue} width={174 * scaleFactor} height={17 * scaleFactor} color={color} />
                          <View style={[styles.Health_Progress_Bar_text_container]}><Text style={[styles.Health_Progress_Bar_text, { color: textColor }]}>{`${((currentValue / maxValue) * 100).toFixed(1)}%`}</Text></View>
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity style={[styles.Health_container_button]} onPress={() => handlePress("Store")}>
                      <Image style={[styles.Health_container_Imgage]} source={require('@/assets/images/MySugoImg/Health_router_button.webp')} ></Image>
                      <View style={[styles.Health_container_Imgage_text_container]}>
                        <Text style={[styles.Health_container_Imgage_text_title]}>SUGO商店</Text>
                        <Text style={[styles.Health_container_Imgage_text_content]}>SUGO SHOP</Text>
                      </View>
                      <Arrow width={34 * scaleFactor} height={34 * scaleFactor} color='#FFF' color2='#538AA2' style={[styles.mission_container_Imgage_arrow]} />
                    </TouchableOpacity>


                  </View>

                )}
                {activeTab === '任務' && (
                  <View style={[styles.mission_container]}>
                    <Carousel
                      containerWidth={374 * scaleFactor}
                      containerHeight={170 * scaleFactor}
                      itemWidth={300 * scaleFactor}
                      itemHeight={165 * scaleFactor}
                      centerOffset={37 * scaleFactor}
                      leftOffset={350 * scaleFactor} // 調整左側 item 偏移
                      rightOffset={350 * scaleFactor} // 調整右側 item 偏移
                      items={carouselItems}
                    />
                    {/* <Link href={ROUTES.Mission} asChild> */}
                    <TouchableOpacity style={[styles.mission_container_button]} onPress={() => handlePress("Mission")}>
                      <Image style={[styles.mission_container_Imgage]} source={require('@/assets/images/MySugoImg/mission_router_button.webp')} ></Image>
                      <View style={[styles.mission_container_Imgage_text_container]}>
                        <Text style={[styles.mission_container_Imgage_text_title]}>任務/活動</Text>
                        <Text style={[styles.mission_container_Imgage_text_content]}>Goal</Text>
                      </View>
                      <Arrow width={34 * scaleFactor} height={34 * scaleFactor} color='#FFF' color2='#538AA2' style={[styles.mission_container_Imgage_arrow]} />
                    </TouchableOpacity>
                    {/* </Link> */}

                  </View>
                )}
              </View>



            </View>
            <TouchableOpacity style={[styles.Sugo_shop_button_container]} onPress={() => handlePress("Store")}>

              <GradientBackGround angle={274} colors={['#538AA2', '#C1DDD7']} locations={[0.0177, 0.9181]} style={[styles.Sugo_shop_button]}>
                <Text style={[styles.Sugo_shop_text]}>SUGO SHOP</Text>
                <Store width={27 * scaleFactor} height={30 * scaleFactor} style={{ marginLeft: 16 * scaleFactor }} color={"white"}></Store>
                <View style={[styles.Sugo_shop_goto_button]}>
                  <Text style={[styles.Sugo_shop_goto_button_text]}>前往</Text>
                </View>
              </GradientBackGround>


            </TouchableOpacity>
          </View>


        </GradientBackGround>








      </ScrollView>
    </View>
  );
};

export default indexScreen;

// ✅ `Styles` 類型定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  dark: {
    backgroundColor: '#222', // ✅ 深夜模式
  },
  container_bg: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: 884 * scaleFactor,


  },
  container_bg_2: {
    width: 412 * scaleFactor,
    height: 398 * scaleFactor,
    position: "relative",
    marginTop: 65 * scaleFactor,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    flexDirection: "row",
    justifyContent: "center",


  },
  container_bg_circle_contaner: {
    width: 373.91 * scaleFactor,
    height: 296 * scaleFactor,
    marginTop: 125 * scaleFactor,
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container_bg_circle: {
    width: 286 * scaleFactor,
    height: 286 * scaleFactor,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 286,
    backgroundColor: "white",
  },
  SUGO_TEXT_IMG_container: {
    width: 154 * scaleFactor,
    height: 85.5 * scaleFactor,
    position: "absolute",
    zIndex: 5,
    top: -10 * scaleFactor,
    left: -5 * scaleFactor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  SUGO_TEXT_Container: {
    position: "absolute",
    zIndex: 6,
    width: 154 * scaleFactor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  SUGO_TEXT: {
    letterSpacing: 0.65 * scaleFactor,
    fontSize: 13 * scaleFactor,
    textAlign: "center",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    color: "white",
  },

  Rounter_circle: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    width: 58.909 * scaleFactor,
    height: 58.909 * scaleFactor,
    borderRadius: 64,
    backgroundColor: "white",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  Card_circle: {
    left: 20 * scaleFactor,
    bottom: 92.09 * scaleFactor,
  },
  Exchange_circle: {
    top: 5 * scaleFactor,
    right: 71 * scaleFactor,
  },
  Latest_news_circle: {
    right: 15 * scaleFactor,
    top: 103 * scaleFactor,
  },



  SUGO: {
    width: 166 * scaleFactor,
    height: 159.15 * scaleFactor,
  },
  SUGO_floor: {
    position: "absolute",
    bottom: 70.05 * scaleFactor,
    width: 132.753 * scaleFactor,
    height: 12.951 * scaleFactor,

  },
  select_contaner: {
    flexDirection: "column",
    alignItems: "center",
    top: -116 * scaleFactor,
    width: 374 * scaleFactor,
    height: 402 * scaleFactor,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 16,
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

  },
  select_contaner_button_container: {
    width: 332.23 * scaleFactor,
    height: 34 * scaleFactor,
    flexDirection: "row",
    marginTop: 21,
    alignItems: "center",
    justifyContent: "space-between",

  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 99.13 * scaleFactor,
    height: "100%",
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: "#538AA2",
    borderWidth: 1,
  },
  active_tabButton: {
    backgroundColor: '#538AA2',
  },
  customTab_text: {
    textAlign: "right",
    color: "#538AA2",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    letterSpacing: 2.6 * scaleFactor,
    fontSize: 13 * scaleFactor,
  },
  active_tabText: {
    color: "white",

  },
  customTab_text_interaction: {
    width: 39 * scaleFactor,
    marginLeft: 3 * scaleFactor,
  },
  customTab_text_health: {
    width: 57 * scaleFactor,
    marginLeft: 2 * scaleFactor,

  },
  customTab_text_mission: {
    width: 33 * scaleFactor,
    marginLeft: 5 * scaleFactor,
  },
  icon_interaction: {
    marginLeft: 20.12 * scaleFactor,

  },
  icon_health: {
    marginLeft: 11.12 * scaleFactor,

  },
  icon_mission: {
    marginLeft: 21.02 * scaleFactor,

  },
  Line: {
    width: 337.93 * scaleFactor,
    height: 1,
    backgroundColor: "#F6F6F6",
    marginTop: 15 * scaleFactor,
  },
  interaction_container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 9.99 * scaleFactor,
    width: 340.78 * scaleFactor,
    height: 293 * scaleFactor,
  },
  interaction_Button: {
    flexDirection: "row",
    alignItems: "center",
    width: 324 * scaleFactor,
    height: 38 * scaleFactor,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    // iOS 陰影
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', // 原生 CSS 陰影
  },
  interaction_Text: {
    width: 271 * scaleFactor,
    marginLeft: 26 * scaleFactor,
    textAlign: "left",
    color: "#538AA2",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    fontSize: 15 * scaleFactor,
    letterSpacing: 3 * scaleFactor,
  },
  Free_User_Title_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 43 * scaleFactor,
    width: 301.18 * scaleFactor,
    height: 31 * scaleFactor,
  },
  Free_User_Title_text_container: {
    flexDirection: "row",             // 水平排列
    justifyContent: "center",         // 水平置中
    alignItems: "center",
    width: 202 * scaleFactor,         // 設定寬度
    height: 50 * scaleFactor,         // ✅ 確保有明確的高度
  },
  Free_User_Title_text: {
    color: "#3F3F46",
    fontFamily: fontFamilyMontserrat,
    fontWeight: "600",
    fontSize: 15 * scaleFactor,
    letterSpacing: 1.5 * scaleFactor,
    textAlign: "center",              // ✅ 確保文字在區塊內水平置中
  },
  Free_User_Title_Button: {
    width: 92.076 * scaleFactor,
    height: 26 * scaleFactor,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Free_User_Title_Button_text: {
    color: "white",
    textAlign: "center",
    fontFamily: fontFamilyMontserrat,
    fontWeight: "600",
    fontSize: 15 * scaleFactor,
    letterSpacing: 1.5 * scaleFactor,

  },
  input_container: {
    marginTop: 8 * scaleFactor,
    flexDirection: "row",
    alignItems: "center",
    width: 340.777 * scaleFactor,
    height: 51 * scaleFactor,
    borderRadius: 32.5 * scaleFactor,
    backgroundColor: "#FAFAFA",
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', // Web 專用
  },
  input_container_focused: {
    borderWidth: 2, // 新增邊框
    borderColor: 'black',
  },
  input: {
    // 移除瀏覽器預設的 focus outline (僅針對 web)
    ...Platform.select({
      web: {
        outlineStyle: 'none',     // 移除瀏覽器預設的 focus outline
        display: 'flex',          // 使用 Flexbox 排版
        alignItems: 'center',     // 垂直置中
      },
    }),
    height: "auto",
    width: 300 * scaleFactor,
    paddingLeft: 22.78 * scaleFactor,
    fontSize: 15 * scaleFactor,
    fontFamily: fontFamilyMontserrat,
    fontWeight: "600",
    letterSpacing: 1.5 * scaleFactor,
  },
  Sugo_shop_button_container: {
    width: 374 * scaleFactor,
    height: 71 * scaleFactor,
    position: "absolute",
    bottom: 25 * scaleFactor,
  },
  Sugo_shop_button: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  Sugo_shop_text: {
    marginLeft: 19 * scaleFactor,
    color: "white",
    textAlign: "center",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    fontSize: 20 * scaleFactor,
    letterSpacing: 4 * scaleFactor,
  },
  Sugo_shop_goto_button: {
    marginLeft: 17 * scaleFactor,
    width: 111 * scaleFactor,
    height: 38 * scaleFactor,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#538AA2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  Sugo_shop_goto_button_text: {
    color: "#538AA2",
    textAlign: "center",
    fontSize: 20 * scaleFactor,
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    letterSpacing: 4 * scaleFactor
  },

  health_container: {
    width: 328 * scaleFactor,
    height: 157 * scaleFactor,
    marginTop: 34.99 * scaleFactor,
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  Health_Progress_Bar_container: {
    width: 338 * scaleFactor,
    height: 139 * scaleFactor,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  Health_Progress_Bar: {
    width: "100%",
    height: 25 * scaleFactor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Health_Progress_Bar_text_container: {
    width: 71 * scaleFactor,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Health_Progress_Bar_text: {
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    fontSize: 13 * scaleFactor,
  },
  Health_container_button: {
    marginTop: 33 * scaleFactor,
    width: 334 * scaleFactor,
    height: 95 * scaleFactor,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },


  Health_container_Imgage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    zIndex: 5,
    top: 0,
  },
  Health_container_Imgage_text_container: {
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 6,
    top: 8 * scaleFactor,
    left: 13 * scaleFactor,
  },
  Health_container_Imgage_text_title: {
    width: "auto",
    height: "auto",
    color: "white",
    textAlign: "center",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    fontSize: 24 * scaleFactor,
    letterSpacing: 4.8 * scaleFactor,
  },
  Health_container_Imgage_text_content: {
    width: "auto",
    height: "auto",
    color: "white",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    fontSize: 10 * scaleFactor,
    letterSpacing: 2 * scaleFactor,

  },
  Health_container_Imgage_arrow: {
    position: "absolute",
    zIndex: 6,
    top: 31 * scaleFactor,
    right: 33 * scaleFactor,
  },





  mission_container: {
    marginTop: 15 * scaleFactor,
    width: 374 * scaleFactor,
    height: 287 * scaleFactor,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",


  },
  mission_container_button: {
    width: 334 * scaleFactor,
    height: 95 * scaleFactor,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },
  mission_container_Imgage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    zIndex: 5,
    top: 0,
  },
  mission_container_Imgage_text_container: {
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 6,
    top: 8 * scaleFactor,
    left: 21 * scaleFactor,
  },
  mission_container_Imgage_text_title: {
    width: "auto",
    height: "auto",
    color: "white",
    textAlign: "center",
    fontFamily: getFontForWeight("NotoSansTC", "700"),
    fontSize: 24 * scaleFactor,
    letterSpacing: 4.8 * scaleFactor,
  },
  mission_container_Imgage_text_content: {
    width: "auto",
    height: "auto",
    marginLeft: 10 * scaleFactor,
    color: "white",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    fontSize: 10 * scaleFactor,
    letterSpacing: 2 * scaleFactor,
  },
  mission_container_Imgage_arrow: {
    position: "absolute",
    zIndex: 6,
    top: 31 * scaleFactor,
    right: 33 * scaleFactor,
  },


  mission_Carousel_items_container: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "relative",
    backgroundColor: "#FAFAFA",
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  mission_Carousel_items_title_text: {
    width: "auto",
    height: "auto",
    marginLeft: 23 * scaleFactor,
    marginTop: 15 * scaleFactor,
    color: "#3F3F46",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "900",
    fontSize: 15 * scaleFactor,
    userSelect: 'none', // 禁止選中文字
  },
  mission_Carousel_items_Coin_container: {
    width: 87 * scaleFactor,
    height: 23 * scaleFactor,
    flexDirection: "row",
    marginLeft: 23 * scaleFactor,
    marginTop: 35.58 * scaleFactor,
    userSelect: 'none', // 禁止選中文字

  },
  mission_Carousel_items_Coin_text: {
    width: 30 * scaleFactor,
    height: 12 * scaleFactor,
    marginTop: 2.22 * scaleFactor,
    fontSize: 8 * scaleFactor,
    color: "#C6C6C6",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    letterSpacing: 0.8 * scaleFactor,
    textAlign: "center",
    userSelect: 'none', // 禁止選中文字

  },
  mission_Carousel_items_Coin_num: {
    width: "auto",
    height: "auto",
    marginBlock: "auto",
    marginLeft: 8.79 * scaleFactor,
    textAlign: "center",
    color: "#538AA2",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    fontSize: 15 * scaleFactor,
    userSelect: 'none', // 禁止選中文字

  },
  mission_Carousel_items_schedule_text: {
    width: "auto",
    height: "auto",
    marginTop: 18.9 * scaleFactor,
    marginLeft: 23.33 * scaleFactor,
    color: "#538AA2",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    fontSize: 10 * scaleFactor,
    userSelect: 'none', // 禁止選中文字

  },
  mission_Carousel_items_Button: {
    position: "absolute",
    bottom: 16.96 * scaleFactor,
    right: 23.13 * scaleFactor,
    width: 102.8 * scaleFactor,
    height: 29.9 * scaleFactor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#83BBAE",
    borderWidth: 1.5 * scaleFactor,
    backgroundColor: "#F6F6F6",
    userSelect: 'none', // 禁止選中文字

  },
  mission_Carousel_items_Button_text: {
    textAlign: "center",
    fontSize: 10 * scaleFactor,
    color: "#83BBAE",
    fontFamily: fontFamilyNotoSansTC,
    fontWeight: "700",
    letterSpacing: 2.5 * scaleFactor,
    userSelect: 'none', // 禁止選中文字
  }



});