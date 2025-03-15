import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, History, Heart, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.profileName}>Sarah Johnson</Text>
        <Text style={styles.profileBio}>Fashion enthusiast | Minimalist style</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Analyses</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8.5</Text>
            <Text style={styles.statLabel}>Avg. Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Saved Items</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Style Profile</Text>
        <View style={styles.styleTagsContainer}>
          <View style={styles.styleTag}>
            <Text style={styles.styleTagText}>Minimalist</Text>
          </View>
          <View style={styles.styleTag}>
            <Text style={styles.styleTagText}>Casual</Text>
          </View>
          <View style={styles.styleTag}>
            <Text style={styles.styleTagText}>Modern</Text>
          </View>
          <View style={styles.styleTag}>
            <Text style={styles.styleTagText}>Neutral</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <History size={20} color="#000" />
          <Text style={styles.menuItemText}>Analysis History</Text>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Heart size={20} color="#000" />
          <Text style={styles.menuItemText}>Saved Recommendations</Text>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.recentAnalysisContainer}>
        <Text style={styles.sectionTitle}>Recent Analysis</Text>
        <View style={styles.recentAnalysisCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.recentAnalysisImage} 
          />
          <View style={styles.recentAnalysisContent}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>8.2/10</Text>
            </View>
            <Text style={styles.recentAnalysisDate}>May 15, 2025</Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#000',
  },
  settingsButton: {
    padding: 5,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000',
    marginBottom: 5,
  },
  profileBio: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#f0f0f0',
  },
  sectionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 15,
  },
  styleTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  styleTag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  styleTagText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
  },
  menuContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginLeft: 15,
  },
  recentAnalysisContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  recentAnalysisCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentAnalysisImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recentAnalysisContent: {
    padding: 15,
  },
  ratingContainer: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  ratingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  recentAnalysisDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
});