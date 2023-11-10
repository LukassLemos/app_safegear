import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../context/AppContext';
import { Linking } from 'react-native';

export default function Configuracoes() {
  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

  const toggleTheme = () => {
    setIsDarkTheme((current) => !current);
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/safe_gear_app');
  };

  const openTwitter = () => {
    Linking.openURL('https://twitter.com/safe_gear_app');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Configurações</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.text1, { color: colors.text }]}>Aparência</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>

      <View style={styles.horizontalLine} />

      <Text style={[styles.text2, { color: colors.text }]}>Redes Sociais</Text>

      {/* Ícones clicáveis do Instagram e Twitter lado a lado */}
      <View style={styles.iconsContainer}>
        {/* Ícone clicável do Instagram */}
        <TouchableOpacity onPress={openInstagram} style={styles.iconContainer1}>
          <Icon name="instagram" size={50} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.horizontalLine2} />

        {/* Ícone clicável do Twitter */}
        <TouchableOpacity onPress={openTwitter} style={styles.iconContainer2}>
          <Icon name="twitter" size={50} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.text3, { color: colors.text }]}>Sobre o Aplicativo</Text>
      <View style={styles.aboutContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Logo(2).png')} // Substitua 'sua_imagem.png' pelo nome real da sua imagem
            style={styles.appImage}
          />
          <Text style={[styles.textVersion, { color: colors.text }]}>v. 1.1.0</Text>
        </View>
      </View>
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
    fontSize: 30,
    marginRight: 100,
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
  },
  text1: {
    fontSize: 20,
    marginRight: 160,
  },
  text2: {
    fontSize: 20,
    marginRight: 180,
    marginTop: 20,
  },
  text3: {
    fontSize: 20,
    marginRight: 140,
    marginTop: 60,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // Ajuste conforme necessário
    marginTop: 10,
  },
  iconContainer1: {
    alignItems: 'center',
    marginLeft:40,
    marginTop:20
  },
  iconContainer2: {
    alignItems: 'center',
    marginLeft: -600,
    marginTop:20,
    marginRight: 40
  },
  horizontalLine: {
    borderBottomWidth: 1,
    width: '100%', // Ajuste conforme necessário
    borderColor: 'gray',
    marginVertical: 30,
  },
  horizontalLine2: {
    borderBottomWidth: 1,
    width: '150%', // Ajuste conforme necessário
    borderColor: 'gray',
    marginBottom:-30,
    marginLeft:-620
  },
  aboutContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appImage: {
    width: 50, // Ajuste conforme necessário
    height: 50,
    marginBottom: 1,
    marginTop:20,
    marginLeft:10
  },
  textVersion: {
    fontSize: 18,
    marginLeft: 150,
    marginRight:10,
    marginBottom:-15
  },
});
