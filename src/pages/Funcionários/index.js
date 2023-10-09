import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Funcionários({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([]);

  const funcionario = () => {
    navigation.navigate('Cadastro', {
      onSave: (funcionario) => {
        setFuncionarios([...funcionarios, funcionario]);
        navigation ();
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página Funcionários</Text>
      
      {/* Lista de funcionários */}
      <View style={styles.funcionariosList}>
        {funcionarios.map((funcionario, index) => (
          <Text key={index}>{funcionario.nome}</Text>
          // Adicione outros campos do funcionário conforme necessário
        ))}
      </View>

      {/* Botão de adicionar funcionário */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={ () => navigation.navigate('CadastroFuncionario')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },

  funcionariosList: {
    flex: 1,
    justifyContent: 'center',
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
