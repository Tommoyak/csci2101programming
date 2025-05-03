import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Clock, Mail, ArrowLeft, User, Briefcase, Phone } from 'lucide-react-native';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

const getBusinessDays = () => {
  const days = [];
  let date = new Date();
  while (days.length < 7) {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      days.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export default function ScheduleScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    topic: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) return;
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/send-meeting-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          ...formData,
          selectedDate: selectedDate.toISOString(),
          selectedTime,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to schedule meeting');
      }

      setSubmitted(true);

      // Reset form after 3 seconds and navigate back
      setTimeout(() => {
        router.back();
      }, 3000);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to schedule meeting. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <View style={styles.successIcon}>
            <Mail size={48} color="#f97316" />
          </View>
          <Text style={styles.successTitle}>Meeting Requested!</Text>
          <Text style={styles.successText}>
            We've received your meeting request for{'\n'}
            {selectedDate?.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} at {selectedTime} EST
          </Text>
          <Text style={styles.successSubtext}>
            Our team will confirm your appointment shortly via email.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/')}>
          <ArrowLeft size={24} color="#f97316" />
        </TouchableOpacity>
        <Text style={styles.title}>Schedule a Meeting</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={24} color="#f97316" />
            <Text style={styles.sectionTitle}>Select Date</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dateScroller}>
            {getBusinessDays().map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  selectedDate?.toDateString() === date.toDateString() && styles.dateButtonSelected,
                ]}
                onPress={() => setSelectedDate(date)}>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate?.toDateString() === date.toDateString() && styles.dateTextSelected,
                  ]}>
                  {formatDate(date)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color="#f97316" />
            <Text style={styles.sectionTitle}>Select Time (EST)</Text>
          </View>
          <View style={styles.timeGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.timeButtonSelected,
                ]}
                onPress={() => setSelectedTime(time)}>
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextSelected,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedDate && selectedTime && (
          <>
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Selected Schedule</Text>
              <Text style={styles.summaryText}>
                {formatDate(selectedDate)} at {selectedTime} EST
              </Text>
            </View>

            <View style={styles.formSection}>
              <View style={styles.inputGroup}>
                <View style={styles.inputIcon}>
                  <User size={20} color="#f97316" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Your Name *"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputIcon}>
                  <Briefcase size={20} color="#f97316" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Company Name"
                  value={formData.company}
                  onChangeText={(text) => setFormData({ ...formData, company: text })}
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputIcon}>
                  <Mail size={20} color="#f97316" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address *"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputIcon}>
                  <Phone size={20} color="#f97316" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number *"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="What would you like to discuss?"
                multiline
                numberOfLines={4}
                value={formData.topic}
                onChangeText={(text) => setFormData({ ...formData, topic: text })}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </>
        )}

        <TouchableOpacity
          style={[
            styles.scheduleButton,
            (!selectedDate || !selectedTime || isSubmitting) && styles.scheduleButtonDisabled,
          ]}
          onPress={handleSchedule}
          disabled={!selectedDate || !selectedTime || isSubmitting}>
          <Mail size={24} color="#ffffff" style={styles.scheduleIcon} />
          <Text style={styles.scheduleButtonText}>
            {isSubmitting ? 'Requesting...' : 'Request Meeting'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Note: All times are in Eastern Standard Time (EST). Our team will confirm your appointment via email within 24 hours.
        </Text>
      </ScrollView>
    </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginLeft: 12,
  },
  dateScroller: {
    flexGrow: 0,
    marginBottom: 8,
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dateButtonSelected: {
    backgroundColor: '#fff7ed',
    borderColor: '#f97316',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  dateTextSelected: {
    color: '#f97316',
    fontFamily: 'Inter_600SemiBold',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeButton: {
    width: '23%',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#fff7ed',
    borderColor: '#f97316',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  timeTextSelected: {
    color: '#f97316',
    fontFamily: 'Inter_600SemiBold',
  },
  summary: {
    padding: 16,
    backgroundColor: '#fff7ed',
    borderRadius: 12,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#f97316',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
  },
  formSection: {
    marginBottom: 24,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff7ed',
    borderRadius: 8,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f97316',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  scheduleButtonDisabled: {
    backgroundColor: '#e2e8f0',
  },
  scheduleIcon: {
    marginRight: 8,
  },
  scheduleButtonText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#ffffff',
  },
  note: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successContent: {
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  successText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  successSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
    textAlign: 'center',
  },
});