import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Inicio({ navigation }) {
  const data = [
    { title: "Anotações", icon: "ios-calendar", action: () => navigation.navigate('Anotações') },
    { title: "Configurações", icon: "ios-settings", action: () => navigation.navigate('Configurações') },
    { title: "Notificações", icon: "ios-notifications", action: () => navigation.navigate('Notificações') },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={item.action}>
      <Icon name={item.icon} size={50} color="blue" />
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Página Inicial</Text>
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
    backgroundColor: '#f0f0f0', // Background color for the whole screen
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Add some spacing between button rows
  },
  button: {
    width: 150, // Decreased button width
    height: 150, // Decreased button height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue', // A modern blue color with some transparency
    borderRadius: 15, // Rounded corners
    margin: 10, // Increased margin
  },
  buttonText: {
    marginTop: 10, // Add some spacing between icon and text
    fontSize: 16, // Increased font size
    color: 'white', // Text color
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Center-align text
  },
  pageTitle: {
    fontSize: 24, // Increased font size for the page title
    marginBottom: 20, // Add some spacing below the page title
  },
});

export default Inicio;
