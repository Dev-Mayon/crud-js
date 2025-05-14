import { clienteService } from "../service/cliente-service.js";

const pegaURL = new URL(window.location);
const id = pegaURL.searchParams.get('id');

const inputNome = document.querySelector('[data-nome]');
const inputEmail = document.querySelector('[data-email]');
const formulario = document.querySelector('[data-form]');

// Preenche os campos do formulário com os dados do cliente
const preencherFormulario = async () => {
  try {
    const dados = await clienteService.detalhaCliente(id);
    inputNome.value = dados.nome;
    inputEmail.value = dados.email;
  } catch (erro) {
    console.error(erro);
    alert("Erro ao carregar dados do cliente");
  }
};

preencherFormulario();

// Envia os dados atualizados no submit
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    await clienteService.atualizaCliente(id, inputNome.value, inputEmail.value);
    window.location.href = "./edicao_concluida.html";
  } catch (erro) {
    console.error(erro);
    alert("Erro ao atualizar cliente");
  }
});

