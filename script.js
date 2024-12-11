// Lista para armazenar as garotas (será carregada do LocalStorage)
let garotas = JSON.parse(localStorage.getItem('garotas')) || [];

// Função para adicionar uma garota
function adicionarGarota() {
  const nome = document.getElementById('nome').value.trim();
  const rosto1 = parseFloat(document.getElementById('rosto1').value);
  const corpo1 = parseFloat(document.getElementById('corpo1').value);
  const rosto2 = parseFloat(document.getElementById('rosto2').value);
  const corpo2 = parseFloat(document.getElementById('corpo2').value);

  // Validação dos dados
  if (!nome || isNaN(rosto1) || isNaN(corpo1) || isNaN(rosto2) || isNaN(corpo2)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }
  if ([rosto1, corpo1, rosto2, corpo2].some(nota => nota < 0 || nota > 10)) {
    alert('As notas devem estar entre 0 e 10.');
    return;
  }

  // Calcula o total
  const total = rosto1 + corpo1 + rosto2 + corpo2;

  // Adiciona ao array
  garotas.push({ nome, total });

  // Atualiza o ranking
  atualizarRanking();

  // Exibe mensagem de sucesso
  mostrarMensagem('Garota adicionada com sucesso!');

  // Limpa os campos
  document.getElementById('nome').value = '';
  document.getElementById('rosto1').value = '';
  document.getElementById('corpo1').value = '';
  document.getElementById('rosto2').value = '';
  document.getElementById('corpo2').value = '';

  // Salva os dados no LocalStorage
  salvarNoLocalStorage();
}

// Função para atualizar o ranking
function atualizarRanking() {
  // Ordena as garotas pelo total de pontos
  garotas.sort((a, b) => b.total - a.total);

  // Atualiza o ranking na interface
  const ranking = document.getElementById('ranking');
  ranking.innerHTML = '';
  garotas.forEach((garota, index) => {
    const li = document.createElement('li');
    li.classList.add('ranking-item');

    // Nome da garota
    const nomeSpan = document.createElement('span');
    nomeSpan.textContent = `${index + 1}. ${garota.nome} - ${garota.total} pontos`;
    
    // Botão de exclusão
    const excluirButton = document.createElement('button');
    excluirButton.textContent = 'Excluir';
    excluirButton.classList.add('excluir-btn');
    excluirButton.onclick = () => excluirGarota(index);

    // Adiciona o nome e o botão ao item da lista
    li.appendChild(nomeSpan);
    li.appendChild(excluirButton);
    ranking.appendChild(li);
  });
}

// Função para excluir uma garota do ranking
function excluirGarota(index) {
  // Remove a garota da lista
  garotas.splice(index, 1);

  // Atualiza o ranking
  atualizarRanking();

  // Salva os dados no LocalStorage
  salvarNoLocalStorage();
}

// Função para exibir/ocultar o ranking
function toggleRanking() {
  const ranking = document.getElementById('ranking');
  const button = document.getElementById('toggle-ranking');

  if (ranking.style.display === 'none' || ranking.style.display === '') {
    ranking.style.display = 'block';
    button.textContent = 'Ocultar Ranking';
  } else {
    ranking.style.display = 'none';
    button.textContent = 'Exibir Ranking';
  }
}

// Função para mostrar mensagem temporária
function mostrarMensagem(mensagem) {
  const mensagemDiv = document.getElementById('mensagem');
  mensagemDiv.textContent = mensagem;
  mensagemDiv.style.display = 'block';

  // Esconde a mensagem após 3 segundos
  setTimeout(() => {
    mensagemDiv.style.display = 'none';
  }, 3000);
}

// Função para salvar os dados no LocalStorage
function salvarNoLocalStorage() {
  localStorage.setItem('garotas', JSON.stringify(garotas));
}

// Carrega o ranking do LocalStorage quando a página for carregada
window.onload = function() {
  atualizarRanking();
};
