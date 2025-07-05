function trocarPlataforma() {
  const plataforma = document.getElementById('plataforma').value;
  carregarSinais(plataforma);
}

function carregarSinais(plataforma) {
  const sinaisContainer = document.getElementById('sinais-container');
  sinaisContainer.innerHTML = "Carregando sinais...";

  fetch(`https://willboot-ai.onrender.com/sinal/${plataforma}`)
    .then(res => res.json())
    .then(data => {
      const usuarioVIP = localStorage.getItem("vip") === "sim";
      sinaisContainer.innerHTML = `
        <p><strong>Plataforma:</strong> ${data.plataforma}</p>
        <p><strong>Horário do sinal:</strong> ${data.hora}</p>
        <p><strong>Nível de confiança:</strong> ${usuarioVIP ? "99%" : data.confianca}</p>
        <p><strong>Estrategia:</strong> ${data.estrategia}</p>
      `;
      tocarAlerta();
    })
    .catch(err => {
      sinaisContainer.innerHTML = "<p>Erro ao buscar sinal. Tente novamente.</p>";
    });
}

function tocarAlerta() {
  const audio = document.getElementById('alerta-audio');
  if (audio) audio.play();
}

document.addEventListener("DOMContentLoaded", () => {
  carregarSinais("elephantbet");
});
