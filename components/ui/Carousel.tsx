import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Animated, PanResponder, Platform, StyleSheet } from 'react-native';

interface CarouselProps {
  containerWidth: number;
  containerHeight: number;
  itemWidth: number;
  itemHeight: number;
  leftOffset: number;
  rightOffset: number;
  centerOffset: number;
  items?: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({
  containerWidth,
  containerHeight,
  itemWidth,
  itemHeight,
  leftOffset,
  rightOffset,
  centerOffset,
  items,
}) => {
  const defaultItems = [
    <View key="2" style={{ backgroundColor: 'blue', width: '100%', height: '100%' }} />,
    <View key="1" style={{ backgroundColor: 'red', width: '100%', height: '100%' }} />,
    <View key="3" style={{ backgroundColor: 'green', width: '100%', height: '100%' }} />,
  ];
  const carouselItems = items || defaultItems;

  const [currentIndex, setCurrentIndex] = useState(0);
  const transitionAnim = useRef(new Animated.Value(1)).current;
  const dragX = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);
  const lastDirection = useRef(0); // 0：尚未觸發，1：向右更新，-1：向左更新

  useEffect(() => {
    // 更新 currentIndex 時播放中心項目的動畫
    isAnimating.current = true;
    transitionAnim.setValue(0);
    Animated.timing(transitionAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      isAnimating.current = false;
      lastDirection.current = 0;
    });
  }, [currentIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (isAnimating.current) return;
        dragX.setValue(gestureState.dx);

        const threshold = itemWidth / 4;
        // 向右滑動超過閾值，立即更新上一項
        if (gestureState.dx > threshold && lastDirection.current === 0) {
          lastDirection.current = 1;
          isAnimating.current = true;
          Animated.timing(dragX, {
            toValue: itemWidth,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex(prevIndex => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
            dragX.setValue(0);
            isAnimating.current = false;
          });
        }
        // 向左滑動超過閾值，立即更新下一項
        else if (gestureState.dx < -threshold && lastDirection.current === 0) {
          lastDirection.current = -1;
          isAnimating.current = true;
          Animated.timing(dragX, {
            toValue: -itemWidth,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % carouselItems.length);
            dragX.setValue(0);
            isAnimating.current = false;
          });
        }
      },
      onPanResponderRelease: () => {
        // 若未觸發更新則復位
        if (lastDirection.current === 0) {
          Animated.spring(dragX, { toValue: 0, useNativeDriver: false }).start();
        }
        lastDirection.current = 0;
      },
    })
  ).current;

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!event.shiftKey || isAnimating.current) return;
      event.preventDefault();
      isAnimating.current = true;

      const direction = event.deltaY > 0 ? -1 : 1;
      Animated.timing(dragX, {
        toValue: direction * itemWidth,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setCurrentIndex(prevIndex => (prevIndex + direction + carouselItems.length) % carouselItems.length);
        dragX.setValue(0);
        isAnimating.current = false;
      });
    },
    [itemWidth, carouselItems.length]
  );

  useEffect(() => {
    if (Platform.OS === 'web') {
      const wheelListener = (event: WheelEvent) => handleWheel(event);
      window.addEventListener('wheel', wheelListener, { passive: false });
      return () => window.removeEventListener('wheel', wheelListener);
    }
  }, [handleWheel]);

  return (
    <View style={[styles.container, { width: containerWidth, height: containerHeight }]} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.carouselItem,
          {
            width: itemWidth,
            height: itemHeight,
            right: leftOffset,
            transform: [{ translateX: dragX }],
          },
        ]}
      >
        {carouselItems[(currentIndex - 1 + carouselItems.length) % carouselItems.length]}
      </Animated.View>

      <Animated.View
        style={[
          styles.carouselItem,
          {
            width: itemWidth,
            height: itemHeight,
            left: centerOffset,
            transform: [
              { translateX: dragX },
              {
                scale: transitionAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
            opacity: transitionAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        {carouselItems[currentIndex]}
      </Animated.View>

      <Animated.View
        style={[
          styles.carouselItem,
          {
            width: itemWidth,
            height: itemHeight,
            left: rightOffset,
            transform: [{ translateX: dragX }],
          },
        ]}
      >
        {carouselItems[(currentIndex + 1) % carouselItems.length]}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    overflow: 'hidden',
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}), // ✅ Web 版本禁用文字選取
  },
  carouselItem: {
    position: 'absolute',
  },
});

export default Carousel;
