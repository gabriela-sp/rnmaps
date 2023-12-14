import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    height: '100vh', // Garante que o contêiner pai ocupa 100% da altura da tela
    flexDirection: 'row', // Mantém a direção da linha para colocar os elementos lado a lado
  },
});