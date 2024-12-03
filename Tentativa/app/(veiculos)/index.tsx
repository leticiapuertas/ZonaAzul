import theme from "@/theme";
import {Text, View, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Input } from "react-native-elements";
import { BottomSheet } from "react-native-elements/dist/bottomSheet/BottomSheet";
import styled, { ThemeProvider } from "styled-components/native"; 
import { Link, router, useNavigation } from "expo-router";
import { useState } from "react";
import { apiConfig } from "@/Api/axios";

export default function Aluguel() {

    const [telefone, setTelefone] = useState('');
    const [veiculo, setVeiculo] = useState('');
    const [tempoHoras, setTempoHoras] = useState('');

    const navigation = useNavigation();

    async function handlePress() {
      if (telefone != '' && veiculo != '' && tempoHoras != '') {
      try {
          const response = await apiConfig.post('/aluguel', { 
              veiculo: veiculo,
              telefone: telefone,
              tempo_horas: tempoHoras 
          });

          if (response.status === 204) {
              Alert.alert('Ops...', 'erro ao cadastrar', [
                {
                  text: 'Ok'
                }
              ]);
            } else {
              router.push('/(pagamento)');
          }

      } catch (error) {
          console.error('Erro ao enviar dados:');
      }
  }else {
          alert( 'Por favor, preencha todos os campos corretamente.');
        }
  };
  
    return (
      <ThemeProvider theme={theme}>
        <Fundo>
          <Container>
            <CARD>
            <Image style={{height: 100, width: 250}} source={require("../../assets/images/Logo.png")}/>
              <Texto_veiculo>Informações Veículo</Texto_veiculo>
              <StyledTextInput placeholder="Placa" value={veiculo} onChangeText={setVeiculo}/>
              <StyledTextInput placeholder="Tempo de uso" value={tempoHoras} onChangeText={setTempoHoras}/>
              <StyledTextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone}/>
            <Fundo1>
            <Link href='/(inicial)' asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </Link>
                <TouchableOpacity style={styles.button} onPress={()=> handlePress()}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </Fundo1>
            </CARD>
          </Container>
        </Fundo>
        </ThemeProvider>
    );
  }
  
  export const styles = StyleSheet.create({
    button: {
      width: 150,
      backgroundColor: '#00b4d8', // Azul claro do botão
      padding: 15,
      borderRadius: 10,
      textAlign: 'center',
      alignItems: 'center',
    },

    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

  });
  

  const StyledTextInput = styled.TextInput`
    text-align: center;
    height: 2.5rem;
    width: 15rem ;
    margin: 10px;
    border-width: 3px;
    border-color: #ccc;
    padding-top: 2px;
    border-radius: 5px;
    background-color: #f9f9f9;
  ;`

const Container = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
`

const CARD = styled.View`
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
    border-radius: 1rem;
    width: 25rem;
    height: 35rem;
    justify-content: center;
    align-items: center;
  `
     

const Texto_veiculo = styled.Text`
    color: ${({theme}) => theme.COLORS.WHITE};
    align-items: center;
    font-size: 30;
    line-height: 90;
    `

const Fundo = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.COLORS.GRAY_400};
  `

const Fundo1 = styled.View`
  gap: 20;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 20;
;
`

// const Title = styled.Title
//     height: 25rem; 
//     width: 50rem;
//     border-radius: 1rem