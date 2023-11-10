import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Inicio({ navigation }) {
  const data = [
    { title: "Anotações", icon: "ios-calendar", action: () => navigation.navigate('Anotações') },
    { title: "Configurações", icon: "ios-settings", action: () => navigation.navigate('Configurações') },
   
  ];

  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);
  const { colors, dark } = useTheme();
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    // Atualizar opções de navegação para adicionar os ícones de lupa e recarregar
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <FontAwesome name="bars" size={20} style={[styles.iconbars, { color: colors.iconColor }]} />
        </TouchableOpacity>
      ),
    });
  }, [colors]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={item.action}>
      <View style={styles.buttonContent}>
        <Icon name={item.icon} size={50} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <Text style={[styles.pageTitle, { color: colors.iconColor }]}>Seja Bem Vindo !</Text>

      <View style={styles.buttonContainer}>
        {data.slice(0, 2).map((item, index) => (
          <View key={index}>{renderItem({ item })}</View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {data.slice(2).map((item, index) => (
          <View key={index}>{renderItem({ item })}</View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Cor de fundo para toda a tela
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Adicionando espaçamento entre as linhas de botões
  },
  button: {
    backgroundColor: '#3498db', // Cor de fundo do botão
    padding: 15, // Aumentando o espaçamento interno para aumentar o tamanho
    borderRadius: 10, // Bordas arredondadas
    margin: 10,
    elevation: 5, // Sombra
    alignItems: 'center',
    justifyContent: 'center',
    width: 150, // Decreased button width
    height: 150, // Decreased button height
  },
  buttonContent: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10, // Espaçamento entre o ícone e o texto
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center', // Center-align text
  },
  pageTitle: {
    fontSize: 25, // Tamanho do título aumentado
    color: 'black', // Cor de texto em preto
    marginBottom: 50,
    textTransform: 'uppercase', // Transforma o texto em maiúsculas
  },
  iconbars:{
    marginLeft: 16,
    marginRight: 20
  },
});

export default Inicio;
