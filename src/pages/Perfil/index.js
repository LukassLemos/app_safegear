import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Perfil({ navigation }) {
  const user = firebase.auth().currentUser;
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      // Navegar de volta para a tela de boas-vindas ou outra tela de entrada
      navigation.navigate('Welcome');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = () => {
    // Coloque aqui a lógica para excluir permanentemente a conta
    // Lembre-se de mostrar uma confirmação antes de excluir
    // Após a exclusão, você pode chamar handleSignOut para fazer o logout
  };

  return (
    <View>
      <Text>Nome: {user.displayName}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Atualizar Perfil" onPress={() => {/* Lógica para atualizar o perfil no Firebase */}} />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="trash" size={20} color="red" />
          <Text style={{ marginRight: 10 }}>Excluir Conta Definitivamente</Text>
        </View>
      </TouchableOpacity>

      {/* Modal de confirmação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Tem certeza de que deseja excluir permanentemente sua conta?</Text>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            <Button title="Confirmar Exclusão" onPress={() => {
              handleDeleteAccount();
              setModalVisible(false);
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
