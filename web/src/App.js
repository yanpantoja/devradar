import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Componente: Função JS que retorna conteúdo HTLM ou CSS ou proprio javascript
// Propriedade: O mesmo que atributo no HTML, atributo style="", por exemplo
// Estado: Informação mantida pelo componente, uma info lida e atualizada pelo proprio componente (Lembrar: Imutabilidade)

// REGRA: Um componente por arquivo
// variavel let != var 
// desestruturação: basicamente pegar um vetor e dividir em variaveis
function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map( dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>

      </main>
    </div>
  );
}

export default App;
