import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

const questions = [
  {
    id: 'age',
    type: 'date',
    question: "When were you born?",
    subtitle: "This will be used to calibrate your custom plan.",
    fields: {
      month: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      day: Array.from({length: 31}, (_, i) => (i + 1).toString()),
      year: Array.from({length: 100}, (_, i) => (2024 - i).toString())
    }
  },
  {
    id: 'measurements',
    type: 'measurements',
    question: "Height & weight",
    subtitle: "This will be used to calibrate your custom plan.",
    fields: {
      heightFt: Array.from({length: 8}, (_, i) => (i + 2).toString()),
      heightIn: Array.from({length: 12}, (_, i) => i.toString()),
      weight: Array.from({length: 250}, (_, i) => (i + 80).toString()),
      units: ['Imperial', 'Metric']
    }
  },
  {
    id: 'currentStyle',
    type: 'multiSelect',
    question: "How would you describe your style right now? 👔",
    subtitle: "Select all that apply",
    options: [
      { 
        value: 'casual',
        label: '😊 Casual',
        description: 'T-shirts, jeans, sneakers—simple and comfortable',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'streetwear',
        label: '🔥 Streetwear',
        description: 'Hoodies, cargo pants, statement sneakers',
        image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'smartCasual',
        label: '✨ Smart Casual',
        description: 'Blazers, chinos, loafers—polished but not too formal',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'minimalist',
        label: '🎯 Minimalist',
        description: 'Neutral colors, clean fits, no extras',
        image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'trendy',
        label: '🌟 Trendy',
        description: 'I like to keep up with what\'s in style',
        image: 'https://images.unsplash.com/photo-1550246140-29f40b909e5a?q=80&w=1000&auto=format&fit=crop'
      },
      {
        value: 'undefined',
        label: '🤔 No Set Style',
        description: "I don't really have a set style",
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'confidence',
    type: 'single',
    question: "How confident are you in your outfits? 💪",
    options: [
      { value: 'veryConfident', label: '🌟 I always dress well' },
      { value: 'confident', label: '😊 I do okay, but I could improve' },
      { value: 'mixed', label: "😕 Some days I feel good, some days I don't" },
      { value: 'needHelp', label: '🆘 I need serious help with my style' }
    ]
  },
  {
    id: 'challenges',
    type: 'single',
    question: "What's your biggest challenge when it comes to fashion? 🤔",
    options: [
      { value: 'fitKnowledge', label: "👕 I don't know what looks good on me" },
      { value: 'wardrobe', label: '🧥 My closet is full, but I still feel like I have nothing to wear' },
      { value: 'matching', label: '🎨 I struggle to match pieces together' },
      { value: 'shopping', label: "🛍️ I don't know where to shop for good clothes" },
      { value: 'identity', label: "🎯 I don't have a signature style" },
      { value: 'upgrade', label: "⭐ I want to upgrade my look but don't know where to start" }
    ]
  },
  {
    id: 'goToOutfit',
    type: 'single',
    question: "What's your go-to outfit when you go out? 👔",
    options: [
      { value: 'casual', label: '👕 T-shirt + jeans + sneakers' },
      { value: 'smart', label: '👔 Button-up + chinos + nice shoes' },
      { value: 'street', label: '🎨 Graphic tee + cargo pants + stylish sneakers' },
      { value: 'formal', label: '🎩 Blazer + tailored pants + dress shoes' },
      { value: 'whatever', label: '🤷‍♂️ Whatever is clean and comfortable' }
    ]
  },
  {
    id: 'improvements',
    type: 'multiSelect',
    question: "What do you want to improve about your style? ✨",
    subtitle: "Select up to two",
    maxSelections: 2,
    options: [
      { value: 'polished', label: '✨ Look more put-together' },
      { value: 'confidence', label: '💪 Dress with more confidence' },
      { value: 'compliments', label: '🌟 Get more compliments on my outfits' },
      { value: 'mature', label: '👔 Upgrade to a more mature style' },
      { value: 'personality', label: '🎯 Find a look that fits my personality' }
    ]
  },
  {
    id: 'budget',
    type: 'single',
    question: "What's your preferred budget for new clothes? 💰",
    subtitle: "This helps us tailor recommendations to your price range",
    options: [
      { value: 'budget', label: '💰 Budget-friendly ($)' },
      { value: 'midRange', label: '💰💰 Mid-range ($$)' },
      { value: 'highEnd', label: '💰💰💰 High-end ($$$)' },
      { value: 'luxury', label: '💰💰💰💰 Luxury ($$$$)' }
    ]
  },
  {
    id: 'shopping',
    type: 'multiSelect',
    question: "Where do you usually shop for clothes? 🛍️",
    subtitle: "Select all that apply",
    options: [
      { value: 'fastFashion', label: '🏪 Fast fashion (H&M, Zara, Uniqlo)' },
      { value: 'department', label: '🏬 Department stores' },
      { value: 'boutique', label: '👔 Boutique shops' },
      { value: 'online', label: '💻 Online retailers' },
      { value: 'vintage', label: '🕰️ Thrift/vintage stores' }
    ]
  },
  {
    id: 'lifestyle',
    type: 'single',
    question: "What's your primary lifestyle need? 🎯",
    options: [
      { value: 'work', label: '💼 Professional work attire' },
      { value: 'casual', label: '👕 Everyday casual wear' },
      { value: 'social', label: '🎉 Social events and going out' },
      { value: 'active', label: '🏃‍♂️ Active and athleisure' }
    ]
  },
  {
    id: 'inspiration',
    type: 'multiSelect',
    question: "Where do you get style inspiration? 💫",
    subtitle: "Select all that apply",
    options: [
      { value: 'social', label: '📱 Social media' },
      { value: 'celebrities', label: '🌟 Celebrities and influencers' },
      { value: 'magazines', label: '📖 Fashion magazines' },
      { value: 'street', label: '🌆 Street style' },
      { value: 'none', label: "🤔 I don't really look for inspiration" }
    ]
  },
  {
    id: 'pastEfforts',
    type: 'multiSelect',
    question: "Have you tried anything in the past to improve your style? 📚",
    subtitle: "Select all that apply",
    options: [
      { value: 'youtube', label: '🎥 Watching fashion YouTube videos' },
      { value: 'social', label: '📱 Following style influencers' },
      { value: 'friends', label: '👥 Asking friends for advice' },
      { value: 'shopping', label: '🛍️ Shopping for new clothes' },
      { value: 'copying', label: '📸 Trying to copy outfits I like' },
      { value: 'none', label: "🆕 Haven't really done much yet" }
    ]
  }
];

export default function StyleQuizScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [useMetric, setUseMetric] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleDateChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        [field]: value
      }
    }));
  };

  const handleMeasurementChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        [field]: value
      }
    }));
  };

  const handleSelect = (value) => {
    if (currentQuestion.type === 'multiSelect') {
      setAnswers(prev => {
        const currentAnswers = Array.isArray(prev[currentQuestion.id]) 
          ? [...prev[currentQuestion.id]] 
          : [];
        
        const index = currentAnswers.indexOf(value);
        
        if (index === -1) {
          if (!currentQuestion.maxSelections || currentAnswers.length < currentQuestion.maxSelections) {
            currentAnswers.push(value);
          }
        } else {
          currentAnswers.splice(index, 1);
        }
        
        return {
          ...prev,
          [currentQuestion.id]: currentAnswers
        };
      });
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: value
      }));
    }
  };

  const isOptionSelected = (value) => {
    const currentAnswers = answers[currentQuestion.id];
    if (currentQuestion.type === 'multiSelect') {
      return Array.isArray(currentAnswers) && currentAnswers.includes(value);
    }
    return currentAnswers === value;
  };

  const renderDatePicker = () => {
    const dateAnswers = answers[currentQuestion.id] || {};
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dateAnswers.month || 'January'}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(value) => handleDateChange('month', value)}
        >
          {currentQuestion.fields.month.map((month) => (
            <Picker.Item key={month} label={month} value={month} color="#000" />
          ))}
        </Picker>

        <Picker
          selectedValue={dateAnswers.day || '1'}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(value) => handleDateChange('day', value)}
        >
          {currentQuestion.fields.day.map((day) => (
            <Picker.Item key={day} label={day} value={day} color="#000" />
          ))}
        </Picker>

        <Picker
          selectedValue={dateAnswers.year || '2000'}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(value) => handleDateChange('year', value)}
        >
          {currentQuestion.fields.year.map((year) => (
            <Picker.Item key={year} label={year} value={year} color="#000" />
          ))}
        </Picker>
      </View>
    );
  };

  const renderMeasurementsPicker = () => {
    const measurementAnswers = answers[currentQuestion.id] || {};
    return (
      <View style={styles.measurementsContainer}>
        <View style={styles.unitsToggle}>
          <Text style={styles.unitText}>Imperial</Text>
          <Switch
            value={useMetric}
            onValueChange={setUseMetric}
            trackColor={{ false: '#f0f0f0', true: '#000' }}
            thumbColor="#fff"
          />
          <Text style={[styles.unitText, useMetric && styles.activeUnitText]}>Metric</Text>
        </View>

        {!useMetric ? (
          <View style={styles.imperialContainer}>
            <View style={styles.heightContainer}>
              <Text style={styles.measurementLabel}>Height</Text>
              <View style={styles.heightPickers}>
                <Picker
                  selectedValue={measurementAnswers.heightFt || '5'}
                  style={[styles.picker, styles.heightPicker]}
                  itemStyle={styles.pickerItem}
                  onValueChange={(value) => handleMeasurementChange('heightFt', value)}
                >
                  {currentQuestion.fields.heightFt.map((ft) => (
                    <Picker.Item key={ft} label={`${ft} ft`} value={ft} color="#000" />
                  ))}
                </Picker>

                <Picker
                  selectedValue={measurementAnswers.heightIn || '6'}
                  style={[styles.picker, styles.heightPicker]}
                  itemStyle={styles.pickerItem}
                  onValueChange={(value) => handleMeasurementChange('heightIn', value)}
                >
                  {currentQuestion.fields.heightIn.map((inch) => (
                    <Picker.Item key={inch} label={`${inch} in`} value={inch} color="#000" />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.weightContainer}>
              <Text style={styles.measurementLabel}>Weight</Text>
              <Picker
                selectedValue={measurementAnswers.weight || '150'}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(value) => handleMeasurementChange('weight', value)}
              >
                {currentQuestion.fields.weight.map((weight) => (
                  <Picker.Item key={weight} label={`${weight} lb`} value={weight} color="#000" />
                ))}
              </Picker>
            </View>
          </View>
        ) : (
          <View style={styles.metricContainer}>
            {/* Implement metric measurement pickers */}
          </View>
        )}
      </View>
    );
  };

  const renderStyleOptions = () => {
    return (
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
    );
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'date':
        return renderDatePicker();
      case 'measurements':
        return renderMeasurementsPicker();
      case 'single':
      case 'multiSelect':
        return renderStyleOptions();
      default:
        return null;
    }
  };

  const canProceed = () => {
    const currentAnswers = answers[currentQuestion.id];
    if (!currentAnswers) return false;

    switch (currentQuestion.type) {
      case 'date':
        return currentAnswers.month && currentAnswers.day && currentAnswers.year;
      case 'measurements':
        return !useMetric ? (
          currentAnswers.heightFt && currentAnswers.heightIn && currentAnswers.weight
        ) : (
          currentAnswers.heightCm && currentAnswers.weightKg
        );
      case 'multiSelect':
        return currentAnswers.length > 0;
      case 'single':
        return !!currentAnswers;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === questions.length - 1) {
      router.push({
        pathname: '/solution',
        params: { efforts: answers['pastEfforts']?.join(',') }
      });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
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
        
        {renderQuestion()}
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
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 8,
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
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 200,
    marginHorizontal: 5,
  },
  pickerItem: {
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
    color: '#000',
  },
  measurementsContainer: {
    marginBottom: 20,
  },
  unitsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  unitText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#666',
    marginHorizontal: 10,
  },
  activeUnitText: {
    color: '#000',
  },
  imperialContainer: {
    gap: 20,
  },
  metricContainer: {
    gap: 20,
  },
  heightContainer: {
    gap: 10,
  },
  weightContainer: {
    gap: 10,
  },
  measurementLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
  },
  heightPickers: {
    flexDirection: 'row',
    gap: 10,
  },
  heightPicker: {
    flex: 1,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
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
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  optionContent: {
    flex: 1,
    padding: 16,
  },
  optionLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
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
    backgroundColor: '#000',
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
    backgroundColor: '#000',
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