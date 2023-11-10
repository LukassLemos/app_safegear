import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from 'react-native-vector-icons';
import Firebase from 'firebase';
import { useTheme } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'; // Importe o TextInputMask

const EPI = ({ navigation, route }) => {
  const [episData, setEpisData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [originalEpisData, setOriginalEpisData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const { colors, dark } = useTheme();
  

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
        setOriginalEpisData(episArray);
        setEpisData(episArray);
      } else {
        setEpisData([]);
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

          <TouchableOpacity onPress={() => setDatePickerVisible(!isDatePickerVisible)}>
            <FontAwesome name={isDatePickerVisible ? 'close' : 'clipboard'} size={24} style={[styles.iconclipboard, { color: colors.iconColor }]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
            <Icon name={searchVisible ? 'close' : 'search'} size={24} style={[styles.iconsearch, { color: colors.iconColor }]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={loadData}>
            <Icon name="refresh" size={24} style={[styles.iconrefresh, { color: colors.iconColor }]} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="bars" size={20} style={[styles.iconbars, { color: colors.iconColor }]} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, searchVisible, isDatePickerVisible, colors]);

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const navigateToEntrega = () => {
    navigation.navigate('EntregaEpis');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filtrar epis com base nas primeiras letras do nome do funcionário
    const filteredEpis = originalEpisData.filter((epi) =>
      epi.funcionarios.toLowerCase().includes(query.toLowerCase())
    );

    setEpisData(filteredEpis);
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);

    // Filtrar epis com base na data de substituição
    const filteredEpis = originalEpisData.filter((epi) =>
      epi.epis[0].previsaoSubstituicao.includes(date)
    );

    setEpisData(filteredEpis);
  };

  const toggleModal = (item) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  const showRemoveModal = (item) => {
    setSelectedItem(item);
    setRemoveModalVisible(true);
  };
  const handleDarBaixa = () => {
    navigation.navigate('ExcluiRegistro', { selectedItem: selectedItem });
    setModalVisible(false);
  };

  const handleEditar = () => {
    navigation.navigate('EditarEpis', { selectedItem: selectedItem });
    setModalVisible(false);
  };

  const handleTrocar = () => {
    navigation.navigate('TrocaEPI', { selectedItem: selectedItem });
    setModalVisible(false);
  };


  useEffect(() => {
    loadData();
    if (route.params && route.params.itemDeleted) {
      loadData();
    }
  }, [route.params]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {searchVisible && (
        <TextInput
          style={[styles.searchInput, { color: dark ? 'white' : 'black' }]}
          placeholderTextColor={dark ? 'white' : 'rgba(0, 0, 0, 0.5)'}
          placeholder="Buscar por nome..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      )}

      {isDatePickerVisible && (
        <TextInputMask
          style={[styles.searchInput, { color: dark ? 'white' : 'black' }]}
          placeholderTextColor={dark ? 'white' : 'rgba(0, 0, 0, 0.5)'}
          placeholder="Data de Substituição (DD/MM/AAAA)"
          keyboardType="numeric"
          maxLength={10}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={selectedDate}
          onChangeText={(text) => setSelectedDate(text)}
          onBlur={() => handleDateFilter(selectedDate)}
        />
      )}

      <Text style={[styles.text, { color: dark ? 'white' : 'black' }]}>Lista de Funcionários</Text>

      {episData.length > 0 ? (
        <FlatList
          data={episData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            // Verifica se o nome do funcionário contém o texto da busca
            const isVisibleName = item.funcionarios.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Verifica se a data de substituição contém o texto da busca
            const isVisibleDate = item.epis[0].previsaoSubstituicao.includes(selectedDate);

            // Mostra o item somente se ambas as condições forem verdadeiras
            const isVisible = isVisibleName && isVisibleDate;

            return isVisible ? (
              <TouchableOpacity onPress={() => toggleModal(item)}>
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
            ) : null;
          }}
        />
      ) : (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>Nenhum registro encontrado.</Text>
        </View>
      )}

              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
              >
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={handleEditar}
                  >
                    <Icon name="edit" size={24} style={styles.modalIcon} />
                    <Text>EDITAR</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={handleTrocar}>
                    <Icon name="arrow-right" size={24} style={styles.modalIcon} />
                    <Text>TROCAR</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={handleDarBaixa}>
                    <Icon name="trash" size={24} style={styles.modalIcon} />
                    <Text>DAR BAIXA</Text>
                  </TouchableOpacity>
                  <TouchableHighlight
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text>Fechar</Text>
                  </TouchableHighlight>
                </View>
              </Modal>
        
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
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          },
          iconrefresh: {
            marginRight: 16,
            color: 'black',
            marginRight: -2,
          },
          iconsearch: {
            marginRight: 16,
            color: 'black',
            marginRight: 25,
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
            marginTop: -30,
          },
          prev: {
            color: 'red',
          },
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          modalOption: {
            backgroundColor: 'white',
            padding: 16,
            margin: 10,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
          },
          modalIcon: {
            marginRight: 8,
          },
          closeButton: {
            backgroundColor: 'white',
            padding: 16,
            margin: 10,
            borderRadius: 8,
            alignItems: 'center',
          },
          modalButtons: {
            flexDirection: 'row',
          },
          removeButton: {
            backgroundColor: 'green',
            padding: 16,
            margin: 10,
            borderRadius: 8,
            alignItems: 'center',
          },
          cancelButton: {
            backgroundColor: 'red',
            padding: 16,
            margin: 10,
            borderRadius: 8,
            alignItems: 'center',
          },
          removeButtonText: {
            color: 'white',
            fontSize: 16,
          },
          cancelButtonText: {
            color: 'white',
            fontSize: 16,
          },
          modalContainer1: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: 30,
            borderRadius: 8, // Cantos arredondados
            margin: 6, // Adicione esta linha para criar uma margem
          },
          topcontainer:{
            fontSize:15,
            fontWeight: 'bold',
          },
           
          iconbars:{
            marginLeft: 16,
            marginRight: 20
          },
        
          iconclipboard:{
            marginRight: 16,
            color: 'black',
            marginRight: 25,
            marginTop:1
          }
        });
        
        export default EPI;
        
