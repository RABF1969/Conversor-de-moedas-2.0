async function converter() {
    let valorInput = document.getElementById("valor").value;
    let resultado = document.getElementById("resultado");
  
    // Converte para número válido
    let valorEmDolar = parseFloat(valorInput);
  
    if (isNaN(valorEmDolar) || valorEmDolar <= 0) {
      resultado.innerHTML = "❌ Por favor, insira um valor válido!";
      return;
    }
  
    try {
      // Chamada à API para obter a cotação atualizada
      let response = await fetch("https://v6.exchangerate-api.com/v6/ee6651c48964e0be8e1efd98/latest/USD");
      let data = await response.json();
  
      // Obtendo a cotação do dólar para real
      let cotacaoDolar = data.conversion_rates.BRL;
      let valorEmReais = valorEmDolar * cotacaoDolar;
  
      // Exibir o resultado formatado
      resultado.innerHTML = `
        💵 <strong>${valorEmDolar.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong> 
        equivalem a <strong>${valorEmReais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong><br>
        📈 Cotação Atual: <strong>R$${cotacaoDolar.toFixed(2)}</strong>
      `;
    } catch (error) {
      resultado.innerHTML = "⚠️ Erro ao obter a cotação. Tente novamente mais tarde.";
      console.error("Erro ao buscar a cotação:", error);
    }
  }
  
  // Função para limpar os campos
function limpar() {
    document.getElementById("valor").value = ""; // Apaga o input
    document.getElementById("resultado").innerHTML = "O valor em Reais aparecerá aqui"; // Reseta o resultado
  }