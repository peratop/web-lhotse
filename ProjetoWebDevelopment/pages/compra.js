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
  
  <style>
    
  </style>