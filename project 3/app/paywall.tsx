import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Star } from 'lucide-react-native';

export default function PaywallScreen() {
  const router = useRouter();

  const features = [
    'Personalized style recommendations',
    'AI-powered outfit analysis',
    'Unlimited wardrobe organization',
    'Trend forecasting and alerts',
    'Shopping recommendations',
    'Style progression tracking'
  ];

  const handleSubscribe = () => {
    // In a real app, handle subscription logic here
    router.push('/analysis-results');
  };

  const handleRestore = () => {
    // Handle restore purchase
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Unlock Stylizer Premium</Text>
          <Text style={styles.subtitle}>
            Get personalized style recommendations and expert analysis
          </Text>
        </View>

        <View style={styles.pricing}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$29.99</Text>
            <Text style={styles.period}>per year</Text>
          </View>
          <View style={styles.savings}>
            <Star size={16} color="#000" fill="#000" />
            <Text style={styles.savingsText}>Save 50% with annual plan</Text>
          </View>
        </View>

        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Check size={20} color="#000" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
          <Text style={styles.restoreButtonText}>Restore Purchase</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Cancel anytime. Subscription automatically renews unless canceled.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  pricing: {
    alignItems: 'center',
    marginVertical: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: '#000',
  },
  period: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  savings: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  savingsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  features: {
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  subscribeButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 15,
  },
  subscribeButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  restoreButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  restoreButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
  },
  terms: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  },
});