import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import firebase from '../../services/firebaseConnection';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);

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
        console.log('Conta Excluída');
        navigation.navigate('Welcome');
      }).catch(error => {
        console.error(error);
      });
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão para acessar a câmera negada');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setAvatarSource(selectedImage.uri);

      // Salvar a imagem na galeria
      try {
        const asset = await MediaLibrary.createAssetAsync(selectedImage.uri);
        console.log('Imagem salva na galeria com ID:', asset.id);
      } catch (error) {
        console.error('Erro ao salvar a imagem na galeria:', error);
      }
    }
  };

  // Função para exibir um alerta com as opções
  const showImagePickerOptions = () => {
    Alert.alert(
      'Escolha uma opção',
      'Deseja tirar uma nova foto ou escolher da galeria?',
      [
        {
          text: 'Tirar foto',
          onPress: handleTakePhoto,
        },
        {
          text: 'Escolher da galeria',
          onPress: handleSelectProfileImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const handleSelectProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão para acessar a galeria negada');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setAvatarSource(selectedImage.uri);
    }
  };

  return (
    <View style={styles.container}>
      {avatarSource ? (
        <TouchableOpacity onPress={showImagePickerOptions}>
          <Image source={{ uri: avatarSource }} style={styles.avatar} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={showImagePickerOptions}>
          <View style={styles.cameraIconContainer}>
            <Icon name="camera" size={30} color="#238dd1" style={styles.cameraIcon} />
          </View>
        </TouchableOpacity>
      )}
      <View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 30, marginTop: 20 }}></View>
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

  botaoexcluir: {
    fontSize: 18,
    marginTop: 30,
  },

  icone: {
    marginRight: 10,
    marginTop: 32,
    marginLeft: 70,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 75,
    marginBottom: 20,
    marginLeft: 100,
    marginTop: 15
  },

  cameraIconContainer: {
    position: 'relative',
  },

  cameraIcon: {
    marginTop: 20,
    marginLeft: 150
  },

  cameraIconCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 130,
    height: 130,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
    marginLeft: 100
  },
});











 




 




