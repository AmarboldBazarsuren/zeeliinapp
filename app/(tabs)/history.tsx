import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type LoanStatus = 'active' | 'completed' | 'pending' | 'rejected';

interface LoanHistory {
  id: string;
  amount: number;
  status: LoanStatus;
  date: string;
  term: number;
  paidMonths?: number;
  remaining?: number;
}

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<LoanStatus | 'all'>('all');

  const loanHistory: LoanHistory[] = [
    {
      id: '1',
      amount: 5000000,
      status: 'active',
      date: '2025-12-01',
      term: 12,
      paidMonths: 2,
      remaining: 3200000,
    },
    {
      id: '2',
      amount: 2000000,
      status: 'completed',
      date: '2024-08-15',
      term: 12,
      paidMonths: 12,
      remaining: 0,
    },
    {
      id: '3',
      amount: 3000000,
      status: 'pending',
      date: '2026-01-28',
      term: 18,
    },
    {
      id: '4',
      amount: 1500000,
      status: 'rejected',
      date: '2025-10-10',
      term: 6,
    },
  ];

  const filters = [
    { key: 'all', label: 'Бүгд' },
    { key: 'active', label: 'Идэвхтэй' },
    { key: 'pending', label: 'Хүлээгдэж буй' },
    { key: 'completed', label: 'Дууссан' },
    { key: 'rejected', label: 'Татгалзсан' },
  ];

  const getStatusColor = (status: LoanStatus) => {
    switch (status) {
      case 'active':
        return '#4caf50';
      case 'completed':
        return '#2196f3';
      case 'pending':
        return '#ff9800';
      case 'rejected':
        return '#f44336';
    }
  };

  const getStatusText = (status: LoanStatus) => {
    switch (status) {
      case 'active':
        return 'Идэвхтэй';
      case 'completed':
        return 'Дууссан';
      case 'pending':
        return 'Хүлээгдэж буй';
      case 'rejected':
        return 'Татгалзсан';
    }
  };

  const getStatusIcon = (status: LoanStatus) => {
    switch (status) {
      case 'active':
        return '✅';
      case 'completed':
        return '🎉';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '❌';
    }
  };

  const filteredLoans =
    selectedFilter === 'all'
      ? loanHistory
      : loanHistory.filter((loan) => loan.status === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Зээлийн түүх</Text>
          <Text style={styles.headerSubtitle}>
            Таны бүх зээлийн түүх хадгалагдсан
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter.key as any)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === filter.key &&
                      styles.filterButtonTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {loanHistory.filter((l) => l.status === 'active').length}
              </Text>
              <Text style={styles.statLabel}>Идэвхтэй</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {loanHistory.filter((l) => l.status === 'completed').length}
              </Text>
              <Text style={styles.statLabel}>Дууссан</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {loanHistory.filter((l) => l.status === 'pending').length}
              </Text>
              <Text style={styles.statLabel}>Хүлээгдэж буй</Text>
            </View>
          </View>

          {/* Loan History List */}
          <View style={styles.historyList}>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <TouchableOpacity
                  key={loan.id}
                  style={styles.loanCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.loanCardHeader}>
                    <View style={styles.loanCardLeft}>
                      <Text style={styles.loanIcon}>
                        {getStatusIcon(loan.status)}
                      </Text>
                      <View>
                        <Text style={styles.loanAmount}>
                          ₮{loan.amount.toLocaleString()}
                        </Text>
                        <Text style={styles.loanDate}>{loan.date}</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(loan.status) + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(loan.status) },
                        ]}
                      >
                        {getStatusText(loan.status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.loanCardDivider} />

                  <View style={styles.loanCardDetails}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Хугацаа</Text>
                      <Text style={styles.detailValue}>{loan.term} сар</Text>
                    </View>

                    {loan.status === 'active' && loan.paidMonths && (
                      <>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>Төлсөн</Text>
                          <Text style={styles.detailValue}>
                            {loan.paidMonths}/{loan.term} сар
                          </Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>Үлдэгдэл</Text>
                          <Text style={[styles.detailValue, styles.remainingAmount]}>
                            ₮{loan.remaining?.toLocaleString()}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>

                  {loan.status === 'active' && (
                    <TouchableOpacity style={styles.payButton}>
                      <Text style={styles.payButtonText}>Төлбөр төлөх</Text>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateEmoji}>📋</Text>
                <Text style={styles.emptyStateText}>
                  Одоогоор түүх байхгүй байна
                </Text>
              </View>
            )}
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
  filtersContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  historyList: {
    gap: 16,
  },
  loanCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loanCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  loanCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loanIcon: {
    fontSize: 32,
  },
  loanAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  loanDate: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  loanCardDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  loanCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  remainingAmount: {
    color: '#667eea',
  },
  payButton: {
    marginTop: 16,
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
  },
});