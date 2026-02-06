import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletScreen() {
  const [walletBalance, setWalletBalance] = useState(0); // Хэтэвчийн үлдэгдэл
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [topupAmount, setTopupAmount] = useState('');
  const [bankAccount, setBankAccount] = useState(''); // Дансны дугаар
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);

  // Татах хүсэлт илгээх
  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    
    if (!amount || amount <= 0) {
      Alert.alert('Алдаа', 'Дүн зөв оруулна уу');
      return;
    }

    if (amount > walletBalance) {
      Alert.alert('Алдаа', 'Хэтэвчийн үлдэгдэл хүрэлцэхгүй байна');
      return;
    }

    if (!bankAccount) {
      Alert.alert('Алдаа', 'Дансны дугаар оруулна уу');
      return;
    }

    Alert.alert(
      'Баталгаажуулах',
      `${amount.toLocaleString()}₮ татах хүсэлт илгээх үү?\n\nТаны хүсэлт 24-72 цагийн дотор шийдвэрлэгдэнэ.`,
      [
        { text: 'Үгүй', style: 'cancel' },
        {
          text: 'Тийм',
          onPress: () => {
            // TODO: API call to create withdrawal request
            Alert.alert(
              'Амжилттай',
              'Таны татах хүсэлт амжилттай илгээгдлээ. 24-72 цагийн дотор шийдвэрлэгдэнэ.'
            );
            setShowWithdrawModal(false);
            setWithdrawAmount('');
          },
        },
      ]
    );
  };

  // QPay цэнэглэх
  const handleTopup = () => {
    const amount = parseInt(topupAmount);
    
    if (!amount || amount <= 0) {
      Alert.alert('Алдаа', 'Дүн зөв оруулна уу');
      return;
    }

    // TODO: Integration with byl.mn QPay
    Alert.alert(
      'QPay Төлбөр',
      'QPay төлбөрийн хуудас руу шилжих гэж байна...',
      [
        {
          text: 'За',
          onPress: () => {
            // Simulate successful payment
            setWalletBalance(walletBalance + amount);
            setShowTopupModal(false);
            setTopupAmount('');
            Alert.alert('Амжилттай', `${amount.toLocaleString()}₮ цэнэглэгдлээ`);
          },
        },
      ]
    );
  };

  const transactions = [
    {
      id: '1',
      type: 'loan_received',
      amount: 30000,
      date: '2026-02-05 14:30',
      status: 'completed',
      description: 'Зээлийн дансанд орсон',
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: -50000,
      date: '2026-02-04 10:15',
      status: 'pending',
      description: 'Данс руу шилжүүлэх хүсэлт',
    },
    {
      id: '3',
      type: 'topup',
      amount: 3000,
      date: '2026-02-03 16:20',
      status: 'completed',
      description: 'QPay цэнэглэлт',
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'loan_received':
        return '💰';
      case 'withdrawal':
        return '📤';
      case 'topup':
        return '📥';
      default:
        return '💳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'rejected':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Амжилттай';
      case 'pending':
        return 'Хүлээгдэж байна';
      case 'rejected':
        return 'Татгалзсан';
      default:
        return 'Үл мэдэгдэх';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <Text style={styles.headerTitle}>Хэтэвч</Text>
          <Text style={styles.headerSubtitle}>Таны зээлийн хэтэвч</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.balanceGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.balanceLabel}>Хэтэвчийн үлдэгдэл</Text>
              <Text style={styles.balanceAmount}>
                ₮{walletBalance.toLocaleString()}
              </Text>
              <View style={styles.balanceActions}>
                <TouchableOpacity
                  style={styles.balanceButton}
                  onPress={() => setShowTopupModal(true)}
                >
                  <Text style={styles.balanceButtonIcon}>📥</Text>
                  <Text style={styles.balanceButtonText}>Цэнэглэх</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.balanceButton}
                  onPress={() => setShowWithdrawModal(true)}
                >
                  <Text style={styles.balanceButtonIcon}>📤</Text>
                  <Text style={styles.balanceButtonText}>Татах</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Анхаар</Text>
              <Text style={styles.infoText}>
                • Зээл авахад 3,000₮ төлбөр шаардлагатай{'\n'}
                • Татах хүсэлт 24-72 цагт шийдвэрлэгдэнэ{'\n'}
                • QPay-ээр цэнэглэх боломжтой
              </Text>
            </View>
          </View>

          {/* Transaction History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Гүйлгээний түүх</Text>
            <View style={styles.transactionList}>
              {transactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                    <View style={styles.transactionIcon}>
                      <Text style={styles.transactionEmoji}>
                        {getTransactionIcon(transaction.type)}
                      </Text>
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionDescription}>
                        {transaction.description}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {transaction.date}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        transaction.amount > 0
                          ? styles.transactionAmountPositive
                          : styles.transactionAmountNegative,
                      ]}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {transaction.amount.toLocaleString()}₮
                    </Text>
                    <View
                      style={[
                        styles.transactionStatus,
                        {
                          backgroundColor:
                            getStatusColor(transaction.status) + '20',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.transactionStatusText,
                          { color: getStatusColor(transaction.status) },
                        ]}
                      >
                        {getStatusText(transaction.status)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Withdraw Modal */}
      <Modal
        visible={showWithdrawModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowWithdrawModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Данс руу шилжүүлэх</Text>
            <Text style={styles.modalSubtitle}>
              Хүлээгдэх хугацаа: 24-72 цаг
            </Text>

            <View style={styles.modalInputContainer}>
              <Text style={styles.modalLabel}>Дүн (₮)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="0"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
              />
              <Text style={styles.modalHint}>
                Үлдэгдэл: ₮{walletBalance.toLocaleString()}
              </Text>
            </View>

            <View style={styles.modalInputContainer}>
              <Text style={styles.modalLabel}>Дансны дугаар</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="1234567890"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={bankAccount}
                onChangeText={setBankAccount}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowWithdrawModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Болих</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleWithdraw}
              >
                <Text style={styles.modalButtonTextConfirm}>Илгээх</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Topup Modal */}
      <Modal
        visible={showTopupModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTopupModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>QPay цэнэглэх</Text>
            <Text style={styles.modalSubtitle}>
              QPay-ээр хэтэвчээ цэнэглэх
            </Text>

            <View style={styles.modalInputContainer}>
              <Text style={styles.modalLabel}>Дүн (₮)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="3000"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={topupAmount}
                onChangeText={setTopupAmount}
              />
            </View>

            <View style={styles.qpayInfo}>
              <Text style={styles.qpayIcon}>💳</Text>
              <Text style={styles.qpayText}>
                QPay төлбөрийн хуудас нээгдэх болно
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowTopupModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Болих</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleTopup}
              >
                <Text style={styles.modalButtonTextConfirm}>Төлөх</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  balanceCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  balanceGradient: {
    padding: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  balanceButtonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  balanceButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  infoCard: {
    backgroundColor: '#fff3cd',
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
    color: '#856404',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  transactionList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionAmountPositive: {
    color: '#4caf50',
  },
  transactionAmountNegative: {
    color: '#f44336',
  },
  transactionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  transactionStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },
  modalInputContainer: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  modalHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  qpayInfo: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  qpayIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  qpayText: {
    fontSize: 14,
    color: '#1976d2',
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#f5f5f5',
  },
  modalButtonConfirm: {
    backgroundColor: '#667eea',
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  modalButtonTextConfirm: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});