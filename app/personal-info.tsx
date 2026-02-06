import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PersonalInfoScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    // Хувийн мэдээлэл
    lastName: '',
    firstName: '',
    registerNumber: '',
    phone: '',
    
    // Боловсрол
    graduatedSchool: '',
    
    // Данс мэдээлэл
    bankAccountNumber: '',
    bankAccountName: '',
    
    // Холбоо барих хүмүүс
    contact1Name: '',
    contact1Phone: '',
    contact1Relation: '',
    
    contact2Name: '',
    contact2Phone: '',
    contact2Relation: '',
  });

  const [isVerified, setIsVerified] = useState(false);

  const handleSave = () => {
    // Validate all fields
    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.registerNumber ||
      !formData.phone ||
      !formData.graduatedSchool ||
      !formData.bankAccountNumber ||
      !formData.bankAccountName ||
      !formData.contact1Name ||
      !formData.contact1Phone ||
      !formData.contact2Name ||
      !formData.contact2Phone
    ) {
      Alert.alert('Алдаа', 'Бүх талбарыг бөглөнө үү');
      return;
    }

    Alert.alert(
      'Баталгаажуулах',
      'Хувийн мэдээллээ хадгалж, админ баталгаажуулалт хүсэх үү?',
      [
        { text: 'Үгүй', style: 'cancel' },
        {
          text: 'Тийм',
          onPress: () => {
            // TODO: API call to save and request verification
            setIsVerified(false);
            Alert.alert(
              'Амжилттай',
              'Таны мэдээлэл хадгалагдлаа. Админууд баталгаажуулж байна.'
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Хувийн мэдээлэл</Text>
          <Text style={styles.headerSubtitle}>
            Зээл авахын тулд мэдээллээ бөглөнө үү
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Verification Status */}
          <View
            style={[
              styles.statusCard,
              isVerified ? styles.statusVerified : styles.statusPending,
            ]}
          >
            <Text style={styles.statusIcon}>
              {isVerified ? '✅' : '⏳'}
            </Text>
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>
                {isVerified ? 'Баталгаажсан' : 'Баталгаажуулалт хүлээгдэж байна'}
              </Text>
              <Text style={styles.statusText}>
                {isVerified
                  ? 'Таны мэдээлэл баталгаажсан'
                  : 'Админууд таны мэдээллийг шалгаж байна'}
              </Text>
            </View>
          </View>

          {/* Personal Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Хувийн мэдээлэл</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Овог</Text>
              <TextInput
                style={styles.input}
                placeholder="Овог"
                placeholderTextColor="#999"
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData({ ...formData, lastName: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Нэр</Text>
              <TextInput
                style={styles.input}
                placeholder="Нэр"
                placeholderTextColor="#999"
                value={formData.firstName}
                onChangeText={(text) =>
                  setFormData({ ...formData, firstName: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Регистрийн дугаар</Text>
              <TextInput
                style={styles.input}
                placeholder="АА12345678"
                placeholderTextColor="#999"
                autoCapitalize="characters"
                value={formData.registerNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, registerNumber: text })
                }
                maxLength={10}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Утасны дугаар</Text>
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.phonePrefix}>+976</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="88888888"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phone: text })
                  }
                  maxLength={8}
                />
              </View>
            </View>
          </View>

          {/* Education Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Боловсрол</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Төгссөн сургууль</Text>
              <TextInput
                style={styles.input}
                placeholder="МУИС, ШУТИС гэх мэт"
                placeholderTextColor="#999"
                value={formData.graduatedSchool}
                onChangeText={(text) =>
                  setFormData({ ...formData, graduatedSchool: text })
                }
              />
            </View>
          </View>

          {/* Bank Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Дансны мэдээлэл</Text>
            <Text style={styles.sectionHint}>
              Данс эзэмшигчийн нэр бүртгүүлсэн нэртэй таарч байх ёстой
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Дансны дугаар</Text>
              <TextInput
                style={styles.input}
                placeholder="1234567890"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formData.bankAccountNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, bankAccountNumber: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Данс эзэмшигчийн нэр</Text>
              <TextInput
                style={styles.input}
                placeholder="Овог Нэр"
                placeholderTextColor="#999"
                value={formData.bankAccountName}
                onChangeText={(text) =>
                  setFormData({ ...formData, bankAccountName: text })
                }
              />
            </View>
          </View>

          {/* Emergency Contact 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Холбоо барих хүн 1</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Овог нэр</Text>
              <TextInput
                style={styles.input}
                placeholder="Овог Нэр"
                placeholderTextColor="#999"
                value={formData.contact1Name}
                onChangeText={(text) =>
                  setFormData({ ...formData, contact1Name: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Утасны дугаар</Text>
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.phonePrefix}>+976</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="88888888"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={formData.contact1Phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, contact1Phone: text })
                  }
                  maxLength={8}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Хамаарал</Text>
              <TextInput
                style={styles.input}
                placeholder="Ах/эгч, найз гэх мэт"
                placeholderTextColor="#999"
                value={formData.contact1Relation}
                onChangeText={(text) =>
                  setFormData({ ...formData, contact1Relation: text })
                }
              />
            </View>
          </View>

          {/* Emergency Contact 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Холбоо барих хүн 2</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Овог нэр</Text>
              <TextInput
                style={styles.input}
                placeholder="Овог Нэр"
                placeholderTextColor="#999"
                value={formData.contact2Name}
                onChangeText={(text) =>
                  setFormData({ ...formData, contact2Name: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Утасны дугаар</Text>
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.phonePrefix}>+976</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="88888888"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={formData.contact2Phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, contact2Phone: text })
                  }
                  maxLength={8}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Хамаарал</Text>
              <TextInput
                style={styles.input}
                placeholder="Ах/эгч, найз гэх мэт"
                placeholderTextColor="#999"
                value={formData.contact2Relation}
                onChangeText={(text) =>
                  setFormData({ ...formData, contact2Relation: text })
                }
              />
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Анхаар</Text>
              <Text style={styles.infoText}>
                Бүх мэдээлэл үнэн зөв байх ёстой. Админууд таны мэдээллийг
                шалгаж, бүгд зөв бол баталгаажуулах болно.
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveButtonText}>
                Хадгалах ба баталгаажуулалт хүсэх
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: 20,
  },
  statusCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 24,
  },
  statusVerified: {
    backgroundColor: '#d4edda',
  },
  statusPending: {
    backgroundColor: '#fff3cd',
  },
  statusIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 18,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
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
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    color: '#333',
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
  infoBox: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#1976d2',
    lineHeight: 18,
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});