const API_URL = "https://willbootpro-backend.onrender.com";
let ultimoSinal = "";
let tempoRestante = 10;
const historico = [];
const dicas = [
  "🎯 Tendência de vela alta nas próximas rodadas.",
  "⚠️ Três rodadas abaixo de 1.50x — cuidado!",
  "🔥 Padrão de subida detectado!",
  "💡 Use entrada segura após 2 rodadas baixas."
];

function atualizarContador() {
  const contador = document.getElementById("contador");
  contador.innerText = `⏱️ Próximo sinal em: ${tempoRestante}s`;
  tempoRestante--;
  if (tempoRestante < 0) tempoRestante = 10;
}
setInterval(atualizarContador, 1000);

function mostrarDica() {
  const dica = dicas[Math.floor(Math.random() * dicas.length)];
  document.getElementById("dica-ia").innerText = dica;
}

function atualizarHistorico(novo) {
  historico.unshift(novo);
  if (historico.length > 10) historico.pop();
  document.getElementById("historico-sinais").innerHTML = historico.map((s, i) =>
    `<div style="opacity:${1 - i * 0.1};">${s}</div>`).join("");
}

async function buscarSinal() {
  const casa = document.getElementById("casa-aposta").value;
  try {
    const res = await fetch(`${API_URL}/sinais?casa=${casa}`);
    const data = await res.json();
    if (data.sinal && data.sinal !== ultimoSinal) {
      ultimoSinal = data.sinal;
      let classeVela = "";
      if (data.tipo.includes("🔥")) classeVela = "vela-muito-alta";
      else if (data.tipo.includes("🔴")) classeVela = "vela-alta";
      else if (data.tipo.includes("🟡")) classeVela = "vela-2x";
      else classeVela = "vela-fraca";

      const painel = document.getElementById("painel-sinais");
      painel.innerHTML = `
        <div class="${classeVela}">
          <strong>${data.sinal}</strong><br>
          Tipo: ${data.tipo}<br>
          Confiança: ${data.confianca}%<br>
          Hora: ${data.hora}
        </div>
      `;
      painel.classList.add("vibrar");
      setTimeout(() => painel.classList.remove("vibrar"), 300);

      const barra = document.getElementById("barra");
      barra.style.width = `${data.confianca}%`;
      barra.style.background = data.confianca >= 80 ? "#0f0" :
                               data.confianca >= 60 ? "#ff0" : "#f00";

      document.getElementById("alerta").play();
      atualizarHistorico(`${data.sinal} - ${data.tipo}`);
      mostrarDica();
      tempoRestante = 10;
    }
  } catch {
    document.getElementById("painel-sinais").innerText = "Erro ao buscar sinal.";
  }
}
setInterval(buscarSinal, 5000);

async function loginVIP() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });
    const data = await res.json();
    document.getElementById("vip-status").innerText = data.status;
  } catch {
    document.getElementById("vip-status").innerText = "Erro no login.";
  }
  }
