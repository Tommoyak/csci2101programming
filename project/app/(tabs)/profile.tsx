import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { Settings, CreditCard, Bell, Lock, CircleHelp as HelpCircle, LogOut, ChevronRight, Shield, Wallet, FileText, Building2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const loanStats = [
    {
      number: '$50K',
      label: 'Total Credit',
      color: '#f97316',
    },
    {
      number: '720',
      label: 'Credit Score',
      color: '#10b981',
    },
    {
      number: '2',
      label: 'Active Loans',
      color: '#f97316',
    },
  ];

  const quickActions = [
    {
      icon: <FileText size={24} color="#f97316" />,
      title: 'Apply for Loan',
      onPress: () => router.push('/apply'),
    },
    {
      icon: <Building2 size={24} color="#f97316" />,
      title: 'Business Profile',
      onPress: () => router.push('/business'),
    },
    {
      icon: <Wallet size={24} color="#f97316" />,
      title: 'Payment History',
      onPress: () => router.push('/payments'),
    },
  ];

  const menuSections = [
    {
      title: 'Account',
      items: [
        {
          icon: <Settings size={24} color="#f97316" />,
          title: 'Account Settings',
          description: 'Manage your account preferences',
          onPress: () => router.push('/settings'),
        },
        {
          icon: <CreditCard size={24} color="#f97316" />,
          title: 'Payment Methods',
          description: 'Manage your payment options',
          onPress: () => router.push('/payment-methods'),
        },
        {
          icon: <Bell size={24} color="#f97316" />,
          title: 'Notifications',
          description: 'Set your notification preferences',
          badge: '3',
          onPress: () => router.push('/notifications'),
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          icon: <Lock size={24} color="#f97316" />,
          title: 'Security Settings',
          description: 'Update your security preferences',
          onPress: () => router.push('/security'),
        },
        {
          icon: <Shield size={24} color="#f97316" />,
          title: 'Privacy',
          description: 'Manage your privacy settings',
          onPress: () => router.push('/privacy'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle size={24} color="#f97316" />,
          title: 'Help & Support',
          description: 'Get help with your account',
          onPress: () => router.push('/support'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>John Smith</Text>
          <Text style={styles.businessName}>Smith Enterprises LLC</Text>
          <Text style={styles.email}>john.smith@example.com</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {loanStats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={[styles.statNumber, { color: stat.color }]}>{stat.number}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quickActionsContainer}>
        {quickActions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.quickActionButton} onPress={action.onPress}>
            <View style={styles.quickActionIcon}>{action.icon}</View>
            <Text style={styles.quickActionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              <ChevronRight size={20} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  businessName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#f97316',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    textAlign: 'center',
  },
  menuSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748b',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#ef4444',
    marginLeft: 8,
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
    marginBottom: 32,
  },
});