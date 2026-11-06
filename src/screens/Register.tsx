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
} from 'react-native';

const PURPLE = '#8B2072';

type Props = {
  onContinue: () => void;
  onBack: () => void;
};

export default function Register({ onContinue, onBack }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = () => {
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Қате', 'Барлық өрістерді толтырыңыз.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      Alert.alert('Қате', 'Email дұрыс енгізілмеген.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Қате', 'Пароль кемінде 6 таңбадан тұруы керек.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Қате', 'Парольдер бірдей емес.');
      return;
    }

    Alert.alert('Сәтті!', 'Тіркелу мәліметтері тексерілді.', [
      { text: 'OK', onPress: onContinue },
    ]);
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
        <Pressable onPress={onBack} style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.subtitle}>
          Create your account to get started
        </Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
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

        <Text style={styles.label}>Re-type Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />

        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={onBack}>
            <Text style={styles.link}>Sign In</Text>
          </Pressable>
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
    paddingVertical: 30,
  },
  back: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 38,
    color: PURPLE,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#222222',
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginTop: 9,
    marginBottom: 22,
  },
  label: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
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
    marginTop: 24,
  },
  footerText: {
    color: '#777777',
    fontSize: 13,
  },
  link: {
    color: PURPLE,
    fontWeight: 'bold',
    fontSize: 13,
  },
});