
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useEffect, useState } from 'react';

const PURPLE = '#8B2072';

const onboardingSlides = [
  {
    title: 'Лучший способ обучения — это ваш путь к успеху!',
    description:
      'Откройте новые возможности для обучения вместе с Superior University.',
    illustration: '📚',
  },
  {
    title: 'Найдите себя через новые знания!',
    description:
      'Развивайте свои навыки, изучайте материалы и достигайте целей.',
    illustration: '🎓',
  },
  {
    title: 'Ваше будущее начинается здесь!',
    description:
      'Расписание, результаты и учебные материалы — всё в одном приложении.',
    illustration: '🌟',
  },
];

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnboarding(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
  if (currentSlide < onboardingSlides.length - 1) {
    setCurrentSlide(currentSlide + 1);
  } else {
    // Соңғы слайдтан кейін келесі экранға өту
    setCurrentSlide(0);
  }
};

  const slide = onboardingSlides[currentSlide];

  return (
    <SafeAreaView
      style={[
        styles.container,
        showOnboarding ? styles.whiteBackground : styles.purpleBackground,
      ]}
    >
      <StatusBar
        style={showOnboarding ? 'dark' : 'light'}
      />

      {!showOnboarding ? (
        <View style={styles.splash}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>✺</Text>
          </View>

          <Text style={styles.universityName}>
            Superior University
          </Text>

          <Text style={styles.subtitle}>
            e-Learning Platform
          </Text>

          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              Copyright © 2022 Superior University
            </Text>
            <Text style={styles.copyrightText}>
              All Rights Reserved
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.onboarding}>
          <View style={styles.top}>
            <Pressable
              onPress={() => setCurrentSlide(2)}
              accessibilityRole="button"
            >
              <Text style={styles.skip}>Пропустить</Text>
            </Pressable>
          </View>

          <View style={styles.illustration}>
            <Text style={styles.illustrationEmoji}>
              {slide.illustration}
            </Text>
            <View style={styles.smallCircle}>
              <Text style={styles.smallEmoji}>💡</Text>
            </View>
            <View style={styles.bookCircle}>
              <Text style={styles.smallEmoji}>📖</Text>
            </View>
          </View>

          <Text style={styles.title}>
            {slide.title}
          </Text>

          <Text style={styles.description}>
            {slide.description}
          </Text>

          <View style={styles.bottom}>
            <View style={styles.dots}>
              {onboardingSlides.map((item, index) => (
                <View
                  key={index}
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
              accessibilityRole="button"
            >
              <Text style={styles.nextButtonText}>
                Далее
              </Text>
            </Pressable>

            <Pressable
              style={styles.skipButton}
              onPress={() => setCurrentSlide(2)}
              accessibilityRole="button"
            >
              <Text style={styles.skipBottom}>Пропустить</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  purpleBackground: {
    backgroundColor: PURPLE,
  },

  whiteBackground: {
    backgroundColor: '#FFFFFF',
  },

  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  logoIcon: {
    color: '#FFFFFF',
    fontSize: 43,
  },

  universityName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#F0D8E9',
    fontSize: 12,
    marginTop: 5,
  },

  copyright: {
    position: 'absolute',
    bottom: 25,
    alignItems: 'center',
  },

  copyrightText: {
    color: '#E9C9DF',
    fontSize: 9,
    marginBottom: 3,
  },

  onboarding: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
  },

  top: {
    alignItems: 'flex-end',
    paddingTop: 12,
  },

  skip: {
    color: PURPLE,
    fontSize: 14,
  },

  illustration: {
    height: '39%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  illustrationEmoji: {
    fontSize: 112,
  },

  smallCircle: {
    position: 'absolute',
    top: 25,
    right: '15%',
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#F4DDF0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookCircle: {
    position: 'absolute',
    bottom: 15,
    left: '13%',
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#F4DDF0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallEmoji: {
    fontSize: 27,
  },

  title: {
    color: '#171717',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 10,
    paddingHorizontal: 5,
  },

  description: {
    color: '#777777',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 12,
    paddingHorizontal: 8,
  },

  bottom: {
    marginTop: 'auto',
    paddingBottom: 12,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    gap: 7,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },

  activeDot: {
    width: 25,
    backgroundColor: PURPLE,
  },

  nextButton: {
    height: 48,
    borderRadius: 5,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  skipButton: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 5,
  },

  skipBottom: {
    color: PURPLE,
    fontSize: 13,
  },
});
