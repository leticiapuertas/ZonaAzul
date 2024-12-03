import express from 'express'
import sql from 'mssql'
import {sqlConfig} from "./database.js"
const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();

const router = express.Router()

router.post('/aluguel', async (req, res)=>{
    try{
        const { veiculo, telefone, tempo_horas } = req.body
        const valor_pago = tempo_horas * 5//exemplo de valor fixo por hr
        await pool.query`insert into Aluguel values(${veiculo}, ${valor_pago}, ${telefone}, ${tempo_horas})`
        return res.status(200).json('Novo adicionado')
    }
    catch(error){
        return res.status(500).json('Erro ao cadastrar')
    }
})

router.get('/visualizar', async (req, res) => {
    try {
        const result = await pool.query`
        SELECT TOP(1) Aluguel.veiculo, Aluguel.telefone, Entrada_veiculos.placa, Aluguel.tempo_horas from Aluguel
        inner join Entrada_veiculos
        on Entrada_veiculos.id = Aluguel.ID
        ORDER BY Entrada_veiculos.id DESC`;
        return res.status(200).json(result.recordset);
    } catch (error) {
        return res.status(500).json('Erro ao buscar dados');
    }
});

router.post('/login', async (req, res)=>{
    try {
        const { nome, senha } = req.body;
        if(nome != null && nome != "" && senha != null && senha != "")
        {
            const { recordset } = await pool.query`SELECT id FROM Usuario WHERE nome = ${nome} AND senha = ${senha}`;
            if(recordset.length == 0)
            {
                return res.status(401).json('usuario ou senha incorreta')
            }

            return res.status(200).json(recordset)
        }
            return res.status(400).json("bad request")

    } 
    catch (error){
        console.log(error)
        return res.status(500).json('Error on server!')
    }
})

router.get('/comprovante', async (req, res) => {//selecionar todas as palavras e seus sinonimos
    try {

        const { recordset } = await pool.query`SELECT * FROM Aluguel order by ID desc;`;

        // let comprovantebusca = {};
        // const veiculo = recordset;

        // let x = 0;  // inicialize o contador x
        // let anterior = "";

        // for (let i = 0; i < veiculo.length; i++) {

        //     if (veiculo[i].veiculo !== anterior) {
        //         x++;

        //         // Inicialize o objeto da palavra
        //         comprovantebusca[veiculo[i].veiculo] = {
        //             comprovantebusca: [veiculo[i].comprovantebusca] // adicione o primeiro sinônimo
        //         };
        //     } else {
        //         // Adicione o sinônimo à lista de sinônimos já existente
        //         comprovantebusca[veiculo[i].veiculo].comprovantebusca.push(veiculo[i].comprovantebusca);
        //     }

        //     anterior = veiculo[i].veiculo;
        // }
        console.log(recordset)
        return res.status(200).json(recordset);

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar os comprovantes.' });
    }
});


export default router