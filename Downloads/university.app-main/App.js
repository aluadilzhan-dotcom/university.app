import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Барлығы');

  const categoriesList = ['Барлығы', 'Мейрамхана', 'Кофейня', 'Бар', 'Кафе'];

  const placesList = [
    {
      id: '1',
      name: 'The Ristorante Lounge',
      category: 'Мейрамхана',
      cuisine: 'Еуропалық асхана',
      rating: '4.9',
      address: 'Абай даңғылы, 15',
    },
    {
      id: '2',
      name: 'Coffee & Stories',
      category: 'Кофейня',
      cuisine: 'Кофе және десерттер',
      rating: '4.8',
      address: 'Достық көшесі, 42',
    },
    {
      id: '3',
      name: 'Gastronom Pub',
      category: 'Бар',
      cuisine: 'Америкалық / Бар',
      rating: '4.7',
      address: 'Сәтпаев көшесі, 20',
    },
    {
      id: '4',
      name: 'Tandoori House',
      category: 'Мейрамхана',
      cuisine: 'Үнді асханасы',
      rating: '4.6',
      address: 'Желтоқсан көшесі, 88',
    },
    {
      id: '5',
      name: 'MOMO Cafe',
      category: 'Кафе',
      cuisine: 'Азиялық асхана',
      rating: '4.5',
      address: 'Қонаев көшесі, 110',
    },
  ];

  const [bookingTab, setBookingTab] = useState('active');
  const [bookingsList, setBookingsList] = useState([
    {
      id: '1',
      restaurant: 'The Ristorante Lounge',
      table: 'Столик №4',
      date: 'Бүгін, 19:00',
      guests: '4 қонақ',
      code: 'BR-7842',
      status: 'active',
    },
    {
      id: '2',
      restaurant: 'Coffee & Stories',
      table: 'Столик №2',
      date: 'Ертең, 14:30',
      guests: '2 қонақ',
      code: 'BR-9120',
      status: 'active',
    },
  ]);

  const citiesList = [
    'Алматы',
    'Астана',
    'Шымкент',
    'Қарағанды',
    'Ақтөбе',
    'Павлодар',
    'Өскемен',
    'Атырау',
    'Қостанай',
  ];

  const cancelBooking = (id) => {
    Alert.alert(
      'Броньды болдырмау',
      'Бұл броньды шынымен жойғыңыз келе ме?',
      [
        { text: 'Жоқ', style: 'cancel' },
        {
          text: 'Иә, жою',
          style: 'destructive',
          onPress: () => {
            setBookingsList(
              bookingsList.map((item) =>
                item.id === id ? { ...item, status: 'cancelled' } : item
              )
            );
          },
        },
      ]
    );
  };

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      <Pressable style={styles.navItem} onPress={() => setCurrentScreen('home')}>
        <Text style={[styles.navText, currentScreen === 'home' && styles.activeNavText]}>🏠 Басты</Text>
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => setCurrentScreen('explore')}>
        <Text style={[styles.navText, currentScreen === 'explore' && styles.activeNavText]}>🔍 Іздеу</Text>
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => setCurrentScreen('bookings')}>
        <Text style={[styles.navText, currentScreen === 'bookings' && styles.activeNavText]}>📅 Бронь</Text>
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => setCurrentScreen('profile')}>
        <Text style={[styles.navText, currentScreen === 'profile' && styles.activeNavText]}>👤 Профиль</Text>
      </Pressable>
    </View>
  );

  if (currentScreen === 'login') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Қош келдіңіз! 👋</Text>
                <Text style={styles.subtitle}>Жалғастыру үшін телефон нөміріңіз пен құпия сөзді енгізіңіз.</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputIconText}>📱</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+7 (700) 000-00-00" placeholderTextColor="#A0A0AB" keyboardType="phone-pad" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputIconText}>🔒</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Құпия сөз" placeholderTextColor="#A0A0AB" secureTextEntry />
              </View>

              <Pressable style={styles.mainBtn} onPress={() => setCurrentScreen('home')}>
                <Text style={styles.mainBtnText}>Кіру</Text>
              </Pressable>

              <View style={styles.footerRow}>
                <Text style={styles.grayText}>Аккаунтыңыз жоқ па? </Text>
                <Pressable onPress={() => setCurrentScreen('register')}>
                  <Text style={styles.linkText}>Тіркелу</Text>
                </Pressable>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'register') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Pressable style={styles.backButton} onPress={() => setCurrentScreen('login')}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>
            <Text style={styles.title}>Тіркелу ✨</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputIconText}>👤</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Атыңыз" placeholderTextColor="#A0A0AB" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIconText}>📱</Text>
              <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Телефон нөмірі" placeholderTextColor="#A0A0AB" keyboardType="phone-pad" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIconText}>🔒</Text>
              <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Құпия сөз" placeholderTextColor="#A0A0AB" secureTextEntry />
            </View>
            
            <Pressable style={styles.mainBtn} onPress={() => setCurrentScreen('city')}>
              <Text style={styles.mainBtnText}>Жалғастыру</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'city') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={() => setCurrentScreen('register')}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.title}>Қаланы таңдаңыз 🏙️</Text>
          
          <Pressable style={styles.dropdownButton} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Text style={city ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>{city || 'Қаланы таңдау'}</Text>
          </Pressable>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 200 }}>
                {citiesList.map((item, index) => (
                  <Pressable key={index} style={styles.dropdownItem} onPress={() => { setCity(item); setIsDropdownOpen(false); }}>
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          {city !== '' && (
            <Pressable style={[styles.mainBtn, { marginTop: 20 }]} onPress={() => setCurrentScreen('home')}>
              <Text style={styles.mainBtnText}>Бастау</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'home') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeSub}>Ағымдағы қала:</Text>
            <Text style={styles.welcomeCity}>📍 {city || 'Алматы'}</Text>
          </View>
          <Text style={styles.sectionTitle}>🔥 Танымал орындар</Text>
          {placesList.slice(0, 2).map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDesc}>{item.cuisine} ⭐ {item.rating}</Text>
            </View>
          ))}
        </ScrollView>
        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  if (currentScreen === 'explore') {
    const filteredPlaces = placesList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, paddingBottom: 70, paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={styles.title}>Іздеу 🔍</Text>
          <TextInput
            style={[styles.inputContainer, styles.input]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Іздеу..."
          />
          <ScrollView>
            {filteredPlaces.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDesc}>{item.address}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  if (currentScreen === 'bookings') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, paddingBottom: 70, paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={styles.title}>Броньдар 📅</Text>
          <ScrollView>
            {bookingsList.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.restaurant}</Text>
                <Text style={styles.cardDesc}>{item.date} ({item.guests})</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  if (currentScreen === 'profile') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.title}>Профиль 👤</Text>
          <Text style={[styles.cardDesc, { marginVertical: 10 }]}>Аты: {name || 'Қолданушы'}</Text>
          <Pressable style={[styles.mainBtn, { backgroundColor: '#FF5C5C' }]} onPress={() => setCurrentScreen('login')}>
            <Text style={styles.mainBtnText}>Жүйеден шығу</Text>
          </Pressable>
        </View>
        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFC' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, backgroundColor: '#FAFAFC', paddingBottom: 90 },
  headerContainer: { marginBottom: 20 },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F5', borderRadius: 12, marginBottom: 20 },
  backButtonText: { fontSize: 20, color: '#1A1A24', fontWeight: '600' },
  title: { color: '#1A1A24', fontSize: 26, fontWeight: '700' },
  subtitle: { color: '#8E8E99', fontSize: 15, marginTop: 6, marginBottom: 24 },
  inputContainer: { width: '100%', height: 58, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EFEFF4' },
  inputIconText: { fontSize: 18, marginRight: 12 },
  input: { flex: 1, height: '100%', color: '#1A1A24', fontSize: 15 },
  mainBtn: { width: '100%', height: 58, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8A2BE2', borderRadius: 16, marginBottom: 16 },
  mainBtnText: { fontWeight: '600', fontSize: 16, color: '#FFFFFF' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  grayText: { color: '#8E8E99', fontSize: 15 },
  linkText: { color: '#8A2BE2', fontSize: 15, fontWeight: '600' },
  welcomeCard: { backgroundColor: '#8A2BE2', borderRadius: 20, padding: 20, marginBottom: 20 },
  welcomeSub: { color: '#E8D7F7', fontSize: 14 },
  welcomeCity: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A24', marginBottom: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EFEFF4' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A24', marginBottom: 6 },
  cardDesc: { fontSize: 14, color: '#8E8E99' },
  dropdownButton: { width: '100%', height: 58, justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: '#EFEFF4' },
  dropdownPlaceholder: { color: '#A0A0AB', fontSize: 15 },
  dropdownSelectedText: { color: '#1A1A24', fontSize: 15 },
  dropdownList: { backgroundColor: '#FFFFFF', borderRadius: 16, marginTop: 8, borderWidth: 1, borderColor: '#EFEFF4' },
  dropdownItem: { paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#F8F8FC' },
  dropdownItemText: { fontSize: 15, color: '#1A1A24' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#EFEFF4', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  navText: { fontSize: 13, color: '#8E8E99', fontWeight: '600' },
  activeNavText: { color: '#8A2BE2' },
});