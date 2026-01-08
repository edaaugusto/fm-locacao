// --- CONFIGURAÇÃO GLOBAL ---
let fotosEmBase64 = []; // Armazena as fotos como TEXTO para enviar pro Java
let slideIndex = 0;

// --- FUNÇÕES UTILITÁRIAS ---
function padronizarInput(elemento) {
    let valor = elemento.value.replace(/[0-9]/g, ''); // Tira números
    let palavras = valor.split(' ');
    for (let i = 0; i < palavras.length; i++) {
        if (palavras[i].length > 0) {
            palavras[i] = palavras[i].charAt(0).toUpperCase() + palavras[i].slice(1).toLowerCase();
        }
    }
    elemento.value = palavras.join(' ');
}

// --- WIZARD NAVIGATION ---
function nextStep(step) {
    if (step === 2 && !document.getElementById('inputNomeStep1').value.trim()) return alert("Digite o nome.");
    if (step === 3 && !document.getElementById('inputCategoriaStep2').value) return alert("Selecione a categoria.");
    if (step === 4) {
        if (!document.getElementById('inputMaterialStep3').value) return alert("Selecione o material.");
        // Preenche a tela final
        document.getElementById('nomeFinal').value = document.getElementById('inputNomeStep1').value;
        document.getElementById('categoriaFinal').value = document.getElementById('inputCategoriaStep2').value;
        document.getElementById('materialFinal').value = document.getElementById('inputMaterialStep3').value;
        document.getElementById('mainContainer').classList.add('final-mode');
        mudarCampos();
        gerarPrevia();
    }
    mostrarEtapa(step);
}

function prevStep(step) {
    if (step < 4) document.getElementById('mainContainer').classList.remove('final-mode');
    mostrarEtapa(step);
}

function mostrarEtapa(step) {
    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    document.getElementById('progressFill').style.width = `${(step / 4) * 100}%`;
}

// --- LÓGICA DE FOTOS (COM CONVERSÃO BASE64) ---
function processarFotos(input) {
    const arquivos = Array.from(input.files);
    if (fotosEmBase64.length + arquivos.length > 6) return alert("Limite de 6 fotos!");

    arquivos.forEach(arquivo => {
        const reader = new FileReader();
        reader.onload = function(e) {
            fotosEmBase64.push(e.target.result); // Salva a String Base64
            atualizarListaFotos();
            gerarPrevia();
        };
        reader.readAsDataURL(arquivo); // Converte arquivo para texto
    });
}

function atualizarListaFotos() {
    const container = document.getElementById('listaFotos');
    container.innerHTML = '';
    fotosEmBase64.forEach((base64, index) => {
        const div = document.createElement('div');
        div.className = 'thumb-wrapper';
        div.innerHTML = `<img src="${base64}" class="thumb-img"><div class="thumb-remove" onclick="removerFoto(${index})">X</div>`;
        container.appendChild(div);
    });
}

function removerFoto(index) {
    fotosEmBase64.splice(index, 1);
    atualizarListaFotos();
    gerarPrevia();
}

// --- LÓGICA DE CAMPOS DINÂMICOS ---
function toggleMedidas() {
    const check = document.getElementById('usarMedidas');
    const cont = document.getElementById('containerDinamico');
    if(check.checked) { cont.classList.remove('escondido'); mudarCampos(); } 
    else { cont.classList.add('escondido'); }
}

function mudarCampos() {
    const cat = document.getElementById('categoriaFinal').value;
    const cont = document.getElementById('containerDinamico');
    if(cont.classList.contains('escondido')) return;
    cont.innerHTML = '';

    if (['Mesas', 'Tendas', 'Aparadores', 'Toalhas'].includes(cat) || cat === 'Têxtil') {
        cont.innerHTML = `
            <label class="label">Dimensões</label>
            <div style="display:flex; gap:5px; align-items:center;">
                <input type="number" id="medida1" class="input" placeholder="Comp." oninput="gerarPrevia()">
                <span style="font-weight:bold; color:#666">x</span>
                <input type="number" id="medida2" class="input" placeholder="Larg." oninput="gerarPrevia()">
                <span style="font-weight:bold; color:#666">m</span>
            </div>`;
    } else if (['Louças', 'Talheres', 'Copos e Taças'].includes(cat)) {
        cont.innerHTML = `
            <label class="label">Tipo</label>
            <select id="tipoUtensilio" class="input" onchange="gerarPrevia()">
                <option value="Jantar">Jantar</option><option value="Sobremesa">Sobremesa</option><option value="Café">Café</option>
            </select>`;
    } else if (['Vasilhames'].includes(cat)) {
        cont.innerHTML = `
            <label class="label">Capacidade</label>
            <div style="display:flex; gap:5px; align-items:center;">
                <input type="number" id="litragem" class="input" placeholder="0" oninput="gerarPrevia()">
                <span style="font-weight:bold; color:#666">L</span>
            </div>`;
    } else {
        cont.innerHTML = `<label class="label">Detalhe</label><input type="text" id="textoLivre" class="input" placeholder="Detalhe..." oninput="padronizarInput(this); gerarPrevia()">`;
    }
}

function getTextoFormatado() {
    if (!document.getElementById('usarMedidas').checked) return null;
    if (document.getElementById('medida1')) {
        const m1 = document.getElementById('medida1').value;
        const m2 = document.getElementById('medida2').value;
        return (m1 && m2) ? `${m1}x${m2}m` : null;
    }
    if (document.getElementById('tipoUtensilio')) return document.getElementById('tipoUtensilio').value;
    if (document.getElementById('litragem')) return document.getElementById('litragem').value ? `${document.getElementById('litragem').value} L` : null;
    if (document.getElementById('textoLivre')) return document.getElementById('textoLivre').value || null;
    return null;
}

// --- PRÉVIA E CARROSSEL ---
function gerarPrevia() {
    const nome = document.getElementById('nomeFinal').value || "Nome";
    const cat = document.getElementById('categoriaFinal').value.toUpperCase();
    const material = document.getElementById('materialFinal').value;
    const desc = document.getElementById('descricao').value;
    const tamanho = getTextoFormatado();

    // Carrossel
    let htmlFotos = '';
    if (fotosEmBase64.length === 0) {
        htmlFotos = `<img src="https://via.placeholder.com/300x200?text=Sem+Foto" class="carousel-img active">`;
    } else {
        fotosEmBase64.forEach((url, i) => {
            htmlFotos += `<img src="${url}" class="carousel-img ${i===0?'active':''}">`;
        });
        if (fotosEmBase64.length > 1) {
            htmlFotos += `
                <button class="carousel-btn prev" onclick="mudarSlide(-1)">❮</button>
                <button class="carousel-btn next" onclick="mudarSlide(1)">❯</button>
                <div class="carousel-dots">${fotosEmBase64.map((_, i) => `<span class="dot ${i===0?'active':''}"></span>`).join('')}</div>`;
            slideIndex = 0;
        }
    }

    // Etiquetas
    let tags = '';
    if (tamanho) tags += `<span class="tag-spec tag-tamanho">📏 ${tamanho}</span>`;
    if (material) tags += `<span class="tag-spec tag-material">💎 ${material}</span>`;

    document.getElementById('cardPreview').innerHTML = `
        <div class="card-img-wrapper">${htmlFotos}<span class="tag-diaria">${cat}</span></div>
        <div class="card-corpo">
            <h3 class="card-titulo">${nome}</h3>
            <div class="specs-container">${tags}</div>
            <p class="card-descricao">${desc}</p>
            <div class="btn-fake">Reservar no WhatsApp</div>
        </div>
    `;
}

function mudarSlide(n) {
    const slides = document.querySelectorAll('.carousel-img');
    const dots = document.querySelectorAll('.dot');
    if(!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

// --- SALVAR NO JAVA (A Hora da Verdade) ---
document.getElementById('formFinal').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Monta o objeto para enviar
    const item = {
        nome: document.getElementById('nomeFinal').value,
        categoria: document.getElementById('categoriaFinal').value,
        material: document.getElementById('materialFinal').value,
        tamanho: getTextoFormatado(),
        descricao: document.getElementById('descricao').value,
        imagens: fotosEmBase64, // Envia a lista de Strings Base64
        disponivel: true
    };

    try {
        const resp = await fetch('/itens', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        });

        if(resp.ok) {
            alert('✅ Produto Cadastrado com Sucesso!');
            window.location.reload(); // Recarrega para limpar tudo
        } else {
            alert('Erro ao salvar. Tente imagens menores.');
        }
    } catch (erro) {
        console.error(erro);
        alert('Erro de conexão.');
    }
});