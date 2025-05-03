import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, Clock, DollarSign, Phone, Mail, MessageSquare, Calendar, ArrowRight } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  const handleCallSupport = () => {
    Linking.openURL('tel:973-283-5937');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@honeybeeloan.com');
  };

  const handleScheduleMeeting = () => {
    router.push('/schedule');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Image
            source={{ uri: 'https://www.tibooit.com/wp-content/uploads/2025/03/HoneyBeeLoanlogo.png' }}
            style={styles.logo}
          />
          <Text style={styles.title}>HoneyBee Loan</Text>
          <Text style={styles.subtitle}>Empowering Business Growth</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>$1M+</Text>
          <Text style={styles.statLabel}>Maximum Loan</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1hr</Text>
          <Text style={styles.statLabel}>Fast Approval</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5.99%</Text>
          <Text style={styles.statLabel}>Starting APR</Text>
        </View>
      </View>

      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Shield size={32} color="#f97316" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>No Credit Impact</Text>
            <Text style={styles.featureText}>Apply with confidence - no impact on your credit score</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Clock size={32} color="#f97316" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Quick Decision</Text>
            <Text style={styles.featureText}>Get approved in as little as 1 hour</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <DollarSign size={32} color="#f97316" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Flexible Funding</Text>
            <Text style={styles.featureText}>Borrow $1,000 to $1,000,000</Text>
          </View>
        </View>
      </View>

      <View style={styles.loanTermsCard}>
        <Text style={styles.cardTitle}>Loan Terms</Text>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Interest Rate</Text>
          <Text style={styles.termValue}>From 5.99% APR</Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Loan Term</Text>
          <Text style={styles.termValue}>Up to 60 months</Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Funding Time</Text>
          <Text style={styles.termValue}>As fast as 24 hours</Text>
        </View>
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Prepayment</Text>
          <Text style={styles.termValue}>No penalties</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => router.push('/apply')}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
        <Text style={styles.applyButtonSubtext}>Free application • No obligations</Text>
      </TouchableOpacity>

      <View style={styles.contactSection}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactTitle}>Contact Our Loan Specialists</Text>
          <Text style={styles.contactSubtitle}>Get expert guidance for your business loan needs</Text>
        </View>

        <View style={styles.contactCards}>
          <TouchableOpacity style={styles.contactCard} onPress={handleCallSupport}>
            <View style={styles.contactIconContainer}>
              <Phone size={28} color="#f97316" />
            </View>
            <Text style={styles.contactCardTitle}>Call Now</Text>
            <Text style={styles.contactCardPhone}>973-283-5937</Text>
            <Text style={styles.contactCardText}>Speak with a specialist immediately</Text>
            <View style={styles.contactCardAction}>
              <Text style={styles.contactCardActionText}>Call us</Text>
              <ArrowRight size={16} color="#f97316" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactCard} 
            onPress={() => router.push('/chat')}>
            <View style={styles.contactIconContainer}>
              <MessageSquare size={28} color="#f97316" />
            </View>
            <Text style={styles.contactCardTitle}>Live Chat</Text>
            <Text style={styles.contactCardStatus}>Online Now</Text>
            <Text style={styles.contactCardText}>Get instant answers to your questions</Text>
            <View style={styles.contactCardAction}>
              <Text style={styles.contactCardActionText}>Start chat</Text>
              <ArrowRight size={16} color="#f97316" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleEmailSupport}>
            <View style={styles.contactIconContainer}>
              <Mail size={28} color="#f97316" />
            </View>
            <Text style={styles.contactCardTitle}>Email Us</Text>
            <Text style={styles.contactCardEmail}>support@honeybeeloan.com</Text>
            <Text style={styles.contactCardText}>Detailed responses within 24 hours</Text>
            <View style={styles.contactCardAction}>
              <Text style={styles.contactCardActionText}>Send email</Text>
              <ArrowRight size={16} color="#f97316" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleScheduleMeeting}>
            <View style={styles.contactIconContainer}>
              <Calendar size={28} color="#f97316" />
            </View>
            <Text style={styles.contactCardTitle}>Schedule Meeting</Text>
            <Text style={styles.contactCardText}>Book a video call with our loan experts</Text>
            <View style={styles.contactCardAction}>
              <Text style={styles.contactCardActionText}>Schedule now</Text>
              <ArrowRight size={16} color="#f97316" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.contactNote}>
          <Text style={styles.contactNoteText}>
            Our loan specialists are available Monday through Friday, 9:00 AM to 6:00 PM EST
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          HoneyBee Loan © 2024. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroSection: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: -50,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  },
  featuresContainer: {
    padding: 20,
    marginTop: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#64748b',
  },
  loanTermsCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  termRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  termLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  termValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  applyButton: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f97316',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  applyButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  applyButtonSubtext: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  contactHeader: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  contactSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  contactCards: {
    gap: 16,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  contactCardPhone: {
    fontSize: 16,
    color: '#f97316',
    marginBottom: 8,
  },
  contactCardEmail: {
    fontSize: 16,
    color: '#f97316',
    marginBottom: 8,
  },
  contactCardStatus: {
    fontSize: 14,
    color: '#10b981',
    marginBottom: 8,
  },
  contactCardText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  contactCardAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactCardActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f97316',
    marginRight: 8,
  },
  contactNote: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contactNoteText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
  },
});