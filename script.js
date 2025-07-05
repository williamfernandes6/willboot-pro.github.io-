
let contador = 5;
let vipAtivo = false;
let ultimoSinal = "";

function atualizarContador() {
  document.getElementById("contador").innerText = `⏱️ Próximo sinal em: ${contador}s`;
  contador--;
  if (contador < 0) {
    buscarSinal();
    contador = 5;
  }
}

setInterval(atualizarContador, 1000);

function buscarSinal() {
  const casa = document.getElementById("casa-aposta").value;
  fetch(`https://willboot-backend.onrender.com/sinal?casa=${encodeURIComponent(casa)}`)
    .then(res => res.ok ? res.json() : Promise.reject("Erro ao conectar"))
    .then(data => {
      if (!data || !data.sinal || !data.confianca) {
        throw new Error("Dados incompletos da IA");
      }

      if (data.sinal !== ultimoSinal) {
        document.getElementById("painel-sinais").innerText = `🎯 ${data.sinal}`;
        document.getElementById("barra").style.width = `${data.confianca}%`;
        document.getElementById("barra").style.backgroundColor = getCorConfianca(data.confianca);
        document.getElementById("dica-ia").innerText = data.dica || "";
        document.getElementById("historico-sinais").innerHTML += `<div>✅ ${data.sinal}</div>`;
        document.getElementById("alerta").play();
        ultimoSinal = data.sinal;
      }
    })
    .catch((error) => {
      console.warn("Erro ao buscar sinal:", error);
      document.getElementById("painel-sinais").innerText = "⚠️ Erro ao buscar sinal.";
    });
}

function getCorConfianca(valor) {
  if (valor >= 80) return "green";
  if (valor >= 60) return "orange";
  return "red";
}

function loginVIP() {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();
  if (user === "admin" && pass === "1234") {
    vipAtivo = true;
    document.getElementById("vip-status").innerText = "✅ Acesso VIP liberado!";
  } else {
    vipAtivo = false;
    document.getElementById("vip-status").innerText = "❌ Usuário ou senha incorretos.";
  }
}
