import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, TrendingUp, Sparkles, Calendar, Users, ArrowRight, Star } from 'lucide-react-native';
import RatingStars from '../../components/RatingStars';

export default function HomeScreen() {
  const router = useRouter();
  const userName = "Sarah"; // This would come from user state/context

  const analyzeOutfit = () => {
    router.push('/outfit-photo');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}</Text>
          <View style={styles.tipContainer}>
            <Text style={styles.tipLabel}>TODAY'S STYLE TIP</Text>
            <Text style={styles.dailyTip}>
              Mix textures to elevate your look - try pairing silk with denim for an effortlessly chic ensemble
            </Text>
          </View>
        </View>
      </View>

      {/* Last Analysis Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Style Analysis</Text>
        <View style={styles.analysisCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop' }}
            style={styles.outfitImage}
          />
          <View style={styles.analysisContent}>
            <View style={styles.ratingContainer}>
              <RatingStars rating={8.5} size={20} />
              <Text style={styles.ratingText}>8.5/10 - Modern & Chic!</Text>
            </View>
            <Text style={styles.feedbackText}>
              "Great color coordination! Try adding a blazer to elevate this look further."
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.analyzeButton} onPress={analyzeOutfit}>
          <Camera size={24} color="#fff" />
          <Text style={styles.analyzeButtonText}>Analyze Today's Outfit</Text>
        </TouchableOpacity>
      </View>

      {/* Style Feed Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationsScroll}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.recommendationCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop' }}
                style={styles.recommendationImage}
              />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Classic White Blazer</Text>
                <Text style={styles.recommendationPrice}>$89.99</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Style Challenge */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Style Challenge</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeIcon}>
            <Sparkles size={24} color="#000" />
          </View>
          <Text style={styles.challengeTitle}>Monochrome Monday</Text>
          <Text style={styles.challengeDescription}>
            Create an outfit using different shades of the same color. Show us your creativity!
          </Text>
          <TouchableOpacity style={styles.challengeButton}>
            <Text style={styles.challengeButtonText}>Accept Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Style Journey</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#000" />
            <Text style={styles.statNumber}>15%</Text>
            <Text style={styles.statLabel}>Style Growth</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color="#000" />
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Outfits Analyzed</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={24} color="#000" />
            <Text style={styles.statNumber}>142</Text>
            <Text style={styles.statLabel}>Community Likes</Text>
          </View>
        </View>
      </View>

      {/* Wardrobe Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wardrobe Insights</Text>
        <View style={styles.insightCard}>
          <Star size={24} color="#000" />
          <Text style={styles.insightText}>
            Your white sneakers have been in 20 outfits! Time for a refresh?
          </Text>
          <TouchableOpacity style={styles.insightButton}>
            <Text style={styles.insightButtonText}>View Alternatives</Text>
            <ArrowRight size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 20,
  },
  tipContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
  },
  tipLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#666',
    letterSpacing: 1,
    marginBottom: 8,
  },
  dailyTip: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000',
    marginBottom: 15,
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
  },
  analysisCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  outfitImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  analysisContent: {
    padding: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  feedbackText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quickActions: {
    padding: 20,
  },
  analyzeButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  analyzeButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  recommendationsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  recommendationCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recommendationContent: {
    padding: 10,
  },
  recommendationTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  recommendationPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#000',
  },
  challengeCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  challengeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  challengeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
  },
  challengeDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  challengeButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  challengeButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#000',
    marginVertical: 8,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  insightCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
  },
  insightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
    marginVertical: 10,
    lineHeight: 20,
  },
  insightButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
    marginRight: 5,
  },
});