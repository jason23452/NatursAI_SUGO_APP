// 後端控制

import { Animated } from "react-native";


export let Bot_Response = "";


export const Number_of_uses: number = 15;

export const sugo = require('@/assets/images/MySugoImg/SUGO.webp');


export let currentValue: number = 40;

export let maxValue: number = 100;





export const progressBarData = [   //還沒定義狀態
    { key: 'satiety', label: '飽食度', currentValue: 40, maxValue: 100, color: '#FD6E72', textColor: '#FD6E72' },
    { key: 'mood', label: '心情', currentValue: 60, maxValue: 100, color: '#F0D97D', textColor: '#F0D97D' },
    { key: 'growth', label: '成長度', currentValue: 80, maxValue: 150, color: '#83BBAE', textColor: '#83BBAE' }
];

export const safeValue = Math.min(Math.max(currentValue, 0), maxValue);
export const percentage = maxValue > 0 ? `${((safeValue / maxValue) * 100).toFixed(1)}%` : "0%";








export const mission_Carousel_items = [
    {
        id: '1',
        title: '任務標題1',
        coinNum: 10,
        maxValue: 100,
        currentValue: 30,
    },
    {
        id: '2',
        title: '任務標題2',
        coinNum: 20,
        maxValue: 200,
        currentValue: 60,
    },
    {
        id: '3',
        title: '任務標題3',
        coinNum: 50,
        maxValue: 500,
        currentValue: 100,
    },
    {
        id: '4',
        title: '任務標題4',
        coinNum: 50,
        maxValue: 500,
        currentValue: 100,
    },
    {
        id: '5',
        title: '任務標題5',
        coinNum: 50,
        maxValue: 500,
        currentValue: 100,
    },
];
















// botReplyGenerator.ts

export const botReplyGenerator = (userMessage: string): string[] => {
    // ✅ 設定機器人回應內容（可以根據 `userMessage` 擴展回應）
    let botReply = "比特幣的區塊鏈網路是由世界各地的節點（Node）組成，沒有任何一個中央伺服器。每個節點都儲存了同樣的區塊鏈帳本，當新的交易發生時，整個網路會同步驗證並更新交易資訊。"; //生城市ai 邏輯
    // ✅ 根據標點符號分割句子
    const sentenceParts = botReply.split(/(?<=[，。！？])/).filter((s) => s.trim() !== "");
    return sentenceParts; // ✅ 回傳分割後的陣列
};








export const generateReply = (
    trimmedMessage: string,
    setBotResponse: React.Dispatch<React.SetStateAction<string>>,
    fadeAnim: Animated.Value,
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
) => {
    // 一開始：打字機啟動 → 設定 isTyping = true
    setIsTyping(true);
    setBotResponse("");

    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
    }).start();

    let partIndex = 0;
    let charIndex = 0;

    const sentenceParts = botReplyGenerator(trimmedMessage);

    const showNextSentence = () => {
        if (partIndex >= sentenceParts.length) {
            // 等 1 秒後淡出
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setBotResponse("");
                    // ★ 全部文字顯示 + 淡出完畢 → isTyping = false
                    setIsTyping(false);
                });
            }, 1000);
            return;
        }

        charIndex = 0;
        const currentSentence = sentenceParts[partIndex];
        if (!currentSentence) {
            // 空段 → 直接跳下一段
            partIndex++;
            showNextSentence();
            return;
        }

        // 顯示第一個字
        setBotResponse(currentSentence[0] || "");

        // 打字計時器
        const typingEffect = setInterval(() => {
            charIndex++;
            if (charIndex < currentSentence.length) {
                setBotResponse((prev) => prev + currentSentence[charIndex]);
            } else {
                clearInterval(typingEffect);

                if (partIndex === sentenceParts.length - 1) {
                    // 最後一段
                    setTimeout(() => {
                        Animated.timing(fadeAnim, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true,
                        }).start(() => {
                            setBotResponse("");
                            // 結束 → 可以再次輸入
                            setIsTyping(false);
                        });
                    }, 1000);
                } else {
                    setTimeout(() => {
                        partIndex++;
                        setBotResponse("");
                        showNextSentence();
                    }, 1000);
                }
            }
        }, 100);
    };

    showNextSentence();
};
