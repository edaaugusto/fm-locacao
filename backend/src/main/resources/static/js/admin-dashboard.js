// URL Base para garantir funcionamento
const API_URL = '/itens';

async function carregarDashboard() {
    const grid = document.getElementById('gridProdutos');
    const loading = document.getElementById('loading');
    
    try {
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error("Falha ao conectar com o servidor.");

        const itens = await resp.json();
        
        // Remove o loading e limpa o grid
        loading.style.display = 'none';
        grid.innerHTML = '';

        // Atualiza contador
        document.getElementById('contador').innerText = `${itens.length} itens encontrados`;

        if (itens.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#777;">Nenhum item cadastrado. Comece agora!</p>';
            return;
        }

        // Desenha os cards
        itens.forEach(item => {
            // Tratamento de dados (Imagem, Categoria, Tags)
            let img = (item.imagens && item.imagens.length > 0) ? item.imagens[0] : "https://via.placeholder.com/300x200?text=Sem+Foto";
            let cat = item.categoria ? item.categoria.toUpperCase() : "GERAL";
            let tam = item.tamanho || "";
            let mat = item.material || "";

            // Monta as tags HTML se existirem
            let tagsHtml = '';
            if(tam) tagsHtml += `<span class="tag">📏 ${tam}</span>`;
            if(mat) tagsHtml += `<span class="tag">💎 ${mat}</span>`;

            // Cria o HTML do card
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-img-container">
                    <img src="${img}" alt="${item.nome}">
                    <span class="card-cat-badge">${cat}</span>
                </div>
                
                <div class="card-body">
                    <h3 class="card-title">${item.nome}</h3>
                    <div class="card-tags">
                        ${tagsHtml}
                    </div>
                    <p class="card-desc">${item.descricao || 'Sem descrição.'}</p>
                </div>

                <div class="card-actions">
                    <button onclick="irParaEdicao(${item.id})" class="btn-action btn-edit">Editar</button>
                    <button onclick="deletarItem(${item.id}, '${item.nome}')" class="btn-action btn-delete">Excluir</button>
                </div>
            `;
            
            grid.appendChild(card);
        });

    } catch (erro) {
        console.error(erro);
        loading.style.display = 'none';
        grid.innerHTML = `<div class="error-msg">Erro ao carregar dados. Verifique se o servidor Java está rodando.<br><small>${erro.message}</small></div>`;
    }
}

// Redireciona para o cadastro.html com o ID
function irParaEdicao(id) {
    window.location.href = `cadastro.html?id=${id}`;
}

// Deleta o item
async function deletarItem(id, nome) {
    if(confirm(`Tem certeza que deseja apagar "${nome}"?`)) {
        try {
            const resp = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (resp.ok) {
                carregarDashboard(); // Recarrega a tela
            } else {
                alert('Não foi possível excluir.');
            }
        } catch (e) {
            alert('Erro de conexão.');
        }
    }
}

// Inicia
document.addEventListener('DOMContentLoaded', carregarDashboard);