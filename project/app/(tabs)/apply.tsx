import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Linking } from 'react-native';
import Slider from '@react-native-community/slider';
import { ChevronRight, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react-native';

export default function ApplyScreen() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [creditCheckAccepted, setCreditCheckAccepted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    ssn: '',
    businessName: '',
    businessType: '',
    ein: '',
    dunsNumber: '',
    personalAddress: '',
    businessAddress: '',
    email: '',
    phone: '',
    workStatus: '',
    currentIncome: '',
    workAddress: '',
    employerPhone: '',
    employerEmail: '',
    references: '',
    assets: '',
  });

  const loanPurposes = [
    'Equipment',
    'Marketing Expense',
    'Payroll Expense',
    'Monthly Real Estate Expense',
    'Other',
  ];

  const togglePurpose = (purpose: string) => {
    setSelectedPurposes(current => {
      if (current.includes(purpose)) {
        return current.filter(p => p !== purpose);
      } else {
        return [...current, purpose];
      }
    });
  };

  const handleChimeSignup = () => {
    Linking.openURL('https://chime.com/r/cammesaplummer?c=s');
  };

  const creditBureaus = [
    {
      name: 'Experian',
      url: 'https://www.experian.com',
    },
    {
      name: 'Equifax',
      url: 'https://www.equifax.com',
    },
    {
      name: 'TransUnion',
      url: 'https://www.transunion.com',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Loan Application</Text>
        <Text style={styles.subtitle}>Up to $1,000,000 in funding for your business</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loan Amount</Text>
        <Text style={styles.amountDisplay}>${loanAmount.toLocaleString()}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1000}
          maximumValue={1000000}
          step={1000}
          value={loanAmount}
          onValueChange={setLoanAmount}
          minimumTrackTintColor="#f97316"
          maximumTrackTintColor="#e2e8f0"
          thumbTintColor="#f97316"
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>$1,000</Text>
          <Text style={styles.sliderLabel}>$1,000,000</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loan Purpose</Text>
        <Text style={styles.sectionDescription}>
          Select all purposes that apply for this loan. Supporting documentation will be required for each selected purpose.
        </Text>
        <View style={styles.purposeButtons}>
          {loanPurposes.map((purpose) => (
            <TouchableOpacity
              key={purpose}
              style={[
                styles.purposeButton,
                selectedPurposes.includes(purpose) && styles.purposeButtonSelected,
              ]}
              onPress={() => togglePurpose(purpose)}>
              <View style={styles.purposeButtonContent}>
                {selectedPurposes.includes(purpose) ? (
                  <CheckCircle2 size={20} color="#ffffff" style={styles.purposeCheckmark} />
                ) : null}
                <Text
                  style={[
                    styles.purposeButtonText,
                    selectedPurposes.includes(purpose) && styles.purposeButtonTextSelected,
                  ]}>
                  {purpose}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {selectedPurposes.length > 0 && (
          <View style={styles.selectedPurposesContainer}>
            <Text style={styles.selectedPurposesTitle}>Selected Purposes:</Text>
            {selectedPurposes.map((purpose) => (
              <View key={purpose} style={styles.selectedPurposeItem}>
                <CheckCircle2 size={16} color="#f97316" />
                <Text style={styles.selectedPurposeText}>{purpose}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            placeholderTextColor="#94a3b8"
          />
          <TextInput
            style={[styles.input, { width: 60 }]}
            placeholder="M.I."
            maxLength={1}
            value={formData.middleInitial}
            onChangeText={(text) => setFormData({ ...formData, middleInitial: text })}
            placeholderTextColor="#94a3b8"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Social Security Number"
          keyboardType="number-pad"
          maxLength={9}
          value={formData.ssn}
          onChangeText={(text) => setFormData({ ...formData, ssn: text })}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Business Name"
          value={formData.businessName}
          onChangeText={(text) => setFormData({ ...formData, businessName: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Business Entity Type"
          value={formData.businessType}
          onChangeText={(text) => setFormData({ ...formData, businessType: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="EIN Number"
          value={formData.ein}
          onChangeText={(text) => setFormData({ ...formData, ein: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="DUNS Number"
          value={formData.dunsNumber}
          onChangeText={(text) => setFormData({ ...formData, dunsNumber: text })}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Personal Address"
          value={formData.personalAddress}
          onChangeText={(text) => setFormData({ ...formData, personalAddress: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Business Address"
          value={formData.businessAddress}
          onChangeText={(text) => setFormData({ ...formData, businessAddress: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employment & Income</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Work Status"
          value={formData.workStatus}
          onChangeText={(text) => setFormData({ ...formData, workStatus: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Current Monthly Income"
          keyboardType="numeric"
          value={formData.currentIncome}
          onChangeText={(text) => setFormData({ ...formData, currentIncome: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Work Address"
          value={formData.workAddress}
          onChangeText={(text) => setFormData({ ...formData, workAddress: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Employer Phone"
          value={formData.employerPhone}
          onChangeText={(text) => setFormData({ ...formData, employerPhone: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Employer Email"
          value={formData.employerEmail}
          onChangeText={(text) => setFormData({ ...formData, employerEmail: text })}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="References"
          multiline
          numberOfLines={4}
          value={formData.references}
          onChangeText={(text) => setFormData({ ...formData, references: text })}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Assets"
          multiline
          numberOfLines={4}
          value={formData.assets}
          onChangeText={(text) => setFormData({ ...formData, assets: text })}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Credit Bureaus</Text>
        <Text style={styles.sectionDescription}>
          Check your credit score with any of these credit bureaus:
        </Text>
        <View style={styles.creditBureaus}>
          {creditBureaus.map((bureau) => (
            <TouchableOpacity
              key={bureau.name}
              style={styles.bureauButton}
              onPress={() => Linking.openURL(bureau.url)}>
              <Text style={styles.bureauButtonText}>{bureau.name}</Text>
              <ChevronRight size={20} color="#f97316" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.chimeButton} onPress={handleChimeSignup}>
          <Text style={styles.chimeButtonText}>Open a Chime Account</Text>
          <Text style={styles.chimeButtonSubtext}>Get your loan funds faster</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Terms & Conditions</Text>
        
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setCreditCheckAccepted(!creditCheckAccepted)}>
            {creditCheckAccepted ? (
              <CheckCircle2 size={24} color="#f97316" />
            ) : (
              <AlertCircle size={24} color="#94a3b8" />
            )}
            <Text style={styles.checkboxText}>
              I authorize HoneyBee Loan to perform a soft credit check
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}>
            {termsAccepted ? (
              <CheckCircle2 size={24} color="#f97316" />
            ) : (
              <AlertCircle size={24} color="#94a3b8" />
            )}
            <Text style={styles.checkboxText}>
              I agree to the terms and conditions, including verification process and no guarantee of approval
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By submitting this application, you acknowledge that:
          {'\n\n'}
          • All information provided is accurate and complete
          {'\n'}
          • Supporting documentation will be required
          {'\n'}
          • Application will be reviewed by an underwriter
          {'\n'}
          • Approval is not guaranteed
          {'\n'}
          • Soft credit check will be performed
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          (!termsAccepted || !creditCheckAccepted || selectedPurposes.length === 0) && styles.submitButtonDisabled,
        ]}
        disabled={!termsAccepted || !creditCheckAccepted || selectedPurposes.length === 0}>
        <Text style={styles.submitButtonText}>Submit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    opacity: 0.9,
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#f97316',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
    marginBottom: 16,
  },
  amountDisplay: {
    fontSize: 36,
    fontFamily: 'Inter_700Bold',
    color: '#f97316',
    textAlign: 'center',
    marginBottom: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
  },
  purposeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  purposeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  purposeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purposeCheckmark: {
    marginRight: 8,
  },
  purposeButtonSelected: {
    backgroundColor: '#f97316',
    borderColor: '#f97316',
  },
  purposeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#94a3b8',
  },
  purposeButtonTextSelected: {
    color: '#ffffff',
  },
  selectedPurposesContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff7ed',
    borderRadius: 8,
  },
  selectedPurposesTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#94a3b8',
    marginBottom: 8,
  },
  selectedPurposeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  selectedPurposeText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1e293b',
  },
  inputGroup: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1e293b',
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  creditBureaus: {
    gap: 8,
  },
  bureauButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff7ed',
    borderRadius: 8,
  },
  bureauButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
  },
  chimeButton: {
    backgroundColor: '#f97316',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  chimeButtonText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  chimeButtonSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#ffffff',
    opacity: 0.9,
  },
  termsContainer: {
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1e293b',
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#f97316',
    margin: 24,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#ffffff',
  },
});