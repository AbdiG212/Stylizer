import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera } from 'lucide-react-native';

export default function AnalyzeScreen() {
  const router = useRouter();

  const startAnalysis = () => {
    router.push('/outfit-photo');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Outfit Analysis</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.cameraIconContainer}>
          <Camera size={80} color="#000" strokeWidth={1.5} />
        </View>
        
        <Text style={styles.heading}>Get Expert Feedback</Text>
        <Text style={styles.description}>
          Take a photo of your outfit and our AI stylist will analyze it, providing personalized recommendations to elevate your style.
        </Text>
        
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Take a photo of your outfit</Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Get detailed analysis and recommendations</Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Shop recommended items and save favorites</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={startAnalysis}>
          <Text style={styles.buttonText}>Start Analysis</Text>
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
  stepText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});