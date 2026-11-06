import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const PURPLE = '#8B2072';

type Props = {
  onSignUp: () => void;
  onLogin: () => void;
};

export default function Login({ onSignUp, onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля.');
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      Alert.alert('Успешно!', 'Вы вошли в аккаунт.');
      onLogin();

    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' ||
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password') {
        Alert.alert('Ошибка', 'Неверный Email или пароль.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Ошибка', 'Введите корректный Email.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Ошибка', 'Слишком много попыток. Попробуйте позже.');
      } else {
        Alert.alert('Ошибка', 'Не удалось войти. Проверьте интернет.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>S</Text>
        </View>

        <Text style={styles.heading}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Sign in to your account
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordBox}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.forgot}
            onPress={() =>
              Alert.alert(
                'Forgot Password',
                'Для сброса пароля обратитесь к администратору.'
              )
            }
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
            </Text>

            <Pressable onPress={onSignUp}>
              <Text style={styles.link}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 35,
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: PURPLE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 35,
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 9,
    marginTop: 17,
  },
  input: {
    height: 52,
    backgroundColor: '#F4F4F4',
    borderRadius: 7,
    paddingHorizontal: 15,
    color: '#222222',
    fontSize: 14,
  },
  passwordBox: {
    height: 52,
    backgroundColor: '#F4F4F4',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    color: '#222222',
    fontSize: 14,
  },
  showText: {
    color: PURPLE,
    fontWeight: '600',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  forgotText: {
    color: PURPLE,
    fontSize: 13,
  },
  button: {
    height: 52,
    backgroundColor: PURPLE,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    color: '#777777',
    fontSize: 13,
  },
  link: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: 'bold',
  },
});