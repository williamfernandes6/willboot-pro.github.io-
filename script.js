const usuarioCerto = 'willboot';
const senhaCerta = 'willboot2025';

function login() {
  const u = document.getElementById('usuario').value;
  const s = document.getElementById('senha').value;

  if (u === usuarioCerto && s === senhaCerta) {
    localStorage.setItem('logado', 'sim');
    window.location.href = 'painel.html';
  } else {
    document.getElementById('mensagem').innerText = '❌ Usuário ou senha incorretos.';
  }
}

function verificarLogin() {
  const logado = localStorage.getItem('logado');
  if (logado !== 'sim') {
    window.location.href = 'index.html';
  }
}

function buscarSinal() {
  verificarLogin();
  const plataforma = document.getElementById('plataforma').value;
  const sinais = document.getElementById('sinais');

  sinais.innerHTML = `<p>Buscando sinal para ${plataforma}...</p>`;

  fetch('https://willboot-backend.onrender.com/sinal', {
    headers: {
      'Authorization': 'Basic ' + btoa('willboot:willboot2025')
    }
  })
  .then(res => res.json())
  .then(data => {
    sinais.innerHTML = `
      <p><strong>🎯 Sinal ${plataforma}:</strong> ${data.sinal}</p>
      <p><strong>🔥 Confiança:</strong> ${data.confianca}</p>
    `;
    document.getElementById('alerta').play();
  })
  .catch(() => {
    sinais.innerHTML = '<p style="color:red;">Erro ao buscar sinal.</p>';
  });
}

function voltar() {
  localStorage.removeItem('logado');
  window.location.href = 'index.html';
}
