// Simulando um banco de dados local
let epis = JSON.parse(localStorage.getItem('epis')) || [
    { id: 1, nome: 'EPI 1', tipo: 'Tipo A', dataValidade: '2025-12-31', numeroCA: '123456', status: 'Qualificado' },
];

let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [
    { id: 1, nome: 'Funcionário 1', cpf: '123.456.789-00', cargo: 'Cargo A' },
];

let epiEditandoId = null;
let funcionarioEditandoId = null;

// Função para carregar os EPIs na interface
function carregarEpis() {
    const listaEpis = document.querySelector('.epi-list');
    listaEpis.innerHTML = ''; // Limpa a lista para recarregar

    epis.forEach(epi => {
        const div = document.createElement('div');
        div.classList.add('epi-item');
        div.setAttribute('data-id', epi.id);
        div.innerHTML = `
            <div class="item">
            <h3 class="name">${epi.nome}</h3>
            <p class="details">Tipo: ${epi.tipo} - CA: ${epi.numeroCA}<br>Validade: ${epi.dataValidade}<br>Status: ${epi.status}</p>
            <div class="epi-actions">
            <button class="retirar" onclick="redirecionarParaRetirarEpi(${epi.id})">Retirar</button>
            <button class="editar" onclick="redirecionarParaEditarEpi(${epi.id})">Editar</button>
            <button class="remover" onclick="removerEpi(${epi.id})">Remover</button>
            </div>
        `;
        listaEpis.appendChild(div);
    });

    // Atualizar localStorage com a lista atual de EPIs
    localStorage.setItem('epis', JSON.stringify(epis));
}

// Função para redirecionar para a página de edição com o ID do EPI
function redirecionarParaEditarEpi(id) {
    localStorage.setItem('epiEditandoId', id); // Armazenar o ID no localStorage
    window.location.href = 'editarEpi.html';   // Redirecionar para a página de edição
}

function registrarRetirada() {
    const epiId = localStorage.getItem('epiRetirandoId');
    const funcionario = document.getElementById('funcionario').value;
    const dataRetirada = document.getElementById('dataRetirada').value;

    if (epiId && funcionario && dataRetirada) {
        const historico = JSON.parse(localStorage.getItem('historicoRetiradas')) || [];
        historico.push({
            epiId: epiId,
            funcionario: funcionario,
            dataRetirada: dataRetirada
        });

        localStorage.setItem('historicoRetiradas', JSON.stringify(historico));
        alert('Retirada registrada com sucesso!');

        // Redirecionar de volta à página principal
        window.location.href = 'index.html';
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function registrarRetirada() {
    const epiId = localStorage.getItem('epiRetirandoId');
    const funcionario = document.getElementById('funcionario').value;
    const dataRetirada = document.getElementById('dataRetirada').value;

    if (epiId && funcionario && dataRetirada) {
        const historico = JSON.parse(localStorage.getItem('historicoRetiradas')) || [];
        historico.push({
            epiId: epiId,
            funcionario: funcionario,
            dataRetirada: dataRetirada
        });

        localStorage.setItem('historicoRetiradas', JSON.stringify(historico));
        alert('Retirada registrada com sucesso!');

        // Redirecionar de volta à página principal
        window.location.href = 'index.html';
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

// Função para carregar o histórico de retiradas
function carregarHistorico() {
    const historicoList = document.getElementById('historicoList');
    const historico = JSON.parse(localStorage.getItem('historicoRetiradas')) || [];

    historicoList.innerHTML = ''; // Limpa a lista atual

    if (historico.length > 0) {
        historico.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('historico-item');
            div.innerHTML = `
                <span>EPI ID: ${item.epiId}, Funcionário: ${item.funcionario}, Data: ${item.dataRetirada}</span>
            `;
            historicoList.appendChild(div);
        });
    } else {
        historicoList.innerHTML = '<span>Nenhuma retirada registrada.</span>';
    }
}

// Carregar o ID do EPI e o histórico de retiradas na página de retirada
if (window.location.pathname.includes('retirarEpi.html')) {
    const epiId = localStorage.getItem('epiRetirandoId');
    document.getElementById('epiId').value = epiId;
    carregarHistorico(); // Carregar o histórico de retiradas
}



// Função para carregar os dados do EPI na página de edição
function carregarEpiParaEdicao() {
    const id = localStorage.getItem('epiEditandoId');
    const epi = epis.find(e => e.id == id);

    if (epi) {
        document.getElementById('nome').value = epi.nome;
        document.getElementById('tipo').value = epi.tipo; // Adicionando tipo
        document.getElementById('dataValidade').value = epi.dataValidade; // Adicionando data de validade
        document.getElementById('numeroCA').value = epi.numeroCA; // Adicionando número CA
        document.getElementById('status').value = epi.status;
        epiEditandoId = id;
    }
}

// Função para salvar os dados atualizados
function salvarEpi() {
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value; // Capturando tipo
    const dataValidade = document.getElementById('dataValidade').value; // Capturando data de validade
    const numeroCA = document.getElementById('numeroCA').value; // Capturando número CA
    const status = document.getElementById('status').value;

    if (epiEditandoId !== null) {
        // Atualizar o "banco de dados" local
        epis = epis.map(e => {
            if (e.id == epiEditandoId) {
                return { ...e, nome, tipo, dataValidade, numeroCA, status };
            }
            return e;
        });

        // Salvar no localStorage
        localStorage.setItem('epis', JSON.stringify(epis));

        // Limpar o ID do EPI editando
        epiEditandoId = null;

        // Redirecionar de volta à página principal
        window.location.href = 'index.html';
    }
}

// Função para remover um EPI
function removerEpi(id) {
    epis = epis.filter(e => e.id !== id);
    localStorage.setItem('epis', JSON.stringify(epis)); // Atualiza o localStorage após remover
    carregarEpis(); // Atualiza a lista na interface
}

// Função para restaurar os EPIs ao estado inicial
function restaurarEpis() {
    epis = [
        { id: 1, nome: 'EPI 1', tipo: 'Tipo A', dataValidade: '2025-12-31', numeroCA: '123456', status: 'Qualificado' },
    ];
    localStorage.setItem('epis', JSON.stringify(epis));
    carregarEpis(); // Atualiza a lista na interface
}

function redirecionarParaRetirarEpi(id) {
    localStorage.setItem('epiRetirandoId', id); // Armazenar o ID no localStorage
    window.location.href = 'retirarEpi.html';   // Redirecionar para a página de retirada
}

// Função para carregar os Funcionários na interface
function carregarFuncionarios() {
    const listaFuncionarios = document.querySelector('.funcionario-list');
    listaFuncionarios.innerHTML = ''; // Limpa a lista para recarregar

    funcionarios.forEach(funcionario => {
        const div = document.createElement('div');
        div.classList.add('item'); // Adicionando a classe para estilização
        div.setAttribute('data-id', funcionario.id);
        div.innerHTML = `
            <h3 class="name">${funcionario.nome}</h3>
            <p class="details">CPF: ${funcionario.cpf}<br>Cargo: ${funcionario.cargo}</p>
            <div class="funcionario-actions">
            <button class="editar" onclick="redirecionarParaEditarFuncionario(${funcionario.id})">Editar</button>
            <button class="remover" onclick="removerFuncionario(${funcionario.id})">Remover</button>
            </div>
        `;
        listaFuncionarios.appendChild(div);
    });

    // Atualizar localStorage com a lista atual de Funcionários
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
}

// Função para redirecionar para a página de edição com o ID do Funcionário
function redirecionarParaEditarFuncionario(id) {
    localStorage.setItem('funcionarioEditandoId', id); // Armazenar o ID no localStorage
    window.location.href = 'editarFuncionario.html';   // Redirecionar para a página de edição
}

// Função para carregar os dados do Funcionário na página de edição
function carregarFuncionarioParaEdicao() {
    const id = localStorage.getItem('funcionarioEditandoId');
    const funcionario = funcionarios.find(f => f.id == id);

    if (funcionario) {
        document.getElementById('nome').value = funcionario.nome;
        document.getElementById('cpf').value = funcionario.cpf;
        document.getElementById('cargo').value = funcionario.cargo;
        funcionarioEditandoId = id;
    }
}

// Função para salvar os dados atualizados do Funcionário
function salvarFuncionario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const cargo = document.getElementById('cargo').value;

    if (funcionarioEditandoId !== null) {
        // Atualizar o "banco de dados" local
        funcionarios = funcionarios.map(f => {
            if (f.id == funcionarioEditandoId) {
                return { ...f, nome, cpf, cargo };
            }
            return f;
        });

        // Salvar no localStorage
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

        // Limpar o ID do Funcionário editando
        funcionarioEditandoId = null;

        // Redirecionar de volta à página principal
        window.location.href = 'index.html';
    }
}

function removerFuncionario(id) {
    funcionarios = funcionarios.filter(f => f.id !== id);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios)); // Atualiza o localStorage após remover
    carregarFuncionarios(); // Atualiza a lista na interface
}

// Função para restaurar os Funcionários ao estado inicial
function restaurarFuncionarios() {
    funcionarios = [
        { id: 1, nome: 'Funcionário 1', cpf: '123.456.789-00', cargo: 'Cargo A' },
    ];
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    carregarFuncionarios(); // Atualiza a lista na interface
}

// Carregar os EPIs e Funcionários ao abrir a página inicial
if (window.location.pathname.includes('index.html')) {
    carregarEpis();
    carregarFuncionarios();
}

// Carregar os dados do EPI ao abrir a página de edição
if (window.location.pathname.includes('editarEpi.html')) {
    carregarEpiParaEdicao();
}

// Carregar os dados do Funcionário ao abrir a página de edição
if (window.location.pathname.includes('editarFuncionario.html')) {
    carregarFuncionarioParaEdicao();
}


function cadastrarEpi() {
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const dataValidade = document.getElementById('dataValidade').value;
    const numeroCA = document.getElementById('numeroCA').value;
    const status = document.getElementById('status').value;

    // Cria um novo objeto EPI com base nos valores fornecidos
    const novoEpi = {
        nome,
        tipo,
        dataValidade,
        numeroCA,
        status
    };

    // Adiciona o novo EPI à lista existente
    epis.push(novoEpi);

    // Salva a lista atualizada no localStorage
    localStorage.setItem('epis', JSON.stringify(epis));

    // Recarrega a lista de EPIs na interface
    carregarEpis();
}


function cadastrarFuncionario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const cargo = document.getElementById('cargo').value;

    // Cria um novo objeto Funcionário com base nos valores fornecidos
    const novoFuncionario = {
        nome,
        cpf,
        cargo
    };

    // Adiciona o novo Funcionário à lista existente
    funcionarios.push(novoFuncionario);

    // Salva a lista atualizada no localStorage
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    // Recarrega a lista de Funcionários na interface
    carregarFuncionarios();
}

document.getElementById('cadastroFuncionarioBtn').addEventListener('click', function() {
    window.location.href = 'cadastroFuncionario.html'; // Página de cadastro de funcionário
});

// Adicionando evento de clique para redirecionar para a página de informações (index.html)
document.getElementById('cadastroFuncionarioBtn').addEventListener('click', function() {
    window.location.href = 'cadastroFuncionario.html'; // Página de cadastro de funcionário
});