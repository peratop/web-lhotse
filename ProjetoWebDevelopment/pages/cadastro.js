document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    try {
        const response = await fetch('/api/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });
        
        const result = await response.json();
        if (result.success) {
            alert('Usuário cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar o usuário: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao cadastrar o usuário');
    }
});
