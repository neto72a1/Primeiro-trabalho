import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInputProps } from 'react-native';
import InputField from '../components/input';
import {Button} from '../components/button/index';
import { savePersonalData } from '../api/apiService';



const HealthInfoScreen = () => {
  const [fator, setFator] = useState('');
  const [alergia, setAlergia] = useState('');
  const [cronicas, setCronicas] = useState('');
  const [uso, setUso] = useState('');
  const [deficiencia, setDeficiencia] = useState('');
  const [vacina, setVacina] = useState('');
  const [acomp, setAcomp] = useState('');

  
  
  const handleSave = async () => {
    const healthInfo = { alergia, cronicas, fator, uso, deficiencia, vacina, acomp };
        try {
            const token = 'SEU_TOKEN_DE_AUTENTICACAO';
            const response = await savePersonalData(healthInfo, token);
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
      <InputField placeholder="Tipo Sanguíneo" value={fator} onChangeText={setFator} />
      <InputField placeholder="Alergias conhecidas" value={alergia} onChangeText={setAlergia} />
      <InputField placeholder="Doenças crônicas" value={cronicas} onChangeText={setCronicas} />
      <InputField placeholder="Uso contínuo de medicamentos" value={uso} onChangeText={setUso} />
      <InputField placeholder="Deficiências ou limitações físicas/motoras" value={deficiencia} onChangeText={setDeficiencia} />
      <InputField placeholder="Vacinação em dia?" value={vacina} onChangeText={setVacina} />
      <InputField placeholder="Necessidade de acompanhamento especializado" value={acomp} onChangeText={setAcomp} />
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

export default HealthInfoScreen;