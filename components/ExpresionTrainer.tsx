import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
      <Text style={styles.title}>Entrenador de Expresiones</Text>

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
            <Text style={styles.answer}>
              {currentMode === 'enToEs' ? currentPair.es : currentPair.en}
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

// ✅ Componente reutilizable para botón estilizado
function CustomButton({ text, onPress }: { text: string; onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    maxWidth: 350,
  },
  expression: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  answer: {
    fontSize: 20,
    marginTop: 16,
    color: '#2e7d32',
    fontWeight: '600',
    textAlign: 'center',
  },
});
