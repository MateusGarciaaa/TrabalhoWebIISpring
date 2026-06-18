async function carregarCategorias() {

    const response = await fetch(
        "http://localhost:8080/categorias"
    );

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
        "http://localhost:8080/categorias",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoria)
        }
    );

    carregarCategorias();
}

window.onload = carregarCategorias;