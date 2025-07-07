
let historico = [1.8, 2.1, 1.5, 1.3, 3.2, 1.2, 2.7, 1.0, 1.6, 3.0];
let segundos = 5;

function gerarSinalInteligente() {
  const padrao = historico.slice(-5);
  const media = padrao.reduce((a, b) => a + b) / padrao.length;
  let sinal = (media + Math.random() * 1.5).toFixed(2);
  let confianca = Math.min(95, Math.max(70, (media * 30 + Math.random() * 20))).toFixed(1);
  return { sinal, confianca };
}

function atualizarSinal() {
  const novo = gerarSinalInteligente();
  document.getElementById("resultado").innerText = `${novo.sinal}x`;
  document.getElementById("confianca").innerText = `${novo.confianca}%`;
  const agora = new Date();
  document.getElementById("horario").innerText = agora.toLocaleTimeString();
  document.getElementById("countdown").innerText = "00:00:05";
  document.getElementById("alerta-audio").play();
}

setInterval(() => {
  segundos--;
  if (segundos <= 0) {
    atualizarSinal();
    segundos = 5;
  }
  let m = String(Math.floor(segundos / 60)).padStart(2, '0');
  let s = String(segundos % 60).padStart(2, '0');
  document.getElementById("countdown").innerText = `00:${m}:${s}`;
}, 1000);

window.onload = atualizarSinal;
