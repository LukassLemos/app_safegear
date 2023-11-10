import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Notificações() {
  const episData = [
    {
      funcionario: 'João da Silva',
      codigoEPI: '001',
      nomeEPI: 'Protetor Auricular',
      validadeCA: '01/12/2025',
      quantidade: '10',
      motivo: 'Entrega',
      previsaoSubstituicao: '01/12/2030',
    },
    {
      funcionario: 'Maria Oliveira',
      codigoEPI: '002',
      nomeEPI: 'Luvas de Segurança',
      validadeCA: '05/10/2025',
      quantidade: '20',
      motivo: 'Entrega',
      previsaoSubstituicao: '05/10/2030',
    },
    // Adicione mais objetos de dados conforme necessário.
  ];

  return (
    <View>
      <Text style={styles.textepi}>E.P.I´s adicionados</Text>
      <FlatList
        data={episData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.epiItem}>
            <Text style={styles.texttop}>EPI {index + 1}</Text>
            <Text style={styles.text1}>Funcionário: {item.funcionario}</Text>
            <Text style={styles.text1}>Código do EPI: {item.codigoEPI}</Text>
            <Text style={styles.text1}>Nome do EPI: {item.nomeEPI}</Text>
            <Text style={styles.text1}>Validade CA: {item.validadeCA}</Text>
            <Text style={styles.text1}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.text1}>Motivo: {item.motivo}</Text>
            <Text style={styles.text1}>Previsão de Substituição: {item.previsaoSubstituicao}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = {
  textepi: {
    fontSize: 20,
    marginLeft: 70,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },

  epiItem: {
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 20,
  },

  texttop: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  text1: {
    fontSize: 15,
    marginBottom: 10,
  },
};
