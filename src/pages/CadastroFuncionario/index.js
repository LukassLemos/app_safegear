import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function CadastroFuncionario() {
  const navigation = useNavigation();

  const handleFinalizarCadastro = () => {
    alert('Cadastro Finalizado', 'O cadastro foi concluído com sucesso!');
  };

  return (
    <ScrollView style={styles.ScrollView}>

      <View style={styles.container}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={ () => navigation.goBack('CadastroFuncionario')}
          >
          <Text style={styles.buttonText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastro de Funcionário</Text>
      </View>

      <View style={styles.containerMeio}>
        <View style={styles.containerInterno}>

          <Text style={styles.subTitulosDivisao}>Informações Pessoais:</Text>
          <TextInput keyboardType="numeric" placeholder="Número de Registro."style={styles.textInput}/>
          <TextInput placeholder="Nome completo."style={styles.textInput}/>
          <TextInput placeholder="Sexo."style={styles.textInput}/>
          <TextInput placeholder="Data de nascimento."style={styles.textInput}/>
          <TextInput keyboardType="numeric" textInputContentType="none" placeholder="RG."style={styles.textInput}/>
          <TextInput keyboardType="numeric" textInputContentType="none" placeholder="CPF."style={styles.textInput}/>
          <TextInput keyboardType="phone-pad" placeholder="Telefone Fixo."style={styles.textInput}/>
          <TextInput keyboardType="phone-pad" placeholder="Celular."style={styles.textInput}/>
          <TextInput keyboardType="email-address" placeholder="E-mail."style={styles.textInput}/>

          <Text style={styles.subTitulosDivisao}>Endereço do Colaborador:</Text>
          <TextInput keyboardType="numeric" placeholder="CEP."style={styles.textInput}/>
          <TextInput placeholder="País."style={styles.textInput}/>
          <TextInput placeholder="Estado."style={styles.textInput}/>
          <TextInput placeholder="Município."style={styles.textInput}/>
          <TextInput placeholder="Estrada, Rua, etc..."style={styles.textInput}/>
          <TextInput keyboardType="numeric" placeholder="Nº."style={styles.textInput}/>
          <TextInput placeholder="Complemento."style={styles.textInput}/>

          <Text style={styles.subTitulosDivisao}>Informação de Ocupação:</Text>
          <TextInput placeholder="Setor."style={styles.textInput}/>
          <TextInput placeholder="Cargo."style={styles.textInput}/>
          
          <Text style={styles.subTitulosDivisaoEmergencia}>Contato de Emergência:</Text>
          <TextInput keyboardType="phone-pad" placeholder="Telefone Fixo."style={styles.textInput}/>
          <TextInput keyboardType="phone-pad" placeholder="Celular."style={styles.textInput}/>
          <TextInput keyboardType="email-address" placeholder="E-mail."style={styles.textInput}/>
        </View>

      </View>
      <View style={styles.container}>

        <View style={styles.buttonContainerEnviar}>

          <TouchableOpacity
            style={styles.button}
            onPress={handleFinalizarCadastro} // Alteração aqui para chamar a função
            >
           <Text style={styles.buttonTextCad}>FINALIZAR CADASTRO</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

//Estilos

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },

  containerMeio: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,  // Define a largura da borda para todas as bordas
    borderRadius: 5, // Define o raio para todas as bordas
    borderColor: "gray",
  },
  
  containerInterno:{
    width:"100%",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:5,
    paddingRight:5,
  },

  textInput:{
    height:35,
    marginBottom:5,
    borderBottomWidth:1,
    fontSize:18,
    color:"#000000",
  },

  subTitulosDivisao:{
    backgroundColor:"#e3e3e3",
    paddingLeft:5,
    borderRadius:10,
    fontSize:20,
    color:"#5498ff",
    fontWeight:"bold",
  },
  
  subTitulosDivisaoEmergencia:{
    backgroundColor:"#e3e3e3",
    paddingLeft:5,
    borderRadius:10,
    fontSize:20,
    color:"#ff3333",
    fontWeight:"bold",
  },

  buttonContainer:{
    position: "absolute",
    top:10, // Ajuste a posição vertical do botão conforme necessário
    left:0, // Ajuste a posição horizontal do botão conforme necessário
  },

  button: {
    backgroundColor: "#48c5fa", // Cor do botão
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 5, // Define o raio para todas as bordas
    padding: 2,
  },

  buttonText:{ //Para botão voltar
    color:"white",
    fontSize:15,
  },

  buttonContainerEnviar:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },

  buttonTextCad:{ //Para botão cadastro
    color:"white",
    fontSize:20,
  },
  
});
