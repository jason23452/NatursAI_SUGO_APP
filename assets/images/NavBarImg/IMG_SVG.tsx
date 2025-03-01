import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Svg, Path, Rect, Defs, LinearGradient, Stop, G } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  color6?: string;
  color7?: string;
  borderWidth: number; // ✅ 這是必填
  style?: StyleProp<ViewStyle>;  // ✅ 新增 style 屬性

}




// ✅ Store Icon
export const Store: React.FC<IconProps> = ({ width = 25, height = 27, color = '#C6C6C6', color2 = '#C6C6C6', borderWidth = 0 }) => (
  <Svg width={width} height={height} viewBox="0 0 25 27" fill="none">
    <Path d="M1 6L4.75 1L19.75 1L23.5 6M1 6V23.5C1 24.163 1.26339 24.7989 1.73223 25.2678C2.20107 25.7366 2.83696 26 3.5 26H21C21.663 26 22.2989 25.7366 22.7678 25.2678C23.2366 24.7989 23.5 24.163 23.5 23.5V6M1 6H23.5M17.25 11C17.25 12.3261 16.7232 13.5979 15.7855 14.5355C14.8479 15.4732 13.5761 16 12.25 16C10.9239 16 9.65215 15.4732 8.71447 14.5355C7.77678 13.5979 7.25 12.3261 7.25 11"
      stroke={`url(#paint0_linear_Store)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Defs>
      <LinearGradient id="paint0_linear_Store" x1="0.97" y1="0.98" x2="24.77" y2="2.28" gradientUnits="userSpaceOnUse">
        <Stop stopColor={color} />
        <Stop offset="1" stopColor={color2} />
      </LinearGradient>
    </Defs>
  </Svg>
);

// ✅ Treasure_Map Icon
export const Treasure_Map: React.FC<IconProps> = ({ width = 24, height = 24, color = '#000', color2 = '#000', borderWidth = 0, }) => (
  <Svg width={width} height={height} viewBox="0 0 23 27" fill="none">
    <Path d="M21.45 11.23C21.45 19.18 11.23 26 11.23 26C11.23 26 1 19.18 1 11.23C1 8.51 2.08 5.91 4 3.99C5.91 2.08 8.51 1 11.23 1C13.94 1 16.54 2.08 18.46 3.99C20.38 5.91 21.45 8.51 21.45 11.23Z"
      stroke={`url(#paint0_linear_Treasure)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11.23 14.64C13.11 14.64 14.64 13.11 14.64 11.23C14.64 9.34 13.11 7.82 11.23 7.82C9.34 7.82 7.82 9.34 7.82 11.23C7.82 13.11 9.34 14.64 11.23 14.64Z"
      stroke={`url(#paint1_linear_Treasure)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Defs>
      <LinearGradient id="paint0_linear_Treasure" x1="0.97" y1="0.98" x2="22.62" y2="2.05" gradientUnits="userSpaceOnUse">
        <Stop stopColor={color} />
        <Stop offset="1" stopColor={color2} />
      </LinearGradient>
      <LinearGradient id="paint1_linear_Treasure" x1="0.97" y1="0.98" x2="22.62" y2="2.05" gradientUnits="userSpaceOnUse">
        <Stop stopColor={color} />
        <Stop offset="1" stopColor={color2} />
      </LinearGradient>
    </Defs>
  </Svg>
);




export const My_SUGO: React.FC<IconProps> = ({
  width = 70,
  height = 69,
  color = '#399983',
  color2 = '#538AA2',
  color3 = '#85BBE4',
  color4 = '#85BBE4',
  color5 = '#85BBE4',
  color6 = '#85BBE4',
  color7 = '#85BBE4',
  borderWidth = 4, // 若不再需要動態邊框，可自行刪除
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 70 69"
      fill="none"
    >
      {/* 外圍圓角矩形 + 漸層描邊 */}
      <Rect
        x={2.02588}
        y={2}
        width={65}
        height={65}
        rx={32.5}
        fill="white"
        stroke="url(#paint0_linear_334_1934)"
        strokeWidth={borderWidth}
      />

      {/* 以下為主要圖案 paths */}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.9445 28.0332C49.9812 26.8438 50.6734 25.3337 50.8469 23.6448C51.2936 19.2951 48.1296 15.4068 43.7799 14.9601C41.0279 14.6775 38.908 15.202 37.2544 15.8295C36.8278 15.9914 36.088 16.3052 35.8811 16.393C35.8502 16.4061 35.8311 16.4142 35.8268 16.416C35.5697 16.5213 35.4816 16.5463 35.4411 16.5567C34.1486 16.8896 33.1502 17.4156 32.5529 17.7618C32.3134 17.9007 32.0988 18.0344 31.932 18.1407C29.4231 18.676 26.066 19.7444 23.284 21.8174C22.1454 22.6659 20.7886 23.7287 19.4621 25.105C19.4441 25.1217 19.3884 25.1742 19.2646 25.2903C19.0817 25.4619 18.6978 25.8228 18.2983 26.2686C17.6873 26.9504 15.8172 29.1231 15.7066 32.4456C15.6298 34.7543 16.5296 36.4434 16.8921 37.0712C17.3421 37.8503 17.8326 38.4404 18.1255 38.7737C18.6324 39.3504 19.4119 40.0828 19.2433 39.9172C19.8697 40.5324 20.5304 41.1002 21.2252 41.6185C20.2873 42.7997 19.6761 44.2614 19.5411 45.8771C19.177 50.2345 22.4142 54.062 26.7716 54.4261C26.8795 54.4351 26.9897 54.4444 27.1022 54.4539C28.2058 54.5467 29.5224 54.6574 30.8236 54.7108C31.4596 54.7369 32.544 54.7682 33.7429 54.612C33.8279 54.601 33.9054 54.5902 33.9703 54.5809C34.0341 54.5718 34.0945 54.5629 34.1397 54.5562L34.1612 54.5531C34.1865 54.5493 34.207 54.5463 34.2258 54.5435C35.9991 54.4684 37.6114 54.0253 38.5812 53.7058C38.7985 53.6342 38.8495 53.6202 38.9301 53.598C39.0249 53.5719 39.1607 53.5345 39.6556 53.3791C40.1637 53.2196 40.9665 52.9526 41.8427 52.5238C41.8572 52.518 41.8749 52.511 41.8964 52.5026C41.9763 52.4711 42.1582 52.4001 42.3495 52.32C42.5508 52.2357 42.8227 52.1168 43.1289 51.9631C43.9853 51.5332 44.7856 51.0257 45.2008 50.7624C45.2486 50.7321 45.2912 50.705 45.3283 50.6817C46.7491 49.7872 47.9579 48.7525 49.0776 47.3956C49.4801 46.9077 49.8326 46.4333 50.069 46.1149L50.0753 46.1064C50.3433 45.7455 50.4819 45.5589 50.6188 45.3885C51.6349 44.124 53.248 41.8176 53.812 38.7747C53.7653 39.0267 54.0387 37.7961 54.0694 36.6399C54.093 35.7498 54.1092 32.2101 51.0659 29.5505C50.3658 28.9387 49.6551 28.4389 48.9445 28.0332Z"
        fill="url(#paint1_linear_334_1934)"
      />
      <Path
        d="M45.0954 35.1827C43.7771 41.1211 40.1488 44.7745 34.7879 46.5949C30.1176 44.6615 26.1754 40.3803 25.3468 34.8311C24.2671 29.056 29.2821 23.2682 35.1897 23.2682C41.0973 23.2682 46.2881 28.4784 45.0954 35.1827Z"
        fill="url(#paint2_linear_334_1934)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.3468 34.8311C26.1754 40.3803 30.1176 44.6615 34.7879 46.5949C40.1488 44.7745 43.7771 41.1211 45.0954 35.1827C46.2881 28.4784 41.0973 23.2682 35.1897 23.2682C29.2821 23.2682 24.2671 29.056 25.3468 34.8311ZM43.801 34.9244C42.6237 40.1906 39.5188 43.4508 34.837 45.1779C30.738 43.3137 27.3761 39.4866 26.6518 34.6363L26.6483 34.6124L26.6438 34.5886C25.7235 29.6661 30.066 24.5878 35.1897 24.5878C40.3377 24.5878 44.8192 29.1089 43.801 34.9244Z"
        fill={color4}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.7964 46.3178C40.0216 44.5443 43.5582 40.9853 44.8431 35.2003C44.9893 34.3789 45.0371 33.5805 44.9974 32.8123C44.975 33.2079 44.9242 33.611 44.8431 34.0204C43.5582 39.2173 40.0216 42.4146 34.7964 44.0077C30.2442 42.3157 26.4017 38.5691 25.5941 33.7128C25.5296 33.4031 25.4874 33.0933 25.4664 32.7847C25.4248 33.4689 25.4642 34.1635 25.5941 34.8579C26.4017 40.2637 30.2442 44.4343 34.7964 46.3178Z"
        fill={color4}

      />
      <Path
        d="M39.6875 32.8224C39.6875 34.9649 37.9506 36.7018 35.8081 36.7018C33.6655 36.7018 31.9286 34.9649 31.9286 32.8224C31.9286 30.6798 33.6655 28.943 35.8081 28.943C37.9506 28.943 39.6875 30.6798 39.6875 32.8224Z"
        fill="url(#paint1_linear_334_1934)"
      />
      
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.8081 35.7121C37.404 35.7121 38.6978 34.4183 38.6978 32.8224C38.6978 31.2264 37.404 29.9326 35.8081 29.9326C34.2121 29.9326 32.9183 31.2264 32.9183 32.8224C32.9183 34.4183 34.2121 35.7121 35.8081 35.7121ZM35.8081 36.7018C37.9506 36.7018 39.6875 34.9649 39.6875 32.8224C39.6875 30.6798 37.9506 28.943 35.8081 28.943C33.6655 28.943 31.9286 30.6798 31.9286 32.8224C31.9286 34.9649 33.6655 36.7018 35.8081 36.7018Z"
        fill={color4}
      />

      {/* 線性漸層定義 */}
      <Defs>
        <LinearGradient
          id="paint0_linear_334_1934"
          x1="3.94761"
          y1="3.96471"
          x2="68.4404"
          y2="7.87258"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={color} />
          <Stop offset={1} stopColor={color2} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_334_1934"
          x1="25.1737"
          y1="23.2547"
          x2="46.4109"
          y2="24.3618"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color3} />
          <Stop offset={1} stopColor={color3} />
        </LinearGradient>

        <LinearGradient
          id="paint2_linear_334_1934"
          x1="25.1737"
          y1="23.2547"
          x2="46.4109"
          y2="24.3618"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color5} />
          <Stop offset={1} stopColor={color6} />
        </LinearGradient>

      </Defs>
    </Svg>
  );
};


// ✅ Story_Book Icon
export const Story_Book: React.FC<IconProps> = ({ width = 24, height = 24, color = '#000', color2 = '#000', borderWidth = 0, }) => (
  <Svg width={width} height={height} viewBox="0 0 22 27" fill="none">
    <Path d="M1 22.875C1 22.0462 1.32924 21.2513 1.91529 20.6653C2.50134 20.0792 3.2962 19.75 4.125 19.75H21M1 22.875C1 23.7038 1.32924 24.4987 1.91529 25.0847C2.50134 25.6708 3.2962 26 4.125 26H21V1H4.125C3.2962 1 2.50134 1.32924 1.91529 1.91529C1.32924 2.50134 1 3.2962 1 4.125V22.875Z"
      stroke="url(#paint0_linear_Story)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Defs>
      <LinearGradient id="paint0_linear_Story" x1="1" y1="1" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <Stop stopColor={color} />
        <Stop offset="1" stopColor={color2} />
      </LinearGradient>
    </Defs>
  </Svg>
);

// ✅ Person Icon
export const Person: React.FC<IconProps> = ({ width = 24, height = 24, color = '#000', color2 = '#000', borderWidth = 0, }) => (
  <Svg width={width} height={height} viewBox="0 0 25 27" fill="none">
    <Path d="M23.27 26V23.22C23.27 21.75 22.69 20.34 21.65 19.29C20.6 18.25 19.19 17.67 17.72 17.67H6.61C5.13 17.67 3.72 18.25 2.68 19.29C1.64 20.34 1.05 21.75 1.05 23.22V26M17.72 6.56C17.72 9.62 15.23 12.11 12.16 12.11C9.09 12.11 6.61 9.62 6.61 6.56C6.61 3.49 9.09 1 12.16 1C15.23 1 17.72 3.49 17.72 6.56Z"
      stroke="url(#paint0_linear_Person)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Defs>
      <LinearGradient id="paint0_linear_Person" x1="1" y1="1" x2="25" y2="2" gradientUnits="userSpaceOnUse">
        <Stop stopColor={color} />
        <Stop offset="1" stopColor={color2} />
      </LinearGradient>
    </Defs>
  </Svg>
);