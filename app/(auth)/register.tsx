import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../../services/api';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    registerNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateInput = () => {
    if (
      !formData.lastName.trim() ||
      !formData.firstName.trim() ||
      !formData.phone.trim() ||
      !formData.registerNumber.trim() ||
      !formData.password.trim()
    ) {
      Alert.alert('Алдаа', 'Заавал бөглөх талбаруудыг бөглөнө үү');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Алдаа', 'Нууц үг таарахгүй байна');
      return false;
    }

    if (formData.phone.length !== 8 || !/^\d+$/.test(formData.phone)) {
      Alert.alert('Алдаа', 'Утасны дугаар 8 оронтой тоо байх ёстой');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Алдаа', 'Нууц үг хамгийн багадаа 6 тэмдэгттэй байх ёстой');
      return false;
    }

    if (formData.registerNumber.length !== 10) {
      Alert.alert('Алдаа', 'Регистрийн дугаар 10 тэмдэгттэй байх ёстой');
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Alert.alert('Алдаа', 'И-мэйл хаяг буруу байна');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInput()) return;

    setIsLoading(true);

    try {
      const registerData = {
        lastName: formData.lastName.trim(),
        firstName: formData.firstName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        registerNumber: formData.registerNumber.toUpperCase().trim(),
        password: formData.password,
      };

      const response = await authAPI.register(registerData);

      if (response.success && response.token) {
        await AsyncStorage.setItem('userToken', response.token);
        if (response.user) {
          await AsyncStorage.setItem('userData', JSON.stringify(response.user));
        }

        Alert.alert(
          'Амжилттай',
          'Бүртгэл амжилттай үүслээ!',
          [{ text: 'За', onPress: () => router.replace('/(tabs)/home') }]
        );
      } else {
        throw new Error('Бүртгэл үүсгэхэд алдаа гарлаа');
      }
    } catch (err) {
      console.error('Register error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Бүртгэл үүсгэхэд алдаа гарлаа';
      Alert.alert('Алдаа', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                disabled={isLoading}
              >
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Бүртгүүлэх</Text>
              <Text style={styles.subtitle}>Шинэ хэрэглэгч үүсгэх</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Овог <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Овог"
                  placeholderTextColor="#999"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                  editable={!isLoading}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Нэр <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Нэр"
                  placeholderTextColor="#999"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                  editable={!isLoading}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Утасны дугаар <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.phoneInputWrapper}>
                  <Text style={styles.phonePrefix}>+976</Text>
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="88888888"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    maxLength={8}
                    editable={!isLoading}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>И-мэйл</Text>
                <TextInput
                  style={styles.input}
                  placeholder="example@mail.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  editable={!isLoading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Регистрийн дугаар <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="АА12345678"
                  placeholderTextColor="#999"
                  autoCapitalize="characters"
                  value={formData.registerNumber}
                  onChangeText={(text) => setFormData({ ...formData, registerNumber: text })}
                  maxLength={10}
                  editable={!isLoading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Нууц үг <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  editable={!isLoading}
                  autoCapitalize="none"
                />
                <Text style={styles.hint}>Хамгийн багадаа 6 тэмдэгт</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Нууц үг давтах <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  editable={!isLoading}
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.registerButtonText}>Бүртгүүлэх</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginLink}
                onPress={() => router.back()}
                disabled={isLoading}
              >
                <Text style={styles.loginLinkText}>
                  Бүртгэлтэй юу? <Text style={styles.loginLinkBold}>Нэвтрэх</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#ff4444',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    marginLeft: 4,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  phonePrefix: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#666',
  },
  loginLinkBold: {
    color: '#667eea',
    fontWeight: 'bold',
  },
});