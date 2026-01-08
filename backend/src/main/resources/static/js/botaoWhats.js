// Função global para chamar no Zap
async function chamarNoZap(nomeProduto) {
    try {
        // 1. Pergunta ao Backend qual é o número atual
        const resposta = await fetch('/config/whatsapp');
        const numeroTelefone = await resposta.text(); // O Java retorna texto puro

        // 2. Monta a mensagem
        const mensagem = `Olá! Vi o item *${nomeProduto}* no site da F M Locação e gostaria de reservar.`;
        
        // 3. Gera o link
        const linkZap = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;
        
        // 4. Abre
        window.open(linkZap, '_blank');

    } catch (erro) {
        console.error("Erro ao buscar número do WhatsApp:", erro);
        alert("Erro ao conectar com o WhatsApp da loja.");
    }
}