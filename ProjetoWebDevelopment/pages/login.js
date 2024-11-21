document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    try {
        const response = await fetch('/api/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        
        const result = await response.json();
        if (result.success) {
            alert('Usuário logado com sucesso!');
        } else {
            alert('Erro ao logar o usuário: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao logar o usuário');
    }
});
