import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react-native';

const questions = [
  {
    id: 'currentStyle',
    type: 'multiSelect',
    question: "How would you describe your style right now?",
    subtitle: "Select all that apply",
    options: [
      { 
        value: 'casual',
        label: 'Casual',
        description: 'T-shirts, jeans, sneakers—simple and comfortable',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'streetwear',
        label: 'Streetwear',
        description: 'Hoodies, cargo pants, statement sneakers',
        image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'smartCasual',
        label: 'Smart Casual',
        description: 'Blazers, chinos, loafers—polished but not too formal',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'minimalist',
        label: 'Minimalist',
        description: 'Neutral colors, clean fits, no extras',
        image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'trendy',
        label: 'Trendy',
        description: 'I like to keep up with what\'s in style',
        image: 'https://images.unsplash.com/photo-1550246140-29f40b909e5a?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'undefined',
        label: 'No Set Style',
        description: "I don't really have a set style",
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'confidence',
    type: 'single',
    question: "How confident are you in your outfits?",
    options: [
      { value: 'veryConfident', label: 'I always dress well' },
      { value: 'confident', label: 'I do okay, but I could improve' },
      { value: 'mixed', label: "Some days I feel good, some days I don't" },
      { value: 'needHelp', label: 'I need serious help with my style' }
    ]
  },
  {
    id: 'challenges',
    type: 'single',
    question: "What's your biggest challenge when it comes to fashion?",
    options: [
      { value: 'fitKnowledge', label: "I don't know what looks good on me" },
      { value: 'wardrobe', label: 'My closet is full, but I still feel like I have nothing to wear' },
      { value: 'matching', label: 'I struggle to match pieces together' },
      { value: 'shopping', label: "I don't know where to shop for good clothes" },
      { value: 'identity', label: "I don't have a signature style" },
      { value: 'upgrade', label: "I want to upgrade my look but don't know where to start" }
    ]
  },
  {
    id: 'goToOutfit',
    type: 'single',
    question: "What's your go-to outfit when you go out?",
    options: [
      { value: 'casual', label: 'T-shirt + jeans + sneakers' },
      { value: 'smart', label: 'Button-up + chinos + nice shoes' },
      { value: 'street', label: 'Graphic tee + cargo pants + stylish sneakers' },
      { value: 'formal', label: 'Blazer + tailored pants + dress shoes' },
      { value: 'whatever', label: 'Whatever is clean and comfortable' }
    ]
  },
  {
    id: 'improvements',
    type: 'multiSelect',
    question: "What do you want to improve about your style?",
    subtitle: "Select up to two",
    maxSelections: 2,
    options: [
      { value: 'polished', label: 'Look more put-together' },
      { value: 'confidence', label: 'Dress with more confidence' },
      { value: 'compliments', label: 'Get more compliments on my outfits' },
      { value: 'mature', label: 'Upgrade to a more mature style' },
      { value: 'personality', label: 'Find a look that fits my personality' }
    ]
  },
  {
    id: 'aiSuggestions',
    type: 'single',
    question: "Would you like AI-powered outfit suggestions and links to recommended clothing?",
    options: [
      { value: 'yes', label: 'Yes, that sounds great!' },
      { value: 'maybe', label: "Maybe, I'd like to see how it works first" },
      { value: 'no', label: 'No, I just want feedback on my outfits' }
    ]
  },
  {
    id: 'budget',
    type: 'single',
    question: "What's your preferred budget for new clothes?",
    subtitle: "So we can tailor recommendations to you",
    options: [
      { value: 'budget', label: 'Budget-friendly' },
      { value: 'midRange', label: 'Mid-range' },
      { value: 'highEnd', label: 'High-end' },
      { value: 'luxury', label: 'Luxury' }
    ]
  },
  {
    id: 'updates',
    type: 'single',
    question: "Would you like to receive seasonal trend updates and outfit ideas?",
    options: [
      { value: 'yes', label: "Yes, I'd love that!" },
      { value: 'no', label: 'No, I just want personal feedback' }
    ]
  },
  {
    id: 'pastEfforts',
    type: 'multiSelect',
    question: "Have you tried anything in the past to improve your style?",
    subtitle: "Select all that apply",
    options: [
      { value: 'youtube', label: 'Watching fashion YouTube videos' },
      { value: 'social', label: 'Following style influencers on Instagram/TikTok' },
      { value: 'friends', label: 'Asking friends for advice' },
      { value: 'shopping', label: 'Shopping for new clothes (but still not happy)' },
      { value: 'copying', label: 'Trying to copy outfits I like' },
      { value: 'none', label: "Haven't really done much yet" }
    ]
  }
];

export default function StyleQuizScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentStep];
  const isMultiSelect = currentQuestion.type === 'multiSelect';
  const selectedAnswers = answers[currentQuestion.id] || (isMultiSelect ? [] : '');
  
  const handleSelect = (value) => {
    if (isMultiSelect) {
      const currentAnswers = [...(answers[currentQuestion.id] || [])];
      const index = currentAnswers.indexOf(value);
      
      if (index === -1) {
        if (!currentQuestion.maxSelections || currentAnswers.length < currentQuestion.maxSelections) {
          currentAnswers.push(value);
        }
      } else {
        currentAnswers.splice(index, 1);
      }
      
      setAnswers({
        ...answers,
        [currentQuestion.id]: currentAnswers
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: value
      });
    }
  };

  const isOptionSelected = (value) => {
    if (isMultiSelect) {
      return (answers[currentQuestion.id] || []).includes(value);
    }
    return answers[currentQuestion.id] === value;
  };

  const canProceed = () => {
    const currentAnswers = answers[currentQuestion.id];
    if (isMultiSelect) {
      return currentAnswers && currentAnswers.length > 0;
    }
    return !!currentAnswers;
  };

  const handleNext = () => {
    // If we're on the last question (pastEfforts), go to solutions page
    if (currentStep === questions.length - 1) {
      router.push({
        pathname: '/solution',
        params: { efforts: answers['pastEfforts'].join(',') }
      });
      return;
    }
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Style Quiz</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentStep + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          Question {currentStep + 1} of {questions.length}
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.subtitle && (
          <Text style={styles.subtitle}>{currentQuestion.subtitle}</Text>
        )}
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                isOptionSelected(option.value) && styles.selectedOption
              ]}
              onPress={() => handleSelect(option.value)}
            >
              {option.image && (
                <Image
                  source={{ uri: option.image }}
                  style={styles.optionImage}
                />
              )}
              <View style={styles.optionContent}>
                <Text style={styles.optionLabel}>{option.label}</Text>
                {option.description && (
                  <Text style={styles.optionDescription}>{option.description}</Text>
                )}
              </View>
              {isOptionSelected(option.value) && (
                <View style={styles.checkIcon}>
                  <Check size={16} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.disabledButton]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === questions.length - 1 ? 'See Your Results' : 'Next'}
          </Text>
          <ArrowRight size={20} color="#fff" />
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
    color: '#333',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3CAEA3',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  optionImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  selectedOption: {
    borderColor: '#3CAEA3',
    backgroundColor: '#f0f9f8',
  },
  optionContent: {
    flex: 1,
    padding: 16,
  },
  optionLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3CAEA3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#3CAEA3',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});