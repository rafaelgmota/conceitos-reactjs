import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState([]);

  useEffect(() => {
      api.get('repositories')
    .then(response => { console.log(response); setRepositories(response.data); });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title,
      url,
      techs,
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
            <li key={repository.id}>
              { repository.title }
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>
      <div className="add-form">
        <input placeholder="Título" onChange={(e) => setTitle(e.target.value)}/>
        <input placeholder="url"onChange={(e) => setUrl(e.target.value)}/>
        <input placeholder="Tecnologias" onChange={(e) => setTechs(e.target.value.split(','))}/>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
