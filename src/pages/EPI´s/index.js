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

    episRef.once('value', (snapshot) => {
      const episArray = [];
      snapshot.forEach((childSnapshot) => {
        const epis = childSnapshot.val();
        episArray.push(epis);
      });

      if (episArray.length > 0) {
        // Atualize o estado originalEpisData com os dados do Firebase
        setOriginalEpisData(episArray);
        // Atualize também o estado episData com os dados originais
        setEpisData(episArray);
      }
    });
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
  }, [navigation, searchVisible]);

  const navigateToEntrega = () => {
    navigation.navigate('EntregaEpis');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filtrar os dados com base na consulta de pesquisa
    const filteredEpisData = originalEpisData.filter((epi) =>
      epi.funcionarios.toLowerCase().includes(query.toLowerCase())
    );

    setEpisData(filteredEpisData);
  };

  const showDetails = (item) => {
    // Implemente a lógica para mostrar os detalhes do registro.
    console.log(item);
    // Por exemplo, você pode navegar para outra tela para exibir os detalhes.
    // navigation.navigate('Detalhes', { item });
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

      {episData.length > 0 ? (
        <FlatList
          data={episData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showDetails(item)}>
              <View style={styles.epiItem}>
                <Text style={styles.nome}>{item.funcionarios}</Text>
                <Text>Data de Entrega: {item.dataEntrega}</Text>
                {item.epis && item.epis.length > 0 && (
                  <View>
                    <Text>Código do EPI: {item.epis[0].codigoEPI}</Text>
                    <Text>Nome do EPI: {item.epis[0].nomeEPI}</Text>
                    <Text>Validade CA: {item.epis[0].validadeCA}</Text>
                    <Text>Quantidade: {item.epis[0].quantidade}</Text>
                    <Text>Motivo: {item.epis[0].motivo}</Text>
                    <Text style={styles.prev}>Previsão de Substituição: {item.epis[0].previsaoSubstituicao}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>Nenhum registro encontrado.</Text>
         </View>
      )}

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
  epiInfoContainer: {
    marginTop: 8,
  },
  epiInfo: {
    fontSize: 16,
  },
  noRecordsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    fontSize: 10,
    marginStart: -10,
    textAlign: 'center',
    marginTop: -30
  },
  prev:{
    color:'red'
  }
});

export default EPI;