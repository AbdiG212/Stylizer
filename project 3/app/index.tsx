import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Sparkles } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Stylizer</Text>
      </View>

      <View style={styles.heroSection}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Your AI Fashion Stylist</Text>
          <Text style={styles.heroSubtitle}>
            Get personalized style recommendations and outfit analysis powered by AI
          </Text>
        </View>
      </View>

      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Sparkles size={24} color="#000" />
          </View>
          <Text style={styles.featureTitle}>Style Analysis</Text>
          <Text style={styles.featureDescription}>
            Get detailed feedback on your outfits
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Sparkles size={24} color="#000" />
          </View>
          <Text style={styles.featureTitle}>Personal Recommendations</Text>
          <Text style={styles.featureDescription}>
            Discover pieces that match your style
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Sparkles size={24} color="#000" />
          </View>
          <Text style={styles.featureTitle}>Style Evolution</Text>
          <Text style={styles.featureDescription}>
            Track your fashion journey
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => router.push('/quiz')}
        >
          <Text style={styles.startButtonText}>Start Style Analysis</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#000',
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
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  featuresContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featureItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  featureDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
});