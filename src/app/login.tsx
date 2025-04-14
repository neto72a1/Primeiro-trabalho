import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../components/input';
import { Button } from '../components/button';
import { useNavigation } from '@react-navigation/native';
import { login } from '../api/apiService';



const LoginScreen = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    setError('');
    try {
      const data = await login(identifier, password);
      console.log('Login Sucesso:', data);
      navigation.navigate; 'Menu';
    } catch (err) {
      setError('Credenciais inválidas.');
      console.error('Erro no login:', err);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate; 'Register';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <InputField
        placeholder="CPF ou Matrícula"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="default"
      />
      <InputField
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'blue',
  },
});

export default LoginScreen;
