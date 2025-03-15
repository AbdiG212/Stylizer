import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function AnalysisScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          router.push('/paywall');
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" style={styles.spinner} />
      
      <Text style={styles.title}>Analyzing Your Style</Text>
      <Text style={styles.subtitle}>Please wait while our AI analyzes your preferences</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
      
      <View style={styles.stepsContainer}>
        <Text style={[styles.step, progress > 25 && styles.completedStep]}>
          Analyzing style preferences...
        </Text>
        <Text style={[styles.step, progress > 50 && styles.completedStep]}>
          Generating personalized recommendations...
        </Text>
        <Text style={[styles.step, progress > 75 && styles.completedStep]}>
          Creating your style profile...
        </Text>
        <Text style={[styles.step, progress > 90 && styles.completedStep]}>
          Preparing your results...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  spinner: {
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  stepsContainer: {
    width: '100%',
  },
  step: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
    opacity: 0.5,
  },
  completedStep: {
    color: '#000',
    opacity: 1,
  },
});