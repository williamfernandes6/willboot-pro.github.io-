function comprar(plano) {
    const instrucoes = document.getElementById("instrucoes");
    let preco = { diario: "1.000 Kz", semanal: "7.000 Kz", mensal: "15.000 Kz" }[plano];
    instrucoes.innerHTML = `
        <h3>Pagamento via Multicaixa Express</h3>
        <p>Envie ${preco} para:</p>
        <p><strong>Número: 923 000 000<br>Nome: William Fernandes</strong></p>
        <p>Após pagar, envie o comprovativo para <a href="https://wa.me/244923000000" target="_blank">nosso WhatsApp</a></p>
    `;
}
