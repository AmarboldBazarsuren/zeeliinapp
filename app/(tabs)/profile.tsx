import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const [user] = useState({
    name: 'Батбаяр',
    phone: '+976 88888888',
    email: 'batbayar@example.com',
    registerNumber: 'АА12345678',
    memberSince: '2024-01-15',
    creditScore: 750,
  });

  const menuItems = [
    {
      icon: '👤',
      title: 'Хувийн мэдээлэл',
      subtitle: 'Таны мэдээллийг засах',
      onPress: () => router.push('/personal-info'),
    },
    {
      icon: '🔔',
      title: 'Мэдэгдэл',
      subtitle: 'Мэдэгдлийн тохиргоо',
      onPress: () => Alert.alert('Тун удахгүй', 'Энэ функц тун удахгүй нэмэгдэх болно'),
    },
    {
      icon: '🔒',
      title: 'Нууцлал ба аюулгүй байдал',
      subtitle: 'Нууц үг, биометрик тохиргоо',
      onPress: () => Alert.alert('Тун удахгүй', 'Энэ функц тун удахгүй нэмэгдэх болно'),
    },
    {
      icon: '💳',
      title: 'Банкны мэдээлэл',
      subtitle: 'Дансны мэдээлэл удирдах',
      onPress: () => Alert.alert('Тун удахгүй', 'Энэ функц тун удахгүй нэмэгдэх болно'),
    },
    {
      icon: '📄',
      title: 'Үйлчилгээний нөхцөл',
      subtitle: 'Нөхцөл болон журам',
      onPress: () => Alert.alert('Тун удахгүй', 'Энэ функц тун удахгүй нэмэгдэх болно'),
    },
    {
      icon: '❓',
      title: 'Тусламж ба дэмжлэг',
      subtitle: 'Холбогдох мэдээлэл',
      onPress: () => Alert.alert('Холбоо барих', 'И-мэйл: support@zeelinapp.mn\nУтас: 7777-7777'),
    },
  ];

  const handleLogout = () => {
    Alert.alert('Гарах', 'Та системээс гарахдаа итгэлтэй байна уу?', [
      { text: 'Үгүй', style: 'cancel' },
      {
        text: 'Тийм',
        style: 'destructive',
        onPress: () => router.replace('/(auth)/login'),
      },
    ]);
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 700) return '#4caf50';
    if (score >= 600) return '#ff9800';
    return '#f44336';
  };

  const getCreditScoreLabel = (score: number) => {
    if (score >= 700) return 'Маш сайн';
    if (score >= 600) return 'Сайн';
    return 'Дундаж';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Profile Card */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userPhone}>{user.phone}</Text>
            <View style={styles.memberSinceBadge}>
              <Text style={styles.memberSinceText}>
                Гишүүнчлэл: {user.memberSince}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Credit Score Card */}
          <View style={styles.creditScoreCard}>
            <View style={styles.creditScoreHeader}>
              <Text style={styles.creditScoreTitle}>Зээлийн оноо</Text>
              <Text style={styles.creditScoreInfo}>ℹ️</Text>
            </View>
            <View style={styles.creditScoreBody}>
              <View
                style={[
                  styles.creditScoreCircle,
                  { borderColor: getCreditScoreColor(user.creditScore) },
                ]}
              >
                <Text
                  style={[
                    styles.creditScoreValue,
                    { color: getCreditScoreColor(user.creditScore) },
                  ]}
                >
                  {user.creditScore}
                </Text>
                <Text style={styles.creditScoreMaxValue}>/850</Text>
              </View>
              <View style={styles.creditScoreDetails}>
                <View
                  style={[
                    styles.creditScoreBadge,
                    {
                      backgroundColor:
                        getCreditScoreColor(user.creditScore) + '20',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.creditScoreBadgeText,
                      { color: getCreditScoreColor(user.creditScore) },
                    ]}
                  >
                    {getCreditScoreLabel(user.creditScore)}
                  </Text>
                </View>
                <Text style={styles.creditScoreDescription}>
                  Таны зээлийн түүх сайн байна. Та илүү сайн нөхцөлтэй зээл авах
                  боломжтой.
                </Text>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuItemIcon}>
                    <Text style={styles.menuItemEmoji}>{item.icon}</Text>
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Гарах</Text>
          </TouchableOpacity>

          {/* Version Info */}
          <Text style={styles.versionText}>ZeelinApp v1.0.0</Text>
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
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  profileCard: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#667eea',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  memberSinceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  memberSinceText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    padding: 20,
    marginTop: -60,
  },
  creditScoreCard: {
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
  creditScoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  creditScoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  creditScoreInfo: {
    fontSize: 20,
  },
  creditScoreBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  creditScoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditScoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  creditScoreMaxValue: {
    fontSize: 12,
    color: '#999',
  },
  creditScoreDetails: {
    flex: 1,
  },
  creditScoreBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  creditScoreBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  creditScoreDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemEmoji: {
    fontSize: 20,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#ccc',
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ff4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4444',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
});