const API_TRANSACOES = "http://localhost:8080/transacoes";
const API_CATEGORIAS = "http://localhost:8080/categorias";


async function criarTransacao() {

    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;

    const transacao = { descricao, valor, tipo };

    await fetch(API_TRANSACOES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transacao)
    });

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";

}

async function carregarTransacoes() {

    const response = await fetch(API_TRANSACOES);
    const transacoes = await response.json();

    const lista = document.getElementById("listaTransacoes");
    lista.innerHTML = "";

    transacoes.forEach(transacao => {
        lista.innerHTML += `
            <li>
                ${transacao.id}
                - ${transacao.descricao}
                - R$ ${transacao.valor}
                - ${transacao.tipo}
                <button onclick="abrirModalEdicao(${transacao.id}, '${transacao.descricao}', ${transacao.valor}, '${transacao.tipo}')">
                    Editar
                </button>
            </li>
        `;
    });
}

async function carregarCategorias() {

    const response = await fetch(API_CATEGORIAS);

    const categorias = await response.json();

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    categorias.forEach(categoria => {

        lista.innerHTML += `
            <li>
                ${categoria.id}
                - ${categoria.nome}
                - ${categoria.icone}
            </li>
        `;
    });
}

async function criarCategoria() {

    const nome = document.getElementById("nome").value;
    const icone = document.getElementById("icone").value;

    const categoria = {
        nome: nome,
        icone: icone
    };

    await fetch(
        API_CATEGORIAS,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoria)
        }
    );


    document.getElementById("nome").value = "";
    document.getElementById("icone").value = "";
}

function abrirModalEdicao(id, descricao, valor, tipo) {
    document.getElementById("editId").value = id;
    document.getElementById("editDescricao").value = descricao;
    document.getElementById("editValor").value = valor;
    document.getElementById("editTipo").value = tipo;

    document.getElementById("modalEdicao").style.display = "block";
}

function fecharModal() {
    document.getElementById("modalEdicao").style.display = "none";
}

async function salvarEdicaoTransacao() {

    const id = document.getElementById("editId").value;
    const descricao = document.getElementById("editDescricao").value;
    const valor = parseFloat(document.getElementById("editValor").value);
    const tipo = document.getElementById("editTipo").value;

    const transacao = { descricao, valor, tipo };

    await fetch(`${API_TRANSACOES}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transacao)
    });

    fecharModal();
}

window.onload = function () {};