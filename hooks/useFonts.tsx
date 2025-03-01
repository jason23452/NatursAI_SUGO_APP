import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // Noto Sans TC 字體
        'NotoSansTC-100': require('../assets/fonts/NotoSansTC-Thin.ttf'),
        'NotoSansTC-200': require('../assets/fonts/NotoSansTC-ExtraLight.ttf'),
        'NotoSansTC-300': require('../assets/fonts/NotoSansTC-Light.ttf'),
        'NotoSansTC-400': require('../assets/fonts/NotoSansTC-Regular.ttf'),
        'NotoSansTC-500': require('../assets/fonts/NotoSansTC-Medium.ttf'),
        'NotoSansTC-600': require('../assets/fonts/NotoSansTC-SemiBold.ttf'),
        'NotoSansTC-700': require('../assets/fonts/NotoSansTC-Bold.ttf'),
        'NotoSansTC-800': require('../assets/fonts/NotoSansTC-ExtraBold.ttf'),
        'NotoSansTC-900': require('../assets/fonts/NotoSansTC-Black.ttf'),

        // NotoSans 字體
        'NotoSans-100': require('../assets/fonts/NotoSans-Thin.ttf'),
        'NotoSans-200': require('../assets/fonts/NotoSans-ExtraLight.ttf'),
        'NotoSans-300': require('../assets/fonts/NotoSans-Light.ttf'),
        'NotoSans-400': require('../assets/fonts/NotoSans-Regular.ttf'),
        'NotoSans-500': require('../assets/fonts/NotoSans-Medium.ttf'),
        'NotoSans-600': require('../assets/fonts/NotoSans-SemiBold.ttf'),
        'NotoSans-700': require('../assets/fonts/NotoSans-Bold.ttf'),
        'NotoSans-800': require('../assets/fonts/NotoSans-ExtraBold.ttf'),
        'NotoSans-900': require('../assets/fonts/NotoSans-Black.ttf'),


         // Roboto 字體
         'Montserrat-100': require('../assets/fonts/Montserrat-Thin.ttf'),
         'Montserrat-200': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
         'Montserrat-300': require('../assets/fonts/Montserrat-Light.ttf'),
         'Montserrat-400': require('../assets/fonts/Montserrat-Regular.ttf'),
         'Montserrat-500': require('../assets/fonts/Montserrat-Medium.ttf'),
         'Montserrat-600': require('../assets/fonts/Montserrat-SemiBold.ttf'),
         'Montserrat-700': require('../assets/fonts/Montserrat-Bold.ttf'),
         'Montserrat-800': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
         'Montserrat-900': require('../assets/fonts/Montserrat-Black.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
