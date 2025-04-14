import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInputProps } from 'react-native';
import InputField from '../components/input';
import {Button} from '../components/button/index';
import { savePersonalData } from '../api/apiService';



const PersonalDataScreen = () => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSave = async () => {
    const personalData = { address, phone, name, birth };
        try {
            // Recupere o token de autenticação (ex: AsyncStorage)
            const token = 'SEU_TOKEN_DE_AUTENTICACAO';
            const response = await savePersonalData(personalData, token);
            console.log('Dados Pessoais Salvos:', response);
            alert('Dados pessoais salvos com sucesso!');
        } 
        catch (error) {
          console.error('Erro ao salvar dados pessoais:', error);
          alert('Erro ao salvar dados pessoais.');
        }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Dados Pessoais</Text>
      <InputField placeholder="Nome Completo" value={name} onChangeText={setName} />
      <InputField placeholder="Data de Nascimento" value={birth} onChangeText={setBirth} keyboardType="default" />
      <InputField placeholder="Endereço" value={address} onChangeText={setAddress} />
      <InputField placeholder="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PersonalDataScreen;