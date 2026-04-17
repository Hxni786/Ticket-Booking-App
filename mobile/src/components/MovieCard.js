import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 40 - (CARD_MARGIN * 2)) / 2;

const CATEGORY_COLORS = {
  movie: { accent: '#f5c842', bg: 'rgba(245,200,66,0.15)', label: 'Movie' },
  event: { accent: '#00e5c3', bg: 'rgba(0,229,195,0.15)', label: 'Event' },
  travel: { accent: '#a78bfa', bg: 'rgba(167,139,250,0.15)', label: 'Travel' },
};

function StarRating({ rating }) {
  return (
    <View style={styles.starsContainer}>
      <Text style={styles.starText}>★</Text>
      <Text style={styles.ratingText}>{rating?.toFixed(1)}</Text>
    </View>
  );
}

export default function MovieCard({ item }) {
  const navigation = useNavigation();
  const cat = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.movie;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const formattedDate = item.release_date
    ? new Date(item.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : 'TBA';

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <View style={styles.card}>
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.imageWrap}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate('Details', { movie: item })}
        >
          <Image source={{ uri: item.poster }} style={styles.poster} />
          <View style={styles.overlay} />
          
          <View style={[styles.badge, { backgroundColor: cat.bg }]}>
            <Text style={[styles.badgeText, { color: cat.accent }]}>{cat.label}</Text>
          </View>

          <View style={styles.topRight}>
            <StarRating rating={parseFloat(item.rating)} />
          </View>

          <View style={styles.infoOverlay}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.genre}</Text>
              <Text style={styles.metaDivider}>•</Text>
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.9} 
          style={styles.footer}
          onPress={() => navigation.navigate('Details', { movie: item })}
        >
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={[styles.priceAmount, { color: cat.accent }]}>${parseFloat(item.price).toFixed(0)}</Text>
          </View>
          
          <View style={styles.seatsContainer}>
            <View style={styles.seatsBar}>
              <View 
                style={[
                  styles.seatsProgress, 
                  { 
                    width: `${Math.min((item.available_seats / 200) * 100, 100)}%`, 
                    backgroundColor: item.available_seats < 30 ? '#ff6b6b' : cat.accent 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.seatsText, { color: item.available_seats < 30 ? '#ff6b6b' : '#7878a0' }]}>
              {item.available_seats} seats
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16162a',
    borderRadius: 20,
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  imageWrap: {
    height: CARD_WIDTH * 1.4,
    width: '100%',
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,15,0.4)',
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingTop: 30,
    backgroundColor: 'rgba(10,10,15,0.7)',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  topRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(10,10,15,0.6)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    color: '#f5c842',
    fontSize: 10,
    marginRight: 2,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 18,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: '#b0b0c8',
    fontSize: 10,
    fontWeight: '500',
  },
  metaDivider: {
    color: '#7878a0',
    fontSize: 10,
    marginHorizontal: 4,
  },
  footer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    color: '#7878a0',
    fontSize: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  priceAmount: {
    fontSize: 16,
    fontWeight: '900',
  },
  seatsContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  seatsBar: {
    width: 40,
    height: 3,
    backgroundColor: '#0a0a0f',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 4,
  },
  seatsProgress: {
    height: '100%',
  },
  seatsText: {
    fontSize: 9,
    fontWeight: '700',
  },
});
