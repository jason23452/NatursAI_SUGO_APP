// ThemeToggleButton.tsx
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { useTheme } from "@/context/ThemeContext"

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Button
        title={theme === 'dark' ? '深夜模式: ON' : '深夜模式: OFF'}
        onPress={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

export default ThemeToggleButton;
