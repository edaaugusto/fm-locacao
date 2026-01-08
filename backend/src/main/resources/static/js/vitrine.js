async function carregarProdutos() {
    const elementoVitrine = document.getElementById('vitrine');
    
    try {
        const resposta = await fetch('/itens');
        const produtos = await resposta.json();

        elementoVitrine.innerHTML = '';

        if (produtos.length === 0) {
            elementoVitrine.innerHTML = '<p class="aviso-carregando">Nenhum item disponível.</p>';
            return;
        }

        produtos.forEach(produto => {
            const cat = produto.categoria ? produto.categoria.toUpperCase() : "ITEM";
            const tam = produto.tamanho ? produto.tamanho : "";
            const mat = produto.material ? produto.material : "";

            // Lógica para pegar a imagem principal ou gerar carrossel simplificado (só primeira foto por enquanto na vitrine)
            // Se tiver lista de imagens, pega a primeira. Se não, usa placeholder.
            let imgSrc = "https://via.placeholder.com/300x200?text=Sem+Foto";
            if (produto.imagens && produto.imagens.length > 0) {
                imgSrc = produto.imagens[0];
            } else if (produto.imagemUrl) {
                // Compatibilidade com produtos antigos
                imgSrc = produto.imagemUrl;
            }

            // Etiquetas
            let tags = '';
            if(tam) tags += `<span class="tag-spec tag-tamanho">📏 ${tam}</span>`;
            if(mat) tags += `<span class="tag-spec tag-material">💎 ${mat}</span>`;

            const card = `
                <div class="card-produto">
                    <div class="card-img-wrapper">
                        <img src="${imgSrc}" alt="${produto.nome}">
                        <span class="tag-diaria">${cat}</span>
                    </div>
                    
                    <div class="card-corpo">
                        <h3 class="card-titulo">${produto.nome}</h3>
                        <div class="specs-container">${tags}</div>
                        <p class="card-descricao">${produto.descricao}</p>
                        
                        <div class="card-rodape">
                            <button onclick="chamarNoZap('${produto.nome}')" class="btn-reservar" style="width: 100%;">
                                Reservar / Orçamento
                            </button>
                        </div>
                    </div>
                </div>
            `;
            elementoVitrine.innerHTML += card;
        });

    } catch (erro) {
        console.error("Erro:", erro);
        elementoVitrine.innerHTML = '<p class="aviso-carregando" style="color:red">Erro ao carregar.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarProdutos);