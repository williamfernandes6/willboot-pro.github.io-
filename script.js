const backendURL = "https://willboot-backend.william.repl.co"; // substitua pelo seu

async function buscarSinal() {
    const resposta = await fetch(backendURL + "/sinal");
    const dados = await resposta.json();
    document.getElementById("resultado").innerText = "⏫ " + dados.sinal + " (" + dados.confianca + "%)";
    const audio = document.getElementById("alerta-audio");
    audio.play();
}

setInterval(buscarSinal, 15000);
buscarSinal();
