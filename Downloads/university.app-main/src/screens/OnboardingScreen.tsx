
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type OnboardingScreenProps = {
  onFinish?: () => void;
};

const slides = [
  {
    emoji: '🎓',
    title: 'Добро пожаловать!',
    description:
      'Начните свой путь к знаниям вместе с Superior University.',
  },
  {
    emoji: '📚',
    title: 'Учитесь с удобством',
    description:
      'Получайте информацию об обучении и следите за своей успеваемостью.',
  },
  {
    emoji: '🚀',
    title: 'Достигайте целей',
    description:
      'Откройте новые возможности и уверенно двигайтесь к своему будущему.',
  },
];

export default function OnboardingScreen({
  onFinish,
}: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (onFinish) {
      onFinish();
    }
  };

  const handleSkip = () => {
    if (onFinish) {
      onFinish();
    }
  };

  const slide = slides[currentSlide];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Pressable
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Пропустить</Text>
      </Pressable>

      <View style={styles.illustration}>
        <View style={styles.circle}>
          <Text style={styles.emoji}>{slide.emoji}</Text>
        </View>
      </View>

      <Text style={styles.title}>{slide.title}</Text>

      <Text style={styles.description}>
        {slide.description}
      </Text>

      <View style={styles.dots}>
        {slides.map((item, index) => (
          <View
            key={item.title}
            style={[
              styles.dot,
              currentSlide === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <Pressable
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {currentSlide === slides.length - 1
            ? 'Начать'
            : 'Далее'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 45,
    paddingBottom: 35,
  },

  skipButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },

  skipText: {
    color: '#949494',
    fontSize: 15,
  },

  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: '#F5EAF2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 100,
  },

  title: {
    color: '#000000',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  description: {
    color: '#949494',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 25,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 24,
    backgroundColor: '#8B2072',
  },

  nextButton: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    backgroundColor: '#8B2072',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
