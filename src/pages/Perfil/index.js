import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import firebase from '../../services/firebaseConnection';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const { displayName, email } = user;
      if (displayName) {
        setName(displayName);
      }
      if (email) {
        setEmail(email);
      }
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Welcome');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProfile = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          console.log('Nome atualizado com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao atualizar o nome:', error);
        });

      setIsEditingName(false);
    }
  };

  const handleDeleteAccount = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      user.delete().then(() => {
        console.log('Conta Excluída')
        navigation.navigate('Welcome');
      }).catch(error => {
        console.error(error);
      });
    }
  };

  return (
    <View style={styles.container}>
      
      <View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 30, marginTop: 130 }}></View>
        <Text style={styles.label}>Nome</Text>
        {isEditingName ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        ) : (
          <Text style={styles.text}>{name}</Text>
        )}
      </View>
      <View>
      <Text style={styles.label}>Email</Text>
        {isEditingName ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              editable={false}
            />
        ) : (
            <Text style={styles.text}>{email}</Text>
        )}
      </View>
      {isEditingName && (
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      )}
      {!isEditingName && (
        <TouchableOpacity onPress={() => setIsEditingName(true)} style={styles.button}>
          <Text style={styles.buttonText}>Editar Informações</Text>
        </TouchableOpacity>
      )}
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 20, marginTop: 30 }}></View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{ flexDirection: 'row',}}>
          <Icon name="trash" size={20} color="red" style={styles.icone}/>
          <Text style={styles.botaoexcluir}>Excluir Conta Definitivamente</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Tem certeza de que deseja excluir permanentemente sua conta?</Text>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={[styles.modalButton, styles.modalButtonSim]} onPress={() => {
                  handleDeleteAccount();
                  setModalVisible(false);
                }}>
                  <Text style={styles.modalButtonText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancelar]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#FFF',
    padding: 16,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  label: {
    fontSize: 18,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },

  text: {
    fontSize: 18,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#238dd1',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
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
    marginBottom: 10,
    textAlign: 'center',
  },

  modalButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },

  modalButtonSim: {
    backgroundColor: 'green',
    padding: 15,
  },

  modalButtonCancelar: {
    backgroundColor: 'red',
    padding: 15,
  },

  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

   modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  botaoexcluir:{
    fontSize:18,
    marginTop:100,
  },

  icone: {
    marginRight: 10, // Adicione margem direita ao ícone para separá-lo do text
    marginTop:101,
    marginLeft: 70
  },
  
});

