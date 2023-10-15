import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EdicaoFuncionario({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [funcionarioParaRemover, setFuncionarioParaRemover] = useState(null);

  useEffect(() => {
    const funcionariosRef = firebase.database().ref('funcionarios');

    const handleData = (snapshot) => {
      const funcionariosData = snapshot.val();

      if (funcionariosData) {
        const funcionariosArray = Object.entries(funcionariosData).map(([id, funcionario]) => ({
          id,
          nome: funcionario['1'].valor,
          registro: funcionario['0'].valor,
          // Continue para outros campos conforme necessário
        }));
        setFuncionarios(funcionariosArray);
      } else {
        setFuncionarios([]);
      }
    };

    funcionariosRef.on('value', handleData, (error) => {
      console.error('Erro ao obter dados do Firebase:', error.message);
    });

    return () => funcionariosRef.off('value', handleData);
  }, []);

  const navigateToEdicao = (id) => {
    navigation.navigate('VisualizarFunc', { funcionarioId: id });
  };

  const handleRemover = (id) => {
    setFuncionarioParaRemover(id);
    setModalVisible(true);
  };

  const confirmarRemocao = () => {
    if (funcionarioParaRemover) {
      // Implemente a lógica de remoção no Firebase
      firebase.database().ref(`funcionarios/${funcionarioParaRemover}`).remove()
        .then(() => {
          console.log('Funcionário removido com sucesso');
          setModalVisible(false);
        })
        .catch((error) => console.error('Erro ao remover funcionário:', error));
    }
  };

  const cancelarRemocao = () => {
    setFuncionarioParaRemover(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Funcionários Cadastrados</Text>

      {/* Lista de funcionários */}
      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.registro.toString()}
        renderItem={({ item }) => (
          <View style={styles.funcionarioItem} key={item.registro.toString()}>
            <Text style={styles.funcionarioRegistro}>{item.registro}</Text>
            <Text style={styles.funcionarioNome}>{item.nome}</Text>

            {/* Botões de Editar e Remover */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigateToEdicao(item.id)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonRemover]} onPress={() => handleRemover(item.id)}>
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de Confirmação */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja realmente remover o funcionário?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonSim]} onPress={confirmarRemocao}>
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancelar]} onPress={cancelarRemocao}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    position: 'absolute',
    left: 0,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
  },

  funcionarioItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  funcionarioNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  funcionarioRegistro: {
    fontSize: 14,
    color: '#666',
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  button: {
    flex: 1,
    backgroundColor: '#238dd1',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },

  buttonRemover: {
    backgroundColor: 'red',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonIcon: {
    backgroundColor: '#238dd1',
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    padding: 2,
    position: "absolute",
    top: 10,
    left: 0,
  },

  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  modalButtonSim: {
    backgroundColor: 'green',
  },

  modalButtonCancelar: {
    backgroundColor: 'red',
  },

  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

