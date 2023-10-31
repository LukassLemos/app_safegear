import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Você pode escolher um ícone da biblioteca de ícones que preferir.

export default function Início({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon name="wrench" size={100} color="gray" />
      <Text style={styles.text}>Em Construção</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginTop: 50
  },
});
