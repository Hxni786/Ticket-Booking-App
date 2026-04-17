import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CardScannerScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Card Scanner</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.cameraPreview}>
        {/* Mock Camera View for Card */}
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer} />
          <View style={styles.middleRow}>
            <View style={styles.sideUnfocused} />
            <View style={styles.focusedContainer}>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
              
              <View style={styles.cardIndicator} />
            </View>
            <View style={styles.sideUnfocused} />
          </View>
          <View style={styles.unfocusedContainer} />
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Position your card within the golden frame.{'\n'}
            Scanning will begin automatically.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>✨ Ensure good lighting for better accuracy</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#1c1c36',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(245, 200, 66, 0.2)',
  },
  overlay: {
    flex: 1,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    height: width * 0.5,
  },
  sideUnfocused: {
    width: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  focusedContainer: {
    flex: 1,
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#f5c842',
    borderTopLeftRadius: 10,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#f5c842',
    borderTopRightRadius: 10,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#f5c842',
    borderBottomLeftRadius: 10,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#f5c842',
    borderBottomRightRadius: 10,
  },
  cardIndicator: {
    flex: 1,
    backgroundColor: 'rgba(245, 200, 66, 0.03)',
    borderRadius: 8,
    margin: 4,
  },
  instructions: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    opacity: 0.9,
  },
  footer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  tipContainer: {
    backgroundColor: 'rgba(245, 200, 66, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(245, 200, 66, 0.2)',
  },
  tipText: {
    color: '#f5c842',
    fontSize: 13,
    fontWeight: '600',
  },
});
