import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [userName] = useState('Батбаяр');
  const [currentLoan] = useState({
    amount: 5000000,
    remaining: 3200000,
    nextPayment: 450000,
    nextPaymentDate: '2026-02-15',
    daysLeft: 11,
  });

  const quickActions = [
    { icon: '💰', title: 'Зээл авах', color: '#667eea', route: '/loans' },
    { icon: '👛', title: 'Хэтэвч', color: '#f093fb', route: '/wallet' },
    { icon: '📋', title: 'Түүх', color: '#4facfe', route: '/history' },
    { icon: '👤', title: 'Профайл', color: '#43e97b', route: '/profile' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Сайн байна уу,</Text>
              <Text style={styles.userName}>{userName} 👋</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Current Loan Card */}
        <View style={styles.content}>
          <View style={styles.loanCard}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.loanCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.loanCardHeader}>
                <Text style={styles.loanCardTitle}>Идэвхтэй зээл</Text>
                <View style={styles.loanStatusBadge}>
                  <Text style={styles.loanStatusText}>Идэвхтэй</Text>
                </View>
              </View>

              <Text style={styles.loanAmount}>
                ₮{currentLoan.remaining.toLocaleString()}
              </Text>
              <Text style={styles.loanAmountLabel}>Үлдэгдэл</Text>

              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${
                          ((currentLoan.amount - currentLoan.remaining) /
                            currentLoan.amount) *
                          100
                        }%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(
                    ((currentLoan.amount - currentLoan.remaining) /
                      currentLoan.amount) *
                      100
                  )}
                  % төлсөн
                </Text>
              </View>

              <View style={styles.loanCardFooter}>
                <View style={styles.loanInfoItem}>
                  <Text style={styles.loanInfoLabel}>Дараагийн төлбөр</Text>
                  <Text style={styles.loanInfoValue}>
                    ₮{currentLoan.nextPayment.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.loanInfoDivider} />
                <View style={styles.loanInfoItem}>
                  <Text style={styles.loanInfoLabel}>Өдөр үлдсэн</Text>
                  <Text style={styles.loanInfoValue}>
                    {currentLoan.daysLeft} өдөр
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Хурдан үйлдлүүд</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickActionCard}
                  onPress={() => router.push(action.route as any)}
                >
                  <View
                    style={[
                      styles.quickActionIcon,
                      { backgroundColor: action.color + '20' },
                    ]}
                  >
                    <Text style={styles.quickActionEmoji}>{action.icon}</Text>
                  </View>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Сүүлийн үйл ажиллагаа</Text>
              <TouchableOpacity onPress={() => router.push('/history')}>
                <Text style={styles.seeAllButton}>Бүгдийг харах →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <Text style={styles.activityIcon}>✅</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Төлбөр төлөгдсөн</Text>
                  <Text style={styles.activityDate}>2026-01-15</Text>
                </View>
                <Text style={styles.activityAmount}>-₮450,000</Text>
              </View>

              <View style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <Text style={styles.activityIcon}>📝</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Зээл батлагдсан</Text>
                  <Text style={styles.activityDate}>2025-12-01</Text>
                </View>
                <Text style={styles.activityAmountPositive}>
                  +₮5,000,000
                </Text>
              </View>

              <View style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <Text style={styles.activityIcon}>📤</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Хүсэлт илгээсэн</Text>
                  <Text style={styles.activityDate}>2025-11-28</Text>
                </View>
                <Text style={styles.activityAmountNeutral}>Хүлээгдэж байна</Text>
              </View>
            </View>
          </View>

          {/* Tips Card */}
          <View style={styles.tipsCard}>
            <Text style={styles.tipsEmoji}>💡</Text>
            <View style={styles.tipsContent}>
              <Text style={styles.tipsTitle}>Зөвлөгөө</Text>
              <Text style={styles.tipsText}>
                Төлбөрөө цагтаа төлж, зээлийн түүхээ сайжруулаарай!
              </Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ff4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    marginTop: -60,
  },
  loanCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  loanCardGradient: {
    padding: 24,
  },
  loanCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  loanCardTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loanStatusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  loanStatusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  loanAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  loanAmountLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loanCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loanInfoItem: {
    flex: 1,
  },
  loanInfoLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  loanInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  loanInfoDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionEmoji: {
    fontSize: 30,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff4444',
  },
  activityAmountPositive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  activityAmountNeutral: {
    fontSize: 12,
    color: '#ff9800',
  },
  tipsCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipsEmoji: {
    fontSize: 30,
    marginRight: 16,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 4,
  },
  tipsText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});