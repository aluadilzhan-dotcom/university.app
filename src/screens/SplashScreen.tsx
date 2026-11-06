
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type SplashScreenProps = {
  onFinish?: () => void;
};

export default function SplashScreen({
  onFinish,
}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.logo}>
        <Text style={styles.logoLetter}>S</Text>
      </View>

      <Text style={styles.universityName}>
        SUPERIOR
      </Text>

      <Text style={styles.universitySubtitle}>
        UNIVERSITY
      </Text>

      <View style={styles.line} />

      <Text style={styles.slogan}>
        Knowledge. Excellence. Future.
      </Text>

      <Text style={styles.copyright}>
        © 2026 Superior University
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B2072',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  logoLetter: {
    color: '#FFFFFF',
    fontSize: 58,
    fontWeight: 'bold',
  },

  universityName: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 4,
  },

  universitySubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 6,
    marginTop: 7,
  },

  line: {
    width: 90,
    height: 2,
    backgroundColor: '#D9D9D9',
    marginTop: 26,
  },

  slogan: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },

  copyright: {
    position: 'absolute',
    bottom: 30,
    color: '#D9D9D9',
    fontSize: 12,
    textAlign: 'center',
  },
});
