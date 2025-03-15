import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

interface RatingStarsProps {
  rating: number;
  size?: number;
  color?: string;
  maxStars?: number;
}

export default function RatingStars({ 
  rating, 
  size = 20, 
  color = '#000', 
  maxStars = 5 
}: RatingStarsProps) {
  // Convert 10-point scale to 5-star scale if needed
  const normalizedRating = maxStars === 5 && rating > 5 ? rating / 2 : rating;
  
  return (
    <View style={styles.container}>
      {[...Array(maxStars)].map((_, i) => {
        const starFill = Math.min(Math.max(normalizedRating - i, 0), 1);
        
        return (
          <View key={i} style={styles.starContainer}>
            {/* Empty star (background) */}
            <Star 
              size={size} 
              color={color} 
              fill="transparent" 
              style={styles.emptyStar} 
            />
            
            {/* Filled star (overlay with clip) */}
            <View style={[styles.filledStarContainer, { width: `${starFill * 100}%` }]}>
              <Star 
                size={size} 
                color={color} 
                fill={color} 
                style={styles.filledStar} 
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starContainer: {
    position: 'relative',
    marginRight: 2,
  },
  emptyStar: {
    position: 'absolute',
  },
  filledStarContainer: {
    overflow: 'hidden',
    position: 'absolute',
  },
  filledStar: {
    position: 'absolute',
  },
});