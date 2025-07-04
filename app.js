'use strict'; /*MODO ESTRITO, PARA EVITAR ERROS DE SINTAXE */

    const getBanco = () => JSON.parse(localStorage.getItem ('todoList'))?? [];
    const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco)); /*FUNÇÃO PARA SETAR O BANCO NO LOCAL STORAGE, TRANSFORMANDO EM STRING */
    
    
    const criarItem = (tarefa, status, indice) => { /*CRIANDO UM ITEM DENTRO DO DOM, TODA VEZ QUE FOR CHAMADA */
        const item  = document.createElement('label'); /*A CRIAÇÃO DE UM ELEMENTO  */
        item.classList.add('todo__item'); /*METODO : CRIAR CLASSE  */
        item.innerHTML = `
                <input type="checkbox" ${status} data-indice=${indice}>
                <div data-indice=${indice} class="todo__text">${tarefa}</div>
                <input type="button" value="✏️" class="btn-editar" data-indice="${indice}">
                <input type="button" value="x" data-indice=${indice}>    
                `;
        document.getElementById('todoList').appendChild(item);
     }
    const limparTarefas = () => {
        const todoList = document.getElementById('todoList'); /*PEGA O ELEMENTO TODO-LIST DO DOM */
        while (todoList.firstChild) { /**REMOVE O FILHO DO TODO-LIST - O ULTIMO NO CASO */
            todoList.removeChild(todoList.lastChild); /*SEMPRE VAI EXCLUIR O ULTIMO FILHO */
        }
    }
    const atualizarTela = () => {
        limparTarefas();
        const banco = getBanco(); /*PEGA O BANCO DO LOCAL STORAGE */
        banco.forEach ((item, indice ) =>  criarItem (item.tarefa, item.status, indice));
        document.getElementById('currentDate').innerHTML = new Date().toLocaleDateString('pt-BR') /*MOSTRA A DATA ATUAL */

    }
    const inserirItem = (evento) => { /*FUNÇÃO PARA INSERIR UM ITEM NO BANCO */
        const tecla = evento.key;
        const texto = evento.target.value;
        if (tecla === 'Enter' ){
            const banco = getBanco(); /*SE A TECLA FOR ENTER E O TEXTO FOR DIFERENTE DE VAZIO */
            banco.push ({'tarefa': texto, 'status': ''});
            setBanco(banco); /*ADICIONA NO BANCO */
            atualizarTela(); /*ATUALIZA A TELA */
            evento.target.value = ''; /*LIMPA O CAMPO DE TEXTO */            
        }
    }
    const removerItem = (indice) => {
        const banco = getBanco(); /*PEGA O BANCO DO LOCAL STORAGE */
        banco.splice (indice, 1); /*REMOVE O ITEM DO BANCO */
        setBanco(banco); /*ATUALIZA O BANCO NO LOCAL STORAGE */
        atualizarTela(); /*ATUALIZA A TELA */        
    }
    const atualizarItem = (indice) => { 
        const banco = getBanco(); /*PEGA O BANCO DO LOCAL STORAGE */
        banco[indice].status = banco[indice].status === '' ? 'checked' : ''; /*VERIFICA SE O STATUS É VAZIO, SE FOR VAZIO, COLOCA CHECKED, SE NÃO, COLOCA VAZIO */
        setBanco(banco); /*ATUALIZA O BANCO NO LOCAL STORAGE */
        atualizarTela(); /*ATUALIZA A TELA */
    }
    const clickItem = (evento) => { /*FUNÇÃO PARA TRATAR O CLICK NO ITEM */
        const elemento = evento.target; /*PEGA O ELEMENTO QUE FOI CLICADO */
        const indice = elemento.dataset.indice; /*PEGA O INDICE DO ELEMENTO CLICADO */
        if (elemento.type === 'button') {
            const indice = elemento.dataset.indice; /*PEGA O INDICE DO ELEMENTO CLICADO */
            removerItem(indice); /*CHAMA A FUNÇÃO PARA REMOVER O ITEM */
        } else if (elemento.type === 'checkbox') {
            const indice = elemento.dataset.indice; /*PEGA O INDICE DO ELEMENTO CLICADO */
            atualizarItem(indice); /*CHAMA A FUNÇÃO PARA ATUALIZAR O ITEM */
         }else if (elemento.type ==='Checkbox') {
            const indice = elemento.dataset.indice; /*PEGA O INDICE DO ELEMENTO CLICADO */
            atualizarItem(indice); /*CHAMA A FUNÇÃO PARA ATUALIZAR O ITEM */
            }
    



document.getElementById('newItem').addEventListener('keypress',inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);    
atualizarTela(); 
// Inicializa a tela com os itens do banco
// Isso garante que a lista seja exibida quando a página for carregada