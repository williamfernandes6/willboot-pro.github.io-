const API_URL = "https://willbootpro-backend.onrender.com";
let ultimoSinal = "";
let tempoRestante = 10;

function atualizarContador() {
  const contador = document.getElementById("contador");
  contador.innerText = `⏱️ Próximo sinal em: ${tempoRestante}s`;
  tempoRestante--;
  if (tempoRestante < 0) tempoRestante = 10;
}
setInterval(atualizarContador, 1000);

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

      document.getElementById("painel-sinais").innerHTML = `
        <div class="${classeVela}">
          <strong>${data.sinal}</strong><br>
          Tipo: ${data.tipo}<br>
          Confiança: ${data.confianca}%<br>
          Hora: ${data.hora}
        </div>
      `;
      document.getElementById("alerta").play();
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
