import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import CustomDrawerItem from '../pages/CustomDrawerItem'; 

import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import SignIn from '../pages/Sign in';
import ForgotPassword from '../pages/ForgotPassword';
import Início from '../pages/Início';
import Funcionários from '../pages/Funcionários';
import EPI from '../pages/EPI´s';
import Normas from '../pages/Normas';
import Logout from '../pages/Logout';
import CadastroFuncionario from '../pages/CadastroFuncionario';
import EdicaoFuncionario from '../pages/EdicaoFuncionario';
import VisualizarFuncionarios from '../pages/EdicaoFuncionario';
import VisualizarFunc from '../pages/VisualizarFunc';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Componente personalizado para o conteúdo do Drawer
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    {/* Usar o componente personalizado para renderizar os itens do menu */}
    
    <CustomDrawerItem
      label="Início"
      onPress={() => props.navigation.navigate('Início')}
    />
    
    <CustomDrawerItem
      label="Funcionários"
      onPress={() => props.navigation.navigate('Funcionários')}
    />

    <CustomDrawerItem
      label="E.P.I´s"
      onPress={() => props.navigation.navigate('EPI')}
    />

    <CustomDrawerItem
      label="Normas"
      onPress={() => props.navigation.navigate('Normas')}
    />

    <CustomDrawerItem
      label="Sair"
      onPress={() => props.navigation.navigate('Logout')}
    />
  </DrawerContentScrollView>
);

function HomeStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Início"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>

        <Drawer.Screen 
            name="Início" 
            component={Início} 
        />

        <Drawer.Screen 
            name="Funcionários" 
            component={Funcionários} 
        />

        <Drawer.Screen 
            name="EPI" 
            component={EPI} 
        />

        <Drawer.Screen 
            name="Normas" 
            component={Normas} 
        />
        
        <Drawer.Screen 
            name="Logout" 
            component={Logout} 
        />
    </Drawer.Navigator>
  );
}


export default function AuthStack(){
    return(
        <Stack.Navigator>
            
          <Stack.Screen
            name= "Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name= "Login"
            component={Login}
            options={{headerShown: false}}
          />  

          <Stack.Screen
            name= "SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name= "ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />    

          <Stack.Screen
            name= "Home"
            component={HomeStack}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name= "CadastroFuncionario"
            component={CadastroFuncionario}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name= "EdicaoFuncionario"
            component={EdicaoFuncionario}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name= "VisualizarFunc"
            component={VisualizarFunc}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
    );

}