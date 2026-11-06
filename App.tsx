import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import OnboardingScreen from './src/screens/OnboardingScreen';

type Screen = 'splash' | 'login' | 'signup' | 'register';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {screen === 'splash' && (
        <SplashScreen
          onFinish={() => setScreen('login')}
        />
      )}

      {screen === 'login' && (
        <Login
          onSignUp={() => setScreen('signup')}
          onLogin={() => {}}
        />
      )}

      {screen === 'signup' && (
        <OnboardingScreen
          onEmail={() => setScreen('register')}
          onSignIn={() => setScreen('login')}
        />
      )}

      {screen === 'register' && (
        <Register
          onContinue={() => setScreen('login')}
          onBack={() => setScreen('signup')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});