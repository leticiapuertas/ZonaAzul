import React, { useState } from "react";
import theme from "@/theme";
import { Image, Text, View, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Icon } from 'react-native-elements';
import styled, { ThemeProvider } from "styled-components/native"; 

export default function Header() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Image style={{ height: 130, width: 200 }} source={require('@/assets/images/Logo.png')} />

                <View style={{ flexDirection: 'row', gap: 30 }}>
                    <Link href='/(veiculos)'>
                        <TouchableOpacity>
                            <Title> Veículos </Title>   
                        </TouchableOpacity> 
                    </Link>

                    <Link href='/(pagamento)'>
                        <TouchableOpacity>
                            <Title> Comprovante </Title>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Title> Ajuda </Title>
                    </TouchableOpacity>
                </View>

                <Link href='/(Alogin)'>
                    <Icon
                        name='account-circle'
                        type='material'
                        color='#00b4d8'
                        size={50}
                    />
                </Link>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <ModalContainer>
                        <ModalContent>
                            <Text style={{ fontSize: 18, marginBottom: 15 }}> Precisa de ajuda?</Text>
                            
                            <Text style={{ fontSize: 14, marginBottom: 15 }} >
                            Nosso objetivo é simplificar o processo de estacionamento na Zona Azul, 
                            ajudando você a estacionar seu carro de forma prática. 
                            Aqui, você encontrará informações sobre como utilizar a Zona Azul, segue o passo a passo abaixo: 
                            </Text>    
                            <Text style={{ fontSize: 14, marginBottom: 15 }}>
                            Passo 1: Após fazer o login, na página inicial, clique na opção "veículos" e coloque as informações pedidas.
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 15 }}>
                            Passo 2: Depois de enviar as informações você será redirecionado para o comprovante dos seus dados.
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 15 }}>
                                Agora é só aproveitar o seu passeio! Queremos garantir que seja o mais fácil possível, 
                                evitando multas e facilitando o planejamento da sua estadia. 
                            </Text>

                            
                            <CloseButton onPress={() => setModalVisible(false)}>
                                <ButtonText>Fechar</ButtonText>
                            </CloseButton>
                        </ModalContent>
                    </ModalContainer>
                </Modal>
            </Container>   
        </ThemeProvider>
    );
}

const Container = styled.View`
    height: 8rem;
    flex-direction: row;    
    align-items: center;
    justify-content: space-around;
    background-color: ${({ theme }) => theme.COLORS.BLUE_800};
`;

const Title = styled.Text`
    font-size: 20px;
    color: ${({ theme }) => theme.COLORS.WHITE};
`;

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
    width: 600px;
    height: 400px; 
    padding: 20px;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 10px;
    align-items: center;
`;

const CloseButton = styled(TouchableOpacity)`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.COLORS.BLUE_800};
    border-radius: 5px;
`;

const ButtonText = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 16px;
`;
