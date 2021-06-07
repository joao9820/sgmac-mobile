import axios from 'axios';

const api = axios.create({
    //Endereço obtido acima do QR code do expo, trocamos a porta pela porta do backend, no caso o node
    //localhost não funcionará, por isso utilizamos o ip da máquina na rede, no dispositivo localhost não funciona
    //prestar atenção no endereço ip da rede, aqui local está ip dinâmico
    baseURL: 'http://192.168.15.5:8000/api'
});

export default api;