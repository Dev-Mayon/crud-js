import { clienteService } from "../service/cliente-service.js";

// Cria uma linha da tabela com os dados do cliente e o id
const criaNovaLinha = (nome, email, id) => {
  const linhaNovoCliente = document.createElement('tr');
  const conteudo = `
    <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
      <ul class="tabela__botoes-controle">
        <li>
          <a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a>
        </li>
        <li>
          <button class="botao-simples botao-simples--excluir" type="button" data-id="${id}">Excluir</button>
        </li>
      </ul>
    </td>`;
  linhaNovoCliente.innerHTML = conteudo;
  return linhaNovoCliente;
};

const tabela = document.querySelector('[data-tabela]');

// Lista os clientes e renderiza na tabela
const renderizaClientes = async () => {
  try {
    const data = await clienteService.listaClientes();
    data.forEach(cliente => {
      tabela.appendChild(criaNovaLinha(cliente.nome, cliente.email, cliente.id));
    });
  } catch (erro) {
    console.error("Erro ao carregar clientes:", erro);
  }
};

renderizaClientes();

// Evento delegado para lidar com clique no botão Excluir
tabela.addEventListener('click', async (evento) => {
  if (evento.target.classList.contains('botao-simples--excluir')) {
    const id = evento.target.dataset.id;

    const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
    if (!confirmar) return;

    try {
      await clienteService.removeCliente(id);
      evento.target.closest('tr').remove(); // remove visualmente a linha
    } catch (erro) {
      console.error("Erro ao excluir cliente:", erro);
      alert("Erro ao excluir cliente. Tente novamente.");
    }
  }
});

