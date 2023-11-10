import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

export default function Logout() {
  const navigation = useNavigation();

  const { colors, dark } = useTheme();

  function handleLogout() {
    navigation.navigate('Welcome');
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <FontAwesome name="bars" size={20} style={[styles.iconbars, { color: colors.iconColor }]} />
        </TouchableOpacity>
      ),
    });
  }, [colors]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text,  { color: colors.iconColor } ]}>Você deseja realmente sair?</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#238dd1',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  iconbars:{
    marginLeft: 16,
    marginRight: 20
  },
});
