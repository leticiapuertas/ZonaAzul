import React, { useEffect, useState } from 'react';
import styled from "styled-components/native"; 
import { apiConfig } from '../../Api/axios';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; 
import { styles } from '../(veiculos)';

type Comprovante = {
    ID: number,
    veiculo: string,
    telefone: string,
    tempo_horas: string
};

export default function Comprovante() {
    const [dados, setDados] = useState<Comprovante[]>([]);
    const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a busca
    const [filteredData, setFilteredData] = useState<Comprovante[]>([]); // Tipo Comprovante[]
    const [VeiculoData, setVeiculoData] = useState<{ [key: string]: Comprovante }>({});

    useEffect(() => {
        async function fetchSinonimos() {
            try {
                const response = await apiConfig.get('/visualizar');
                console.log('Dados de Veiculo:', response.data);
                setVeiculoData(response.data);
            } catch (error) {
                console.error('Erro ao buscar comprovantes:', error);
            }
        }
        fetchSinonimos();
    }, []);
    
    useEffect(() => {
        async function fetchComprovante() {
            try {
                const response = await apiConfig.get('/comprovante');
                console.log('Dados de Comprovante:', response.data); 
                setDados(response.data);
                setFilteredData(response.data); // Inicializa filteredData com todos os dados
            } catch (error) {
                console.error('Erro ao buscar comprovante:', error);
            }
        }
        fetchComprovante();
    }, []);

   useEffect(() => {
    if (searchQuery) {
        const filtered = dados.filter(item => 
            item.veiculo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.telefone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.tempo_horas && item.tempo_horas.toString().toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredData(filtered);
    } else {
        setFilteredData(dados); // Mostra tudo se não houver busca
    }
}, [searchQuery, dados]);

    return (
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center', backgroundColor:'#1a212a'}} >
            <InputContainer>
                <Inputizin 
                    placeholder='Pesquisar'
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    style={{color:'#5b5656cc'}} 
                />
                <MaterialIcons name="search" size={24} color="#fff" style={{marginTop:-13, padding:10}}/>
            </InputContainer>
            
            <ContentContainer>
                <FlatList
                    data={filteredData} // Dados filtrados pela pesquisa
                    keyExtractor={(item) => item.ID.toString()} // A chave é o ID do comprovante
                    renderItem={({ item }) => (
                        <Card>
                            <TestezinList>
                                <TestezinItem>{item.veiculo}</TestezinItem>
                                <TestezinItem>{item.telefone}</TestezinItem>
                                <TestezinItem>{item.tempo_horas}</TestezinItem>
                            </TestezinList>
                        </Card>
                    )}
                />
            </ContentContainer>

            <Link href='/(inicial)' asChild>    
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Página inicial</Text>
                </TouchableOpacity>
            </Link> 
        </View>
    );
}

const TestezinList = styled.View`
    margin-top: 10px;
    padding: 5px;
`;

const TestezinItem = styled.Text`
    font-size: 16px;
    text-align: center;
    color: #555;
`;

const Card = styled.View`
    background-color: white;
    border-radius: 8px;
    margin: 10px;
    padding: 10px;
    width: 370px; 
`;

const Inputizin = styled.TextInput`
    font-size: 20px;
    background-color: #dcdcdc;
    width: 250px;
    height: 40px;
    border-radius: 30px;
    padding: 10px;
    margin-bottom: 20px;
`;

const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 25px;
`;

const ContentContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
`;
