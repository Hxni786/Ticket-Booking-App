import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✦' },
  { id: 'movie', label: 'Movies', icon: '🎬' },
  { id: 'event', label: 'Events', icon: '🎭' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
];

export default function Navbar({ navigation, searchQuery, setSearchQuery, activeCategory, setActiveCategory }) {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.logo}>
          <Text style={styles.logoIcon}>🎟️</Text>
          <Text style={styles.logoText}>TicketVerse</Text>
        </View>
        <View style={styles.navActions}>
          <TouchableOpacity 
            style={styles.actionBtn} 
            onPress={() => navigation.navigate('Scanner')}
          >
            <Text style={styles.actionIcon}>📸</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies, events, travel..."
          placeholderTextColor="#7878a0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={() => setSearchQuery('')}>
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catBtn, isActive && styles.catBtnActive]}
                onPress={() => setActiveCategory(cat.id)}
              >
                <Text style={styles.catIcon}>{cat.icon}</Text>
                <Text style={[styles.catText, isActive && styles.catTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(10,10,15,0.95)',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16162a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 18,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f5c842', 
  },
  searchWrapper: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
    fontSize: 16,
    color: '#7878a0',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#16162a',
    borderColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 12,
    paddingLeft: 42,
    paddingRight: 42,
    color: '#e8e8f0',
    fontSize: 15,
  },
  clearBtn: {
    position: 'absolute',
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1e1e35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    color: '#7878a0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categories: {
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: 'row',
  },
  catBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#16162a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginRight: 8,
  },
  catBtnActive: {
    backgroundColor: '#f5c842',
  },
  catIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  catText: {
    color: '#7878a0',
    fontSize: 14,
    fontWeight: '500',
  },
  catTextActive: {
    color: '#0a0a0f',
    fontWeight: '600',
  },
});
