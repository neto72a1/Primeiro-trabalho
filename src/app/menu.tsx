import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();

  const navigateToPersonalData = () => {
    navigation.navigate,'PersonalData';
  };

  const navigateToSchoolInfo = () => {
    navigation.navigate,'SchoolInfo';
  };

  const navigateToHealthInfo = () => {
    navigation.navigate,'HealthInfo';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToPersonalData}>
        <Text style={styles.buttonText}>Cadastro de Dados Pessoais</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToSchoolInfo}>
        <Text style={styles.buttonText}>Informações Escolares</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToHealthInfo}>
        <Text style={styles.buttonText}>Informações de Saúde</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MenuScreen;