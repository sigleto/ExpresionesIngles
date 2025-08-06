import { SafeAreaView } from 'react-native';
import ExpressionTrainer from '../components/ExpresionTrainer';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ExpressionTrainer />
    </SafeAreaView>
  );
}

// ✅ Oculta la cabecera (evita que se vea "index")
export const options = {
  
};
