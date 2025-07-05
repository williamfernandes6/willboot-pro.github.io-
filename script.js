function trocarPlataforma() {
  const plataforma = document.getElementById('plataforma').value;
  carregarSinais(plataforma);
}

function carregarSinais(plataforma) {
  const sinaisContainer = document.getElementById('sinais-container');
  sinaisContainer.innerHTML = "Buscando sinais da " + plataforma + "...";

  // Simulação de chamada ao backend
  setTimeout(() => {
    const hora = new Date().toLocaleTimeString();
    sinaisContainer.innerHTML = `
      <p><strong>Plataforma:</strong> ${plataforma}</p>
      <p><strong>Horário do sinal:</strong> ${hora}</p>
      <p><strong>Nível de confiança:</strong> 95%</p>
    `;
    tocarAlerta();
  }, 2000);
}

function tocarAlerta() {
  const audio = document.getElementById('alerta-audio');
  if (audio) {
    audio.play();
  }
}

// Carregar sinal inicial
document.addEventListener("DOMContentLoaded", () => {
  carregarSinais("elephantbet");
});
