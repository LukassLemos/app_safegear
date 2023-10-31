import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Firebase from 'firebase';

const EPI = ({ navigation }) => {
  const [episData, setEpisData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [originalEpisData, setOriginalEpisData] = useState([]);

  const loadData = () => {
    const database = Firebase.database();
    const episRef = database.ref('Cadastro de Epis');

    episRef.on('value', (snapshot) => {
      const epis = snapshot.val();

      if (epis) {
        const flatListData = Object.values(epis).map((epi) => epi.funcionarios);

        setEpisData(flatListData);
        setOriginalEpisData(flatListData); // Armazenar uma cópia original para a pesquisa
      }
    });

    return () => {
      episRef.off();
    };
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerIcons}>

          <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
            <Icon name={searchVisible ? 'close' : 'search'} size={24} style={styles.iconsearch}  />
          </TouchableOpacity>

          <TouchableOpacity onPress={loadData}>
            <Icon name="refresh" size={24} style={styles.iconrefresh} />
          </TouchableOpacity>

        </View>
      ),
    });
  }, [navigation, loadData, searchVisible]);

  const navigateToEntrega = () => {
    navigation.navigate('EntregaEpis');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filtrar os dados com base na consulta de pesquisa
    const filteredEpisData = originalEpisData.filter((epi) =>
      epi.toLowerCase().includes(query.toLowerCase())
    );

    setEpisData(filteredEpisData);
  };

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa */}
      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      )}

      <Text style={styles.text}>Lista de Funcionários</Text>

      <FlatList
        data={episData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.epiItem}>
            <Text style={styles.nome}>{item}</Text>
            {/* Renderize informações adicionais do trabalhador aqui */}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={navigateToEntrega}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#238dd1',
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
  epiItem: {
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  searchInput: {
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },

  iconrefresh:{
    marginRight: 16,
    color: 'black',
    marginRight:-2
  },

  iconsearch: {
    marginRight: 16,
    color: 'black',
    marginRight: 25
  },
});

export default EPI;





