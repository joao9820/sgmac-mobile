import axios from 'axios';

//Verificar o xampp, php artisan serve e yarn start

const urlIpac = "http://10.1.1.115:8000/api";
const urlLocal = 'http://192.168.15.4:8000/api';

const api = axios.create({
    //Endereço obtido acima do QR code do expo, trocamos a porta pela porta do backend, no caso o node
    //localhost não funcionará, por isso utilizamos o ip da máquina na rede, no dispositivo localhost não funciona
    //prestar atenção no endereço ip da rede, aqui local está ip dinâmico
    baseURL: urlLocal
});

export default api;