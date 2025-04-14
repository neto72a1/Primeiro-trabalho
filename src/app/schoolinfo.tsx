import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInputProps } from 'react-native';
import InputField from '../components/input';
import {Button} from '../components/button/index';
import { saveSchoolInfo } from '../api/apiService';



const SchoolInfoScreen = () => {
  const [matricula, setMatricula] = useState('');
  const [turma, setTurma] = useState('');
  const [curso, setCurso] = useState('');
  
  
  const handleSave = async () => {
    const SchoolInfo = { matricula, turma, curso };
        try {
            const token = 'SEU_TOKEN_DE_AUTENTICACAO';
            const response = await saveSchoolInfo(SchoolInfo, token);
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
      <InputField placeholder="Número de Matrícula" value={matricula} onChangeText={setMatricula} />
      <InputField placeholder="Turma" value={turma} onChangeText={setTurma} keyboardType="default" />
      <InputField placeholder="Curso" value={curso} onChangeText={setCurso} />
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

export default SchoolInfoScreen;