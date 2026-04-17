import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const CATEGORY_COLORS = {
  movie:  { accent: '#f5c842', bg: 'rgba(245,200,66,0.15)',  glow: '#f5c84260', label: '🎬 Movie'  },
  event:  { accent: '#00e5c3', bg: 'rgba(0,229,195,0.15)',   glow: '#00e5c360', label: '🎭 Event'  },
  travel: { accent: '#a78bfa', bg: 'rgba(167,139,250,0.15)', glow: '#a78bfa60', label: '✈️ Travel' },
};

export default function MovieDetail({ route, navigation }) {
  const { movie } = route.params;
  const cat = CATEGORY_COLORS[movie.category] || CATEGORY_COLORS.movie;
  const insets = useSafeAreaInsets();
  const [booked, setBooked] = useState(false);
  const modalScale  = useRef(new Animated.Value(0.7)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  const handleBook = () => {
    setBooked(true);
    Animated.parallel([
      Animated.spring(modalScale,  { toValue: 1,   useNativeDriver: true, tension: 80 }),
      Animated.timing(modalOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  };

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(modalScale,   { toValue: 0.7, duration: 180, useNativeDriver: true }),
      Animated.timing(modalOpacity, { toValue: 0,   duration: 180, useNativeDriver: true }),
    ]).start(() => {
      setBooked(false);
      navigation.goBack();
    });
  };

  // Parallax / fade animations
  const scrollY    = useRef(new Animated.Value(0)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const heroScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.15, 1],
    extrapolate: 'clamp',
  });

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, height * 0.3],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const seats      = Number(movie.available_seats) || 0;
  const seatColor  = seats < 30 ? '#ff6b6b' : '#00e5c3';
  const seatLabel  = seats < 10 ? 'Almost Sold Out!' : seats < 30 ? 'Selling Fast' : 'Available';

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ── Hero Image with parallax ── */}
      <Animated.ScrollView
        bounces={true}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.heroContainer}>
          <Animated.Image
            source={{ uri: movie.poster }}
            style={[styles.heroImage, { transform: [{ scale: heroScale }], opacity: heroOpacity }]}
            resizeMode="cover"
          />
          {/* Multi-stop gradient overlay */}
          <View style={styles.heroGradientTop} />
          <View style={styles.heroGradientBottom} />

          {/* Category glow badge */}
          <View style={[styles.heroBadge, { backgroundColor: cat.bg, borderColor: cat.accent + '60' }]}>
            <Text style={[styles.heroBadgeText, { color: cat.accent }]}>{cat.label}</Text>
          </View>
        </View>

        {/* ── Stitched Content Card ── */}
        <Animated.View
          style={[
            styles.contentCard,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Drag handle */}
          <View style={styles.dragHandle} />

          {/* Title & Rating row */}
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
            <View style={[styles.ratingPill, { backgroundColor: cat.bg, borderColor: cat.accent + '50' }]}>
              <Text style={styles.ratingIcon}>★</Text>
              <Text style={[styles.ratingValue, { color: cat.accent }]}>
                {Number(movie.rating).toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Genre / Duration / Quality chips */}
          <View style={styles.chipRow}>
            {[movie.genre, movie.duration, 'HD', movie.category?.toUpperCase()].filter(Boolean).map((chip, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>{chip}</Text>
              </View>
            ))}
          </View>

          {/* Glowing divider */}
          <View style={[styles.glowDivider, { backgroundColor: cat.accent + '40' }]} />

          {/* About */}
          <Text style={styles.sectionLabel}>About</Text>
          <Text style={styles.description}>{movie.description || 'No description available.'}</Text>

          {/* Info Grid – glassmorphism cards */}
          <View style={styles.infoGrid}>
            <View style={[styles.infoCard, { borderColor: '#f5c84230' }]}>
              <Text style={styles.infoCardIcon}>📅</Text>
              <Text style={styles.infoCardLabel}>Release</Text>
              <Text style={styles.infoCardValue}>
                {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
              </Text>
            </View>

            <View style={[styles.infoCard, { borderColor: seatColor + '30' }]}>
              <Text style={styles.infoCardIcon}>🎟️</Text>
              <Text style={styles.infoCardLabel}>Seats</Text>
              <Text style={[styles.infoCardValue, { color: seatColor }]}>{seats}</Text>
              <Text style={[styles.infoCardSub, { color: seatColor }]}>{seatLabel}</Text>
            </View>

            <View style={[styles.infoCard, { borderColor: '#00e5c330' }]}>
              <Text style={styles.infoCardIcon}>💰</Text>
              <Text style={styles.infoCardLabel}>Price</Text>
              <Text style={[styles.infoCardValue, { color: '#00e5c3' }]}>${movie.price}</Text>
            </View>
          </View>

          {/* Bottom spacer for sticky CTA */}
          <View style={{ height: 110 }} />
        </Animated.View>
      </Animated.ScrollView>

      {/* ── Floating Back Button ── */}
      <TouchableOpacity
        style={[styles.backBtn, { top: insets.top + 12 }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.backBtnText}>←</Text>
      </TouchableOpacity>

      {/* ── Sticky Booking CTA ── */}
      <View style={[styles.stickyFooter, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.footerInner}>
          <View>
            <Text style={styles.footerLabel}>Total Price</Text>
            <Text style={styles.footerPrice}>${movie.price}</Text>
          </View>
          <TouchableOpacity
            style={[styles.bookBtn, { backgroundColor: cat.accent, shadowColor: cat.accent }]}
            activeOpacity={0.85}
            onPress={handleBook}
          >
            <Text style={[styles.bookBtnLabel, { color: '#0a0a0f' }]}>Book Now  →</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ── Success Modal ── */}
      <Modal transparent visible={booked} animationType="none" onRequestClose={handleDismiss}>
        <View style={styles.modalBackdrop}>
          <Animated.View style={[styles.modalCard, { transform: [{ scale: modalScale }], opacity: modalOpacity }]}>
            <View style={[styles.modalIconRing, { borderColor: cat.accent + '60', backgroundColor: cat.bg }]}>
              <Text style={styles.modalIcon}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Booking Confirmed!</Text>
            <Text style={styles.modalSub}>
              Your ticket for{' '}
              <Text style={{ color: cat.accent, fontWeight: '800' }}>{movie.title}</Text>
              {' '}has been booked successfully.
            </Text>
            <View style={styles.modalDivider} />
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Total Paid</Text>
              <Text style={[styles.modalValue, { color: cat.accent }]}>${movie.price}</Text>
            </View>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: cat.accent }]}
              onPress={handleDismiss}
              activeOpacity={0.85}
            >
              <Text style={[styles.modalBtnText, { color: '#0a0a0f' }]}>Done  🎉</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },

  /* Hero */
  heroContainer: {
    width,
    height: height * 0.56,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradientTop: {
    ...StyleSheet.absoluteFillObject,
    background: 'transparent',
    top: 0,
    height: 120,
    backgroundColor: 'rgba(10,10,15,0.55)',
  },
  heroGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: 'rgba(10,10,15,0.85)',
  },
  heroBadge: {
    position: 'absolute',
    bottom: 100,
    left: 24,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  /* Content card – stitched effect */
  contentCard: {
    backgroundColor: '#0e0e1a',
    marginTop: -50,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 16,
    minHeight: height * 0.6,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  dragHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'center',
    marginBottom: 24,
  },

  /* Title */
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    gap: 4,
    marginTop: 4,
  },
  ratingIcon: {
    color: '#f5c842',
    fontSize: 14,
  },
  ratingValue: {
    fontSize: 15,
    fontWeight: '900',
  },

  /* Chips */
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  chipText: {
    color: '#9090b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* Divider */
  glowDivider: {
    height: 1,
    marginBottom: 24,
    borderRadius: 1,
  },

  /* Description */
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#60607a',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 26,
    color: '#a0a0c0',
    marginBottom: 28,
  },

  /* Info Cards */
  infoGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  infoCardIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  infoCardLabel: {
    fontSize: 10,
    color: '#60607a',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },
  infoCardSub: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },

  /* Back Button */
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26,
  },

  /* Sticky Footer */
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10,10,15,0.97)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 14,
  },
  footerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  footerLabel: {
    color: '#60607a',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  footerPrice: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  bookBtn: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 22,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 12,
  },
  bookBtnLabel: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  /* Success Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#0e0e1a',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  modalIconRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalIcon: {
    fontSize: 36,
    color: '#00e5c3',
    fontWeight: '900',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 14,
    color: '#9090b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  modalLabel: {
    color: '#60607a',
    fontSize: 14,
    fontWeight: '600',
  },
  modalValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  modalBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },
  modalBtnText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
});
