// Função para extrair parâmetros da URL
function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Exibe o nome do produto
const productName = getQueryParameter('produto');
if (productName) {
  document.getElementById('product-name').textContent = decodeURIComponent(productName);
}

// Evento de submissão do formulário para redirecionar para a tela de agradecimento
document.getElementById('purchaseForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  // Redireciona para a página de agradecimento
  window.location.href = 'agradecimento.html';
});
