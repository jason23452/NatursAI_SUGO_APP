import { Dimensions } from 'react-native';

// 設定基準尺寸
export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 884;

export const PAGE_HEIGHT = 803;





export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export let fontFamily_select: any;





// 判斷是否為電腦端
export const isDesktop = screenWidth > 500;

// 設定縮放比例
export let scaleFactor: number;


if (isDesktop) {
  // 大於 500 等比例放大 1.5 倍
  scaleFactor = 1.5;
} else if (screenWidth > BASE_WIDTH) {
  // 介於 412 ~ 500 等比例放大
  scaleFactor = screenWidth / BASE_WIDTH;
} else {
  // 小於 412 等比例縮小
  scaleFactor = screenWidth / BASE_WIDTH;
}

export let scaledWidth = isDesktop ? BASE_WIDTH * scaleFactor : screenWidth; // 📌 確保為 `number`
// export let scaledHeight = isDesktop ? BASE_HEIGHT * scaleFactor : screenHeight; // 📌 確保為 `number`

export const fontFamilyNotoSansTC: string = "NotoSansTC"
export const fontFamilyNotoSans: string = "NotoSans"
export const fontFamilyMontserrat: string = "Montserrat"



export const getFontForWeight = (fontFamily: string, weight: string) => {
  if (fontFamily === 'NotoSansTC') {
    switch (weight) {
      case '100': return 'NotoSansTC-100';
      case '200': return 'NotoSansTC-200';
      case '300': return 'NotoSansTC-300';
      case '400': return 'NotoSansTC-400';
      case '500': return 'NotoSansTC-500';
      case '600': return 'NotoSansTC-600';
      case '700': return 'NotoSansTC-700';
      case '800': return 'NotoSansTC-800';
      case '900': return 'NotoSansTC-900';
      default: return 'NotoSansTC-400';
    }
  }

  if (fontFamily === 'NotoSans') {
    switch (weight) {
      case '100': return 'NotoSans-100';
      case '200': return 'NotoSans-200';
      case '300': return 'NotoSans-300';
      case '400': return 'NotoSans-400';
      case '500': return 'NotoSans-500';
      case '600': return 'NotoSans-600';
      case '700': return 'NotoSans-700';
      case '800': return 'NotoSans-800';
      case '900': return 'NotoSans-900';
      default: return 'NotoSans-400';
    }
  }

  if (fontFamily === 'Montserrat') {
    switch (weight) {
      case '100': return 'Montserrat-100';
      case '200': return 'Montserrat-200';
      case '300': return 'Montserrat-300';
      case '400': return 'Montserrat-400';
      case '500': return 'Montserrat-500';
      case '600': return 'Montserrat-600';
      case '700': return 'Montserrat-700';
      case '800': return 'Montserrat-800';
      case '900': return 'Montserrat-900';
      default: return 'Montserrat-400';
    }
  }

  return 'NotoSans-400'; // 預設回傳
};











// **新增 default export**
const utils = {
  isDesktop,
  scaleFactor,


};

export default utils;