import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { router } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { apiConfig } from "../../Api/axios";

export function LoginScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // Inicializa sem mensagem de erro

  async function login() {
    const nameError = nome.trim() === '';
    const passwordError = password === '';
  
    setIsNameError(nameError);
    setIsPasswordError(passwordError);
  
    // Configura a mensagem de erro como "Senha incorreta" se o campo estiver vazio
    setPasswordErrorMessage(passwordError ? 'Senha incorreta' : '');
  
    // Verifica se há erros antes de fazer a requisição
    if (nameError || passwordError) {
      return; // Não faz a requisição se houver campos obrigatórios vazios
    }
  
    try {
      let res = await apiConfig.post('/login', {
        nome: nome,
        senha: password,
      });
  
      if (res.status === 204) {
        setIsPasswordError(true);
        setPasswordErrorMessage('Senha incorreta'); // Exibe "Senha incorreta" para erro de senha incorreta
      } else {
        setIsPasswordError(false);
        setPasswordErrorMessage('');
        router.push('/(inicial)');
      }
    } catch (error) {
      console.log(error);
      setPasswordErrorMessage('Erro ao logar... :(');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <View style={styles.loginContainer}>
          <Image source={require('../../assets/images/Logo.png')} style={{ height: 90, width: 250 }} />
          <Text style={styles.loginText}>Login</Text>

          <Input
  placeholder="Usuário"
  onChangeText={(text) => {
    setNome(text);
    if (isNameError && text.trim() !== '') {
      setIsNameError(false); // Limpa o erro de nome ao digitar corretamente
    }
  }}
  inputContainerStyle={estilo.input_container}
  inputStyle={{ color: '#fff' }}
  leftIcon={<Icon name='person' type='material' color={'#fff'} />}
/>

<Input
  placeholder="Senha"
  secureTextEntry={!showPassword}
  onChangeText={(text) => {
    setPassword(text);
    if (isPasswordError && text !== '') {
      setIsPasswordError(false);
      setPasswordErrorMessage('');
    }
  }}
  errorMessage={isPasswordError ? passwordErrorMessage : ''}
  inputContainerStyle={isPasswordError ? estilo.input_container_error : estilo.input_container}
  inputStyle={{ color: '#fff' }}
  leftIcon={<Icon name='lock' type='material' color={'#fff'} />}
  rightIcon={
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Icon name={showPassword ? 'visibility' : 'visibility-off'} color={'#fff'} />
    </TouchableOpacity>
  }
/>

          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a212a',
  },
  square: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    padding: 20,
  },
  loginContainer: {
    width: 400,
    height: 450,
    backgroundColor: '#03045e',
    padding: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00b4d8',
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const estilo = StyleSheet.create({
  input_container: {
    height: 50,
    width: 300,
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  input_container_error: {
    borderWidth: 2,
    borderColor: '#e91515',
    borderRadius: 16,
    padding: 10,
    marginTop: 10,
    width: 300,
    height: 50,
  },
});

export default LoginScreen;
