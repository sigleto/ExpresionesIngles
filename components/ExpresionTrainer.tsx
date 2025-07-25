import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
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
      <Button title="¿Qué quiere decir?" onPress={handleEnToEs} />
      <Button title="¿Cómo se dice?" onPress={handleEsToEn} />

      {currentPair && (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.expression}>
              {currentMode === 'enToEs' ? currentPair.en : currentPair.es}
            </Text>
          </View>

          {!showAnswer && (
            <Button title="Respuesta" onPress={handleShowAnswer} />
          )}

          {showAnswer && (
            <Text style={styles.answer}>
              {currentMode === 'enToEs' ? currentPair.es : currentPair.en}
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
  },
  expression: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answer: {
    fontSize: 22,
    marginTop: 10,
    color: 'green',
    textAlign: 'center',
  },
});
