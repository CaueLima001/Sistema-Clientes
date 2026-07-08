const form = document.getElementById("loginForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

let email = document.getElementById("email").value;
let senha = document.getElementById("senha").value;

let usuario = JSON.parse(localStorage.getItem("usuario"));

if(usuario && usuario.email == email && usuario.senha == senha){

sessionStorage.setItem("usuarioLogado",usuario.nome);

document.cookie="ultimoLogin="+usuario.nome;

window.location="home.html";

}else{

alert("Email ou senha incorretos!");

}

});

}
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener("submit", function(e){

        e.preventDefault();

        const usuario = {

            nome: document.getElementById("nome").value,

            email: document.getElementById("emailCadastro").value,

            senha: document.getElementById("senhaCadastro").value

        };

        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert("Usuário cadastrado com sucesso!");

        window.location.href = "index.html";

    });

}
const usuario = sessionStorage.getItem("usuarioLogado");
const usuarioMenu = document.getElementById("usuarioMenu");

if (usuarioMenu && usuario) {
    usuarioMenu.textContent = usuario;
}

if(document.getElementById("usuario")){

    if(usuario == null){

        window.location = "index.html";

    }else{

        document.getElementById("usuario").innerHTML =
        "Olá, " + usuario;

    }

}

function sair(){

    sessionStorage.clear();

    window.location = "index.html";

}

let editando = -1;

const clienteForm = document.getElementById("clienteForm");

if(clienteForm){

mostrarClientes();

clienteForm.addEventListener("submit",function(e){

e.preventDefault();

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

document.getElementById("totalClientes").innerHTML = clientes.length;

const cliente = {

    nome: document.getElementById("clienteNome").value,

    telefone: document.getElementById("clienteTelefone").value,

    cidade: document.getElementById("clienteCidade").value

};

if(editando == -1){

    clientes.push(cliente);

}else{

    clientes[editando] = cliente;

    editando = -1;

    document.getElementById("btnSalvar").innerHTML = "Salvar Cliente";

}

localStorage.setItem("clientes", JSON.stringify(clientes)); 

clienteForm.reset();

mostrarClientes();

});

}

function mostrarClientes(){

    let lista = document.getElementById("listaClientes");

    if(!lista) return;

    lista.innerHTML = "";

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    clientes.forEach(function(cliente, index){

        lista.innerHTML += `
        <li class="list-group-item">

            <b>${cliente.nome}</b><br>

            Telefone: ${cliente.telefone}<br>

            Cidade: ${cliente.cidade}<br><br>

            <button class="btn btn-warning btn-sm" onclick="editarCliente(${index})">
  
            Editar

            </button>


            <button class="btn btn-danger btn-sm" onclick="excluirCliente(${index})">
   
            Excluir

            
            </button>

        </li>
        `;

    });

}

function excluirCliente(index){

    if(confirm("Deseja realmente excluir este cliente?")){

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        clientes.splice(index, 1);

        localStorage.setItem("clientes", JSON.stringify(clientes));

        mostrarClientes();

        

        
    }
    

    
}

const telefone = document.getElementById("clienteTelefone");

if (telefone) {

    telefone.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        if (valor.length <= 10) {
            valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        }

        this.value = valor;

    });

}

function editarCliente(index){

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    document.getElementById("clienteNome").value = clientes[index].nome;

    document.getElementById("clienteTelefone").value = clientes[index].telefone;

    document.getElementById("clienteCidade").value = clientes[index].cidade;

    editando = index;

    document.getElementById("btnSalvar").innerHTML = "Atualizar Cliente";

}

function sair(){

    if(confirm("Deseja realmente sair?")){

        sessionStorage.clear();

        window.location = "index.html";

    }

}

function atualizarTotalClientes() {

    const total = document.getElementById("totalClientes");

    if (total) {

        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        total.innerHTML = clientes.length;

    }

}

atualizarTotalClientes();



function mostrarClientes(){

    let lista = document.getElementById("listaClientes");
    if(!lista) return;

    lista.innerHTML = "";

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    const total = document.getElementById("totalClientes");
    if(total){
        total.innerHTML = clientes.length;
    }

    clientes.forEach(function(cliente, index){

        lista.innerHTML += `
        <li class="list-group-item">
            <b>${cliente.nome}</b><br>
            Telefone: ${cliente.telefone}<br>
            Cidade: ${cliente.cidade}<br><br>

            <button class="btn btn-warning btn-sm" onclick="editarCliente(${index})">
                Editar
            </button>

            <button class="btn btn-danger btn-sm" onclick="excluirCliente(${index})">
                Excluir
            </button>
        </li>
        `;
    });

}