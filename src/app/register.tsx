import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputField from '../components/input';
import { Button } from '../components/button';
import { useNavigation } from '@react-navigation/native';
import { register } from '../api/apiService';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [age, setAge] = useState('');
  const [registration, setRegistration] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    setError('');
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const userData = {
      fullName,
      cpf,
      age: parseInt(age, 10),
      registration,
      password,
    };

    try {
      const data = await register(userData);
      console.log('Cadastro Sucesso:', data);
      navigation.navigate,'Login';
    } catch (err) {
      setError('Erro ao cadastrar. Verifique os dados.');
      console.error('Erro no cadastro:', err);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate,'Login';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <InputField
        placeholder="Nome Completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <InputField
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <InputField
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <InputField
        placeholder="Matrícula"
        value={registration}
        onChangeText={setRegistration}
        keyboardType="default"
      />
      <InputField
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={handleRegister} />
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'blue',
  },
});

export default RegisterScreen;