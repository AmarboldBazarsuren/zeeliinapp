import { LinearGradient } from 'expo-linear-gradient';
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

export default function LoansScreen() {
  const [loanAmount, setLoanAmount] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(12);
  const [purpose, setPurpose] = useState('');
  
  // Admin-аас тогтоосон зээлэх боломжтой дээд хязгаар
  const [loanLimit] = useState(100000); // TODO: API-аас авна
  const [walletBalance] = useState(0); // Хэтэвчийн үлдэгдэл
  const [applicationFee] = useState(3000); // Зээл авах төлбөр

  const loanTerms = [6, 12, 18, 24, 36];
  const interestRate = 1.5; // 1.5% per month

  const calculateMonthlyPayment = (amount: number) => {
    const monthlyRate = interestRate / 100;
    const payment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, selectedTerm)) /
      (Math.pow(1 + monthlyRate, selectedTerm) - 1);
    return Math.round(payment);
  };

  const handleSubmitLoan = () => {
    const amount = parseInt(loanAmount);

    if (!amount || amount <= 0) {
      Alert.alert('Алдаа', 'Зээлийн дүн оруулна уу');
      return;
    }

    if (amount > loanLimit) {
      Alert.alert(
        'Алдаа',
        `Таны зээлэх боломжтой хэмжээ ${loanLimit.toLocaleString()}₮ байна.`
      );
      return;
    }

    if (walletBalance < applicationFee) {
      Alert.alert(
        'Хэтэвч цэнэглэх шаардлагатай',
        `Зээл авахын тулд хэтэвчээ ${applicationFee.toLocaleString()}₮-өөр цэнэглэх шаардлагатай.\n\nОдоогийн үлдэгдэл: ${walletBalance.toLocaleString()}₮`,
        [
          { text: 'Болих', style: 'cancel' },
          { text: 'Цэнэглэх', onPress: () => {
            // TODO: Navigate to wallet topup
            Alert.alert('Мэдээлэл', 'Хэтэвч цэс рүү шилжиж цэнэглэнэ үү');
          }},
        ]
      );
      return;
    }

    if (!purpose) {
      Alert.alert('Алдаа', 'Зээлийн зориулалт бөглөнө үү');
      return;
    }

    Alert.alert(
      'Баталгаажуулах',
      `${amount.toLocaleString()}₮ зээлийн хүсэлт илгээх үү?\n\nТаны дансаас ${applicationFee.toLocaleString()}₮ хасагдана.`,
      [
        { text: 'Үгүй', style: 'cancel' },
        {
          text: 'Тийм',
          onPress: () => {
            // TODO: API call - create loan request
            // Deduct application fee from wallet
            Alert.alert(
              'Амжилттай',
              `Таны зээлийн хүсэлт хүлээн авлаа.\n\nДансаас ${applicationFee.toLocaleString()}₮ хасагдлаа.\n\nАдминууд таны мэдээллийг шалгаж баталгаажуулах болно.`
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
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Зээл авах</Text>
          <Text style={styles.headerSubtitle}>
            Та хүссэн хэмжээний зээлээ авна уу
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Loan Limit Card */}
          <View style={styles.limitCard}>
            <View style={styles.limitCardHeader}>
              <Text style={styles.limitCardTitle}>Зээлэх боломжтой хэмжээ</Text>
              <Text style={styles.limitCardEmoji}>💰</Text>
            </View>
            <Text style={styles.limitCardAmount}>
              ₮{loanLimit.toLocaleString()}
            </Text>
            <Text style={styles.limitCardHint}>
              Админууд тогтоосон таны хязгаар
            </Text>
          </View>

          {/* Fee Warning */}
          <View style={styles.warningCard}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>Анхаар</Text>
              <Text style={styles.warningText}>
                Зээл авахад таны дансаас {applicationFee.toLocaleString()}₮
                хасагдана. Хэтэвчийн үлдэгдэл:{' '}
                {walletBalance.toLocaleString()}₮
              </Text>
            </View>
          </View>

          {/* Loan Amount Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Зээлийн хэмжээ</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPrefix}>₮</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={loanAmount}
                onChangeText={setLoanAmount}
              />
            </View>
            <Text style={styles.inputHint}>
              Хамгийн их: ₮{loanLimit.toLocaleString()}
            </Text>
          </View>

          {/* Loan Term Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Хугацаа</Text>
            <Text style={styles.selectedTerm}>{selectedTerm} сар</Text>
            <View style={styles.termGrid}>
              {loanTerms.map((term) => (
                <TouchableOpacity
                  key={term}
                  style={[
                    styles.termButton,
                    selectedTerm === term && styles.termButtonSelected,
                  ]}
                  onPress={() => setSelectedTerm(term)}
                >
                  <Text
                    style={[
                      styles.termButtonText,
                      selectedTerm === term && styles.termButtonTextSelected,
                    ]}
                  >
                    {term} сар
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Calculation Result */}
          {loanAmount && parseInt(loanAmount) > 0 && (
            <View style={styles.calculationCard}>
              <View style={styles.calculationRow}>
                <Text style={styles.calculationLabel}>Хүү (сард)</Text>
                <Text style={styles.calculationValue}>{interestRate}%</Text>
              </View>
              <View style={styles.calculationRow}>
                <Text style={styles.calculationLabel}>Сарын төлбөр</Text>
                <Text style={styles.calculationValueBig}>
                  ₮
                  {calculateMonthlyPayment(
                    parseInt(loanAmount)
                  ).toLocaleString()}
                </Text>
              </View>
              <View style={styles.calculationRow}>
                <Text style={styles.calculationLabel}>Нийт төлөх</Text>
                <Text style={styles.calculationValue}>
                  ₮
                  {(
                    calculateMonthlyPayment(parseInt(loanAmount)) *
                    selectedTerm
                  ).toLocaleString()}
                </Text>
              </View>
            </View>
          )}

          {/* Purpose Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Зээлийн зориулалт</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Жишээ: Бизнес хөгжүүлэлт, гэр ахуйн зардал гэх мэт..."
              placeholderTextColor="#999"
              value={purpose}
              onChangeText={setPurpose}
              multiline
            />
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Зээлийн процесс</Text>
              <Text style={styles.infoText}>
                1. Зээлийн хүсэлт илгээх{'\n'}
                2. Дансаас 3,000₮ хасагдана{'\n'}
                3. Админууд мэдээлэл шалгах{'\n'}
                4. Батлагдсан бол хэтэвчинд орно{'\n'}
                5. Хэтэвчээс өөрийн данс руугаа шилжүүлнэ
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitLoan}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.submitButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.submitButtonText}>Хүсэлт илгээх</Text>
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
  limitCard: {
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
  limitCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  limitCardTitle: {
    fontSize: 14,
    color: '#666',
  },
  limitCardEmoji: {
    fontSize: 24,
  },
  limitCardAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
  },
  limitCardHint: {
    fontSize: 12,
    color: '#999',
  },
  warningCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 24,
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 2,
    borderColor: '#667eea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputPrefix: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  inputHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  selectedTerm: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 16,
  },
  termGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  termButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  termButtonSelected: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  termButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  termButtonTextSelected: {
    color: '#fff',
  },
  calculationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  calculationLabel: {
    fontSize: 14,
    color: '#666',
  },
  calculationValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  calculationValueBig: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 100,
    textAlignVertical: 'top',
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
    lineHeight: 20,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
