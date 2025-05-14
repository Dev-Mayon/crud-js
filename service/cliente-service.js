const listaClientes = () => {
    return fetch('http://localhost:3000/profile')
      .then(resposta => resposta.json());
  };
  
  const criaCliente = (nome, email) => {
    return fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email })
    })
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error('Erro ao criar cliente');
      }
      return resposta.json();
    });
  };
  
  const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
      method: 'DELETE'
    })
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error('Erro ao remover cliente');
      }
      return resposta;
    });
  };
  
  const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`)
      .then(resposta => {
        if (!resposta.ok) {
          throw new Error('Erro ao buscar cliente');
        }
        return resposta.json();
      });
  };
  
  const atualizaCliente = (id, nome, email) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email })
    })
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error('Erro ao atualizar cliente');
      }
      return resposta.json();
    });
  };
  
  export const clienteService = {
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
  };
  
  

