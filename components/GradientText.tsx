import React, { useId } from 'react';
import { ViewStyle } from 'react-native';
import Svg, {
  Text as SvgText,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  TSpan,
} from 'react-native-svg';

interface GradientTextProps {
  text: string;
  /**
   * 可傳入形如 "93deg, #399983 -0.12%, #538AA2 99.93%" 的字串，
   * 第一段為旋轉角度，其餘為漸層停點 (格式：色碼 [空白] 偏移%)。
   * 若同時提供 gradient 與 colors/rotate/colorOffsets，以 gradient 為主。
   */
  gradient?: string;
  // 以下這三個 prop 若 gradient 未傳入才有作用
  colors?: readonly [string, string, ...string[]];
  colorOffsets?: string[];
  rotate?: number; // 單位：deg
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '700' | '500';
  letterSpacing?: number;
  lineHeight?: number;
  fontFamily?: string;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  gradient,
  colors,
  colorOffsets,
  rotate = 0,
  fontSize = 40,
  fontWeight = '700',
  letterSpacing = 2,
  lineHeight = 50,
  fontFamily = 'System',
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
}) => {
  const gradientId = useId();

  // 如果有傳入 gradient 字串，則解析其內容，覆蓋原本的 rotate, colors, colorOffsets
  let parsedRotate = rotate;
  let parsedColors: string[] | undefined = colors ? [...colors] : undefined;
  let parsedColorOffsets: string[] | undefined = colorOffsets ? [...colorOffsets] : undefined;

  if (gradient) {
    // 以逗號分割並去除前後空白
    const parts = gradient.split(',').map((p) => p.trim());
    if (parts.length >= 2) {
      // 第一段為旋轉角度，如 "93deg"；若含有 "deg" 就去掉，轉為數字
      const anglePart = parts[0];
      parsedRotate = anglePart.toLowerCase().endsWith('deg')
        ? parseFloat(anglePart.slice(0, -3))
        : parseFloat(anglePart);

      // 解析剩餘的各個漸層停點
      parsedColors = [];
      parsedColorOffsets = [];
      // parts[1..n] 為漸層停點，每個格式為 "色碼 [偏移%]"，偏移可省略（會依序均分）
      for (let i = 1; i < parts.length; i++) {
        const stop = parts[i];
        // 根據空白分割：例如 "#399983 -0.12%" 會變成 [ "#399983", "-0.12%" ]
        const [stopColor, stopOffset] = stop.split(' ').filter(Boolean);
        parsedColors.push(stopColor);
        if (stopOffset) {
          parsedColorOffsets.push(stopOffset);
        } else {
          // 若未指定 offset，先留空，之後再依照停點數均分
          parsedColorOffsets.push('');
        }
      }
      // 補上未填寫 offset 的值，均分 0% ~ 100%
      parsedColorOffsets = parsedColorOffsets.map((offset, idx) => {
        if (!offset) {
          return `${(idx / (parsedColorOffsets!.length - 1)) * 100}%`;
        }
        return offset;
      });
    }
  }

  // 若仍未設定 parsedColors（例如兩種設定都未傳入），則給一個預設漸層
  if (!parsedColors || parsedColors.length < 2) {
    parsedColors = ['#000', '#fff'];
    parsedColorOffsets = ['0%', '100%'];
  }

  // 預估文字寬高 (僅為粗略估算，實際上可依需求調整)
  const estimatedWidth = fontSize * text.length + letterSpacing * (text.length - 1);
  const estimatedHeight = lineHeight || fontSize * 1.2;

  return (
    <Svg
      height={estimatedHeight}
      width={estimatedWidth}
      viewBox={`0 0 ${estimatedWidth} ${estimatedHeight}`}
      style={style}
    >
      <Defs>
        <SvgLinearGradient
          id={gradientId}
          x1={`${start.x * 100}%`}
          y1={`${start.y * 100}%`}
          x2={`${end.x * 100}%`}
          y2={`${end.y * 100}%`}
          gradientUnits="userSpaceOnUse"
          // 透過 gradientTransform 來旋轉漸層，而非旋轉文字
          gradientTransform={`rotate(${parsedRotate}, ${estimatedWidth / 2}, ${estimatedHeight / 2})`}
        >
          {parsedColors.map((color, index) => (
            <Stop
              key={index}
              offset={
                parsedColorOffsets && parsedColorOffsets[index]
                  ? parsedColorOffsets[index]
                  : `${(index / (parsedColors.length - 1)) * 100}%`
              }
              stopColor={color}
            />
          ))}
        </SvgLinearGradient>
      </Defs>

      <SvgText
        fill={`url(#${gradientId})`}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        letterSpacing={letterSpacing}
        x={estimatedWidth / 2}
        y={estimatedHeight / 2 + fontSize / 3}
        textAnchor="middle"
      >
        <TSpan>{text}</TSpan>
      </SvgText>
    </Svg>
  );
};

export default GradientText;