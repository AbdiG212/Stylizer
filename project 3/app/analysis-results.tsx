import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Sparkles, TriangleAlert as AlertTriangle, ShoppingBag, Palette } from 'lucide-react-native';
import RatingStars from '../components/RatingStars';

export default function AnalysisResultsScreen() {
  const router = useRouter();

  // This would come from your API response
  const analysisData = {
    rating: 6,
    reasoning: {
      fit_and_proportions: "The jacket fits well, providing a casual look, but the jeans appear slightly loose in the lower leg area, which may disrupt the overall silhouette.",
      color_coordination: "The color palette is somewhat harmonious with earthy tones from the jacket and the green sweater, but the blue jeans create a somewhat jarring contrast.",
      style_cohesion: "While the outfit conveys a casual vibe, the mix of military-style jacket with sporty shoes and a sweater creates a disjointed style.",
      accessories_and_layering: "The use of a cap adds a youthful element, but the watch is not very visible and feels out of place with this outfit."
    },
    replacements: [
      {
        replace: "Blue jeans",
        with: "Male tapered-fit black jeans for a sleeker look.",
        links: [
          {
            item: "Male tapered-fit black jeans for a sleeker look.",
            link: "https://www.uniqlo.com/us/en/products/E455476-000/00",
            image: "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/455476/item/usgoods_68_455476_3x4.jpg",
            source: "uniqlo.com"
          }
        ]
      }
    ],
    complementary_items: [
      {
        item: "Male grey hoodie",
        reason: "Layering a grey hoodie under the jacket would add depth and comfort while matching the casual tone.",
        links: [
          {
            item: "Male grey hoodie",
            link: "https://www.farfetch.com/shopping/men/hoodies-2/items.aspx",
            image: "https://cdn-images.farfetch-contents.com/23/85/45/32/23854532_53944960_300.jpg",
            source: "farfetch.com"
          }
        ]
      },
      {
        item: "Male olive green sneakers",
        reason: "Switching to olive green sneakers would create a cohesive color scheme and enhance the overall style.",
        links: [
          {
            item: "Male olive green sneakers",
            link: "https://www.farfetch.com/shopping/men/adidas-x-pharrell-samba-humanrace-orbit-green-sneakers-item-22234342.aspx",
            image: "https://cdn-images.farfetch-contents.com/22/23/43/42/22234342_52098197_1000.jpg",
            source: "farfetch.com"
          }
        ]
      }
    ]
  };

  const handleShopItem = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Style Analysis</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop' }}
            style={styles.outfitImage}
          />
          <View style={styles.overallScore}>
            <Text style={styles.scoreLabel}>OVERALL SCORE</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{analysisData.rating}</Text>
              <Text style={styles.scoreMax}>/10</Text>
            </View>
            <RatingStars rating={analysisData.rating} size={24} />
          </View>
        </View>

        {/* Detailed Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Analysis</Text>
          
          <View style={styles.analysisCard}>
            <View style={styles.analysisItem}>
              <Text style={styles.analysisLabel}>Fit & Proportions</Text>
              <Text style={styles.analysisText}>{analysisData.reasoning.fit_and_proportions}</Text>
            </View>
            
            <View style={styles.analysisItem}>
              <Text style={styles.analysisLabel}>Color Coordination</Text>
              <Text style={styles.analysisText}>{analysisData.reasoning.color_coordination}</Text>
            </View>
            
            <View style={styles.analysisItem}>
              <Text style={styles.analysisLabel}>Style Cohesion</Text>
              <Text style={styles.analysisText}>{analysisData.reasoning.style_cohesion}</Text>
            </View>
            
            <View style={styles.analysisItem}>
              <Text style={styles.analysisLabel}>Accessories & Layering</Text>
              <Text style={styles.analysisText}>{analysisData.reasoning.accessories_and_layering}</Text>
            </View>
          </View>
        </View>

        {/* Suggested Replacements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={20} color="#000" />
            <Text style={styles.sectionTitle}>Suggested Replacements</Text>
          </View>
          
          {analysisData.replacements.map((replacement, index) => (
            <View key={index} style={styles.replacementCard}>
              <Text style={styles.replacementText}>
                Replace: <Text style={styles.highlightText}>{replacement.replace}</Text>
              </Text>
              <Text style={styles.replacementText}>
                With: <Text style={styles.highlightText}>{replacement.with}</Text>
              </Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
                {replacement.links.map((link, linkIndex) => (
                  <TouchableOpacity 
                    key={linkIndex}
                    style={styles.productCard}
                    onPress={() => handleShopItem(link.link)}
                  >
                    <Image source={{ uri: link.image }} style={styles.productImage} />
                    <View style={styles.productContent}>
                      <Text style={styles.productSource}>{link.source}</Text>
                      <View style={styles.shopButton}>
                        <ShoppingBag size={16} color="#000" />
                        <Text style={styles.shopButtonText}>Shop</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>

        {/* Complementary Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={20} color="#000" />
            <Text style={styles.sectionTitle}>Complete Your Look</Text>
          </View>
          
          {analysisData.complementary_items.map((item, index) => (
            <View key={index} style={styles.complementaryCard}>
              <Text style={styles.complementaryTitle}>{item.item}</Text>
              <Text style={styles.complementaryReason}>{item.reason}</Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
                {item.links.map((link, linkIndex) => (
                  <TouchableOpacity 
                    key={linkIndex}
                    style={styles.productCard}
                    onPress={() => handleShopItem(link.link)}
                  >
                    <Image source={{ uri: link.image }} style={styles.productImage} />
                    <View style={styles.productContent}>
                      <Text style={styles.productSource}>{link.source}</Text>
                      <View style={styles.shopButton}>
                        <ShoppingBag size={16} color="#000" />
                        <Text style={styles.shopButtonText}>Shop</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  outfitImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  overallScore: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    alignItems: 'center',
  },
  scoreLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#666',
    letterSpacing: 1,
    marginBottom: 5,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  score: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: '#000',
  },
  scoreMax: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#666',
    marginLeft: 2,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#000',
  },
  analysisCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    gap: 15,
  },
  analysisItem: {
    gap: 5,
  },
  analysisLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
  },
  analysisText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  replacementCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  replacementText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  highlightText: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  complementaryCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  complementaryTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  complementaryReason: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  productsScroll: {
    marginHorizontal: -15,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  productCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  productContent: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productSource: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  shopButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#000',
  },
});