import React, { useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import phrases from '../data/phrases.json';

type Phrase = {
  en: string;
  es: string;
};

export default function ExpressionTrainer() {
  const [currentPair, setCurrentPair] = useState<Phrase | null>(null);
  const [currentMode, setCurrentMode] = useState<"enToEs" | "esToEn" | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const getRandomPhrase = () => {
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPair(random);
    setShowAnswer(false);
  };

  const handleEnToEs = () => {
    setCurrentMode('enToEs');
    getRandomPhrase();
  };

  const handleEsToEn = () => {
    setCurrentMode('esToEn');
    getRandomPhrase();
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎯 Entrenador de Expresiones</Text>

      <View style={styles.buttonsRow}>
        <CustomButton text="¿Qué quiere decir?" onPress={handleEnToEs} />
        <CustomButton text="¿Cómo se dice?" onPress={handleEsToEn} />
      </View>

      {currentPair && (
        <>
          <View style={styles.card}>
            <Text style={styles.expression}>
              {currentMode === 'enToEs' ? currentPair.en : currentPair.es}
            </Text>
          </View>

          {!showAnswer && (
            <CustomButton text="Mostrar respuesta" onPress={handleShowAnswer} />
          )}

          {showAnswer && (
            <View style={styles.answerBox}>
              <Text style={styles.answer}>
                {currentMode === 'enToEs' ? currentPair.es : currentPair.en}
              </Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

function CustomButton({ text, onPress }: { text: string; onPress: () => void }) {
  const scale = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  expression: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#263238',
  },
  answerBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    width: '85%',
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  answer: {
    fontSize: 20,
    color: '#2e7d32',
    fontWeight: '600',
    textAlign: 'center',
  },
});
