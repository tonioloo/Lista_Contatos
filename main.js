let lista = localStorage.getItem("minhaLista");
const formulario = document.querySelector("form");
const ulProduto = document.querySelector("ul");

if(lista) {
  lista = JSON.parse(lista);
} else {
  lista = [];
}

listar();

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  let novoProduto = new Object();
  novoProduto.ip = this.ip.value;
  novoProduto.tipo = this.tipo.value;
  novoProduto.manutencao = this.manutencao.value;
  novoProduto.local = this.local.value;
  if (this.id.value !=="" && this.id.value >=0) {
    lista[this.id.value] = novoProduto;
  } else {
    lista.push(novoProduto);
  }

  this.reset();
  this.id.value = null;

  salvarLS();

  listar();
})

function listar(filtro='') {
  ulProduto.innerHTML = "";
  lista.forEach((item,key) => {

    if (item.ip.toUpperCase().indexOf(filtro.toUpperCase()) >=0 || filtro == "") {
    linha = document.createElement('li');
    
    let s = `<button onClick="excluir(${key})">Excluir</button>
            <button onClick="editar(${key})">Editar</button>`

    linha.innerHTML = "IP: "+ item.ip + "\n Tipo: " + item.tipo + "\n Local: " + item.local + "\n Última manutenção: " + item.manutencao + s;
    ulProduto.appendChild(linha);
    }
  });
}

function excluir(id) {
  formulario.reset();
  lista.splice(id, 1);
  salvarLS();
  listar();
}

function editar(id) {
  formulario.id.value = id;
  formulario.ip.value = lista[id].ip;
  formulario.tipo.value = lista[id].tipo;
  formulario.manutencao.value = lista[id].manutencao;
}

function salvarLS(lista) {
  localStorage.setItem("minhalista", JSON.stringify(lista));
}