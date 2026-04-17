import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ScannerScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ticket Scanner</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.cameraPreview}>
        {/* Mock Camera View */}
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer} />
          <View style={styles.middleRow}>
            <View style={styles.unfocusedContainer} />
            <View style={styles.focusedContainer}>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
              <View style={styles.scanningLine} />
            </View>
            <View style={styles.unfocusedContainer} />
          </View>
          <View style={styles.unfocusedContainer} />
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Align the ticket QR code within the frame to scan automatically.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.flashBtn}>
          <Text style={styles.flashIcon}>🔦</Text>
          <Text style={styles.flashText}>Flash Off</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.historyBtn}>
          <Text style={styles.historyIcon}>📋</Text>
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
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
    backgroundColor: '#16162a',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  overlay: {
    flex: 1,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  middleRow: {
    flexDirection: 'row',
    height: width * 0.65,
  },
  focusedContainer: {
    width: width * 0.65,
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#00e5c3',
    borderTopLeftRadius: 15,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#00e5c3',
    borderTopRightRadius: 15,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#00e5c3',
    borderBottomLeftRadius: 15,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#00e5c3',
    borderBottomRightRadius: 15,
  },
  scanningLine: {
    position: 'absolute',
    left: '10%',
    width: '80%',
    height: 2,
    backgroundColor: 'rgba(0, 229, 195, 0.5)',
    top: '50%',
    shadowColor: '#00e5c3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructionText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 30,
  },
  flashBtn: {
    alignItems: 'center',
  },
  flashIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  flashText: {
    color: '#7878a0',
    fontSize: 12,
    fontWeight: '600',
  },
  historyBtn: {
    alignItems: 'center',
  },
  historyIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  historyText: {
    color: '#7878a0',
    fontSize: 12,
    fontWeight: '600',
  },
});
