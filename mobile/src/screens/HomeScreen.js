import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { ticketAPI } from '../services/api';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ticketAPI.getAll();
        setAllItems(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let items = [...allItems];
    if (activeCategory !== 'all') {
      items = items.filter(i => i.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.title?.toLowerCase().includes(q) ||
        i.genre?.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q)
      );
    }
    return items;
  }, [allItems, activeCategory, searchQuery]);

  const categoryLabel = activeCategory === 'all' ? 'All Tickets'
    : activeCategory === 'movie' ? 'Movies'
    : activeCategory === 'event' ? 'Events'
    : 'Travel';

  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <View style={styles.heroSection}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>✦ Discover & Book</Text>
        </View>
        <Text style={styles.heroTitle}>
          Your Next{'\n'}
          <Text style={styles.heroAccent}>Experience</Text>{'\n'}
          Awaits
        </Text>
        <Text style={styles.heroSub}>
          Movies, live events, and travel — all in one place. Find what moves you.
        </Text>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.toolbarLeft}>
          <Text style={styles.sectionTitle}>{categoryLabel}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{filtered.length} results</Text>
          </View>
        </View>
      </View>
      {searchQuery.length > 0 && (
        <Text style={styles.searchStatus}>
          {filtered.length > 0 ? `Showing results for "${searchQuery}"` : `No results found for "${searchQuery}"`}
        </Text>
      )}
    </View>
  );

  const ListEmptyComponent = () => (
    !loading ? (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🎭</Text>
        <Text style={styles.emptyTitle}>Nothing found</Text>
        <Text style={styles.emptyText}>Sorry, no results match your criteria.</Text>
      </View>
    ) : null
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#00e5c3" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 10,
    paddingBottom: 60,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  headerContainer: {
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  heroSection: {
    paddingVertical: 20,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,229,195,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,229,195,0.2)',
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#00e5c3',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 48,
    marginBottom: 16,
  },
  heroAccent: {
    color: '#f5c842', 
  },
  heroSub: {
    color: '#b0b0c8',
    fontSize: 16,
    lineHeight: 24,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#e8e8f0',
    marginRight: 10,
  },
  countBadge: {
    backgroundColor: '#16162a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  countText: {
    color: '#7878a0',
    fontSize: 12,
  },
  searchStatus: {
    color: '#7878a0',
    fontSize: 14,
    marginBottom: 16,
  },
  empty: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e8e8f0',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#7878a0',
  },
});
