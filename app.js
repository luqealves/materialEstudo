'use strict'; // MODO ESTRITO

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

// CRIA UM ITEM NA TELA
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('div');
    item.classList.add('d-flex', 'align-items-center', 'border', 'rounded', 'p-2', 'bg-white');

    item.innerHTML = `
        <input type="checkbox" class="form-check-input me-3" ${status} data-indice="${indice}">
        <div data-indice="${indice}" class="todo__text flex-grow-1">${tarefa}</div>
        <button class="btn btn-sm btn-outline-primary me-2 btn-editar" data-indice="${indice}">✏️</button>
        <button class="btn btn-sm btn-outline-danger" data-indice="${indice}">x</button>
    `;

    document.getElementById('todoList').appendChild(item);
}
// LIMPA A LISTA ANTES DE ATUALIZAR
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
};

// ATUALIZA A TELA COM A LISTA ATUAL
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
    document.getElementById('currentDate').innerHTML = new Date().toLocaleDateString('pt-BR');
};

// INSERE NOVO ITEM
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter' && texto.trim() !== '') {
        const banco = getBanco();
        banco.push({ tarefa: texto, status: '' });
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
};

// REMOVE ITEM
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
};

// ATUALIZA STATUS DO ITEM (CHECKBOX)
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
};

// EDITA TEXTO DA TAREFA
const editarItem = (indice) => {
    const banco = getBanco();
    const item = document.querySelectorAll('.todo__item')[indice];
    const textoAtual = banco[indice].tarefa;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = textoAtual;
    input.classList.add('form-control');
    input.style.flex = '1';

    input.addEventListener('keypress', function (evento) {
        if (evento.key === 'Enter' && this.value.trim() !== '') {
            banco[indice].tarefa = this.value.trim();
            setBanco(banco);
            atualizarTela();
        }
    });

    const divTexto = item.querySelector('.todo__text');
    item.replaceChild(input, divTexto);
    input.focus();
};

// LIDA COM CLIQUES NOS ITENS
const clickItem = (evento) => {
    const elemento = evento.target;
    const indice = elemento.dataset.indice;

    if (elemento.type === 'button') {
        if (elemento.classList.contains('btn-editar')) {
            editarItem(indice);
        } else {
            removerItem(indice);
        }
    } else if (elemento.type === 'checkbox') {
        atualizarItem(indice);
    }
};

// EVENTOS
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

// INICIALIZAÇÃO
atualizarTela();
