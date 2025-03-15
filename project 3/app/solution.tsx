import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight, Youtube, Instagram, Users, ShoppingBag, Eye, MapPin, Video, Share2, BookOpen } from 'lucide-react-native';

export default function SolutionScreen() {
  const router = useRouter();
  const { efforts } = useLocalSearchParams();
  const selectedEfforts = efforts ? efforts.split(',') : [];

  const getSolutionContent = (effort: string) => {
    switch (effort) {
      case 'youtube':
        return {
          icon: <Youtube size={32} color="#000" />,
          title: "From YouTube to Real-Time Guidance",
          description: "Think of this like watching workout videos—helpful, but they don't correct your form in real-time.",
          solution: "Our AI analyzes your specific outfits and gives personalized feedback, like having a stylist right in your pocket.",
          image: "https://images.unsplash.com/photo-1592950630581-03cb41536d54?q=80&w=1000&auto=format&fit=crop"
        };
      case 'social':
        return {
          icon: <Instagram size={32} color="#000" />,
          title: "Beyond Instagram Inspiration",
          description: "It's like watching a chef cook without having a recipe adapted to your ingredients.",
          solution: "We translate trendy looks into practical outfits that work for your style, body type, and lifestyle.",
          image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=1000&auto=format&fit=crop"
        };
      case 'friends':
        return {
          icon: <Users size={32} color="#000" />,
          title: "Expert Advice, Not Just Friendly Opinions",
          description: "Friends are great cheerleaders but might not have deep style expertise.",
          solution: "Get detailed, constructive feedback that friends might hesitate to give, backed by fashion expertise.",
          image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1000&auto=format&fit=crop"
        };
      case 'shopping':
        return {
          icon: <ShoppingBag size={32} color="#000" />,
          title: "Smart Shopping, Better Outfits",
          description: "Buying clothes without a plan is like grocery shopping when hungry.",
          solution: "Learn to build cohesive outfits with what you have, making future purchases more intentional.",
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
        };
      case 'copying':
        return {
          icon: <Eye size={32} color="#000" />,
          title: "From Copying to Creating",
          description: "Not every trending outfit translates well to your personal style.",
          solution: "We help you understand why certain outfits work and how to adapt them to your unique style.",
          image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
        };
      case 'none':
        return {
          icon: <MapPin size={32} color="#000" />,
          title: "Your Style Journey Starts Here",
          description: "Everyone starts somewhere—you're already taking the right step.",
          solution: "We'll guide you step by step, making style improvement easy and enjoyable.",
          image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=1000&auto=format&fit=crop"
        };
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Style Evolution Plan</Text>
          <Text style={styles.subtitle}>
            Great news! You're already taking steps toward better style. Here's how we'll help you level up:
          </Text>
        </View>

        <View style={styles.solutionsContainer}>
          {selectedEfforts.map((effort, index) => {
            const content = getSolutionContent(effort);
            if (!content) return null;

            return (
              <View key={effort} style={styles.solutionCard}>
                <Image
                  source={{ uri: content.image }}
                  style={styles.solutionImage}
                />
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    {content.icon}
                  </View>
                  <Text style={styles.cardTitle}>{content.title}</Text>
                  <Text style={styles.cardDescription}>{content.description}</Text>
                  <View style={styles.solutionBox}>
                    <Text style={styles.solutionTitle}>How We Help:</Text>
                    <Text style={styles.solutionText}>{content.solution}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>What's Next?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Video size={24} color="#000" />
              <Text style={styles.featureText}>Upload your first outfit for instant AI analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Share2 size={24} color="#000" />
              <Text style={styles.featureText}>Get personalized style recommendations</Text>
            </View>
            <View style={styles.featureItem}>
              <BookOpen size={24} color="#000" />
              <Text style={styles.featureText}>Learn what works best for your body type</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/outfit-photo')}
        >
          <Text style={styles.buttonText}>Start Your Analysis</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  solutionsContainer: {
    padding: 20,
  },
  solutionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  solutionImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f8f8f8',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 24,
  },
  solutionBox: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
  },
  solutionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  solutionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  featuresTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#000',
    marginBottom: 20,
  },
  featuresList: {
    gap: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    gap: 12,
  },
  featureText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginRight: 8,
  },
});