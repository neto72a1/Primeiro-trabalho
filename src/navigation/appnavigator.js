import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/login';
import RegisterScreen from '../app/register';
import MenuScreen from '../app/menu';
import PersonalDataScreen from '../app/personaldata';
import SchoolInfoScreen from '../app/schoolinfo';
import HealthInfoScreen from '../app/healthinfo';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalData" component={PersonalDataScreen} options={{ title: 'Dados Pessoais' }} />
        <Stack.Screen name="SchoolInfo" component={SchoolInfoScreen} options={{ title: 'Info. Escolares' }} />
        <Stack.Screen name="HealthInfo" component={HealthInfoScreen} options={{ title: 'Info. de Saúde' }} />
        {/* Adicione outras telas conforme necessário */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;