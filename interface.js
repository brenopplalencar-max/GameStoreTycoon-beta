// ============================================
// 🎨 INTERFACE E RENDERIZAÇÃO
// ============================================

let currentTab = 'free';
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// ============================================
// 🔊 SISTEMA DE SONS
// ============================================

function playPlin() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(1300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.2);
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);

    setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.frequency.setValueAtTime(1600, audioCtx.currentTime);
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.3);
    }, 80);
}

function playError() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.type = 'sawtooth';
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}

function playSuccess() {
    initAudio();
    [0, 100, 200, 300].forEach((delay, i) => {
        setTimeout(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(400 + i * 150, audioCtx.currentTime);
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.2);
        }, delay);
    });
}

function playRebirth() {
    initAudio();
    [0, 150, 300, 450, 600].forEach((delay, i) => {
        setTimeout(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(300 + i * 200, audioCtx.currentTime);
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        }, delay);
    });
}

// ============================================
// 📊 ATUALIZAÇÃO DA UI
// ============================================

function updateUI() {
    document.getElementById('balance').textContent = formatNumber(state.balance);
    document.getElementById('gamesOwned').textContent = state.owned.length;
    document.getElementById('companiesOwned').textContent = state.ownedCompanies.length;
    document.getElementById('createdGames').textContent = state.createdGames.length;
    document.getElementById('devsOwned').textContent = ownedDevs.length;
    document.getElementById('rebirthCount').textContent = state.rebirths;

    const gIncome = calcGamesIncome();
    const cIncome = calcCompaniesIncome();
    const myIncome = calcMyGamesIncome();
    const total = gIncome + cIncome + myIncome;
    const multiplier = calcTotalMultiplier();

    document.getElementById('gamesIncome').textContent = formatNumber(gIncome);
    document.getElementById('companiesIncome').textContent = formatNumber(cIncome);
    document.getElementById('myGamesIncome').textContent = formatNumber(myIncome);
    document.getElementById('totalIncome').textContent = formatNumber(total);
    document.getElementById('totalEarned').textContent = formatNumber(state.totalEarned);
    document.getElementById('multiplier').textContent = (multiplier * 100).toFixed(0) + '%';

    // Atualizar barra de rebirth
    updateRebirthProgress();
}

function updateRebirthProgress() {
    const requirement = getNextRebirthRequirement();
    const progress = Math.min((state.balance / requirement) * 100, 100);
    
    document.getElementById('rebirthProgress').style.width = progress + '%';
    document.getElementById('rebirthRequirement').textContent = formatNumber(requirement);
    
    const rebirthBtn = document.getElementById('rebirthBtn');
    if (canRebirth()) {
        rebirthBtn.disabled = false;
        rebirthBtn.classList.add('ready');
    } else {
        rebirthBtn.disabled = true;
        rebirthBtn.classList.remove('ready');
    }
}

// ============================================
// 🎴 CRIAÇÃO DE CARDS
// ============================================

function createCard(item, isOwned) {
    const card = document.createElement('div');
    const isEmpresa = item.type === 'empresa';
    card.className = `card ${isEmpresa ? 'empresa-card' : ''} ${isOwned ? 'owned' : ''}`;

    const priceText = item.price === 0 ? 'GRÁTIS' : `R$ ${formatNumber(item.price)}`;
    const btnText = isOwned ? '✓ Adquirido' : (item.price === 0 ? '📥 Baixar' : '🛒 Comprar');
    const btnClass = isOwned ? 'card-btn owned-btn' : 'card-btn';

    card.innerHTML = `
        ${item.discount ? `<div class="discount">${item.discount}</div>` : ''}
        <div class="${isEmpresa ? 'empresa-icon' : 'card-icon'}">${item.icon}</div>
        <div class="card-name">${item.name}</div>
        <div class="card-genre">${item.genre}</div>
        <div class="card-income">+R$ ${item.income.toFixed(2)}/s</div>
        <div class="card-price ${item.price === 0 ? 'free' : ''}">${priceText}</div>
        <button class="${btnClass}" ${isOwned ? 'disabled' : ''} onclick="handleBuy(${item.id})">${btnText}</button>
    `;

    return card;
}

function createDevCard(dev, isOwned) {
    const card = document.createElement('div');
    card.className = `card dev-card ${isOwned ? 'owned' : ''}`;

    const bonusPercent = (dev.bonus * 100).toFixed(0);
    const btnText = isOwned ? '✓ Contratado' : '👔 Contratar';
    const btnClass = isOwned ? 'card-btn owned-btn' : 'card-btn';

    card.innerHTML = `
        <div class="card-icon">${dev.icon}</div>
        <div class="card-name">${dev.name}</div>
        <div class="card-genre">${dev.skill}</div>
        <div class="card-bonus">+${bonusPercent}% Renda</div>
        <div class="card-price">R$ ${formatNumber(dev.price)}</div>
        <button class="${btnClass}" ${isOwned ? 'disabled' : ''} onclick="handleBuyDev(${dev.id})">${btnText}</button>
    `;

    return card;
}

function createMyGameCard(game) {
    const levelData = gameLevels[game.level - 1];
    const nextLevel = gameLevels[game.level];
    const card = document.createElement('div');
    card.className = 'card meu-jogo-card owned';

    let upgradeBtn = '';
    if (nextLevel) {
        upgradeBtn = `<button class="card-btn upgrade-btn" onclick="handleUpgrade(${game.id})">⬆️ Upgrade (R$ ${formatNumber(nextLevel.upgradeCost)})</button>`;
    } else {
        upgradeBtn = `<button class="card-btn owned-btn" disabled>🏆 Nível Máximo</button>`;
    }

    card.innerHTML = `
        <div class="level-badge">Nv. ${game.level}</div>
        <div class="card-icon">${game.icon}</div>
        <div class="card-name">${game.name}</div>
        <div class="card-genre">${game.genre}</div>
        <div class="card-income">+R$ ${levelData.income.toFixed(2)}/s</div>
        <div class="card-price">Criado por você!</div>
        ${upgradeBtn}
    `;

    return card;
}

// ============================================
// 📋 RENDERIZAÇÃO DO GRID
// ============================================

function renderGrid(tab) {
    const grid = document.getElementById('grid');
    const criarSection = document.getElementById('criarSection');
    const rebirthSection = document.getElementById('rebirthSection');

    grid.innerHTML = '';
    criarSection.style.display = 'none';
    rebirthSection.style.display = 'none';

    // Seção de Devs
    if (tab === 'devs-cheap' || tab === 'devs-medium' || tab === 'devs-expensive' || tab === 'devs-premium') {
        grid.style.display = 'grid';
        const devCategory = tab.replace('devs-', '');
        const devList = devs[devCategory] || [];
        devList.forEach(dev => {
            const isOwned = isDevOwned(dev.id);
            grid.appendChild(createDevCard(dev, isOwned));
        });
        return;
    }

    // Seção de Criar Jogo
    if (tab === 'criar') {
        criarSection.style.display = 'block';
        grid.style.display = 'none';
        renderMyGames();
        return;
    }

    // Seção de Rebirth
    if (tab === 'rebirth') {
        rebirthSection.style.display = 'block';
        grid.style.display = 'none';
        updateRebirthProgress();
        return;
    }

    // Biblioteca
    if (tab === 'biblioteca') {
        grid.style.display = 'grid';
        const all = [...state.owned, ...state.ownedCompanies];
        if (all.length === 0 && state.createdGames.length === 0 && ownedDevs.length === 0) {
            grid.innerHTML = '<div class="empty"><div class="icon">📚</div><h3>Biblioteca vazia!</h3><p>Compre jogos, empresas e contrate devs.</p></div>';
            return;
        }
        all.forEach(item => grid.appendChild(createCard(item, true)));
        state.createdGames.forEach(game => grid.appendChild(createMyGameCard(game)));
        ownedDevs.forEach(dev => grid.appendChild(createDevCard(dev, true)));
        return;
    }

    // Jogos e Empresas normais
    grid.style.display = 'grid';
    const items = games[tab] || [];
    items.forEach(item => {
        const isOwned = isItemOwned(item.id);
        grid.appendChild(createCard(item, isOwned));
    });
}

function renderMyGames() {
    const grid = document.getElementById('meusJogosGrid');
    grid.innerHTML = '';

    if (state.createdGames.length === 0) {
        grid.innerHTML = '<div class="empty"><div class="icon">🛠️</div><h3>Nenhum jogo criado ainda!</h3><p>Crie seu primeiro jogo acima.</p></div>';
        document.getElementById('meusJogosTitle').style.display = 'none';
        return;
    }

    document.getElementById('meusJogosTitle').style.display = 'block';
    state.createdGames.forEach(game => {
        grid.appendChild(createMyGameCard(game));
    });
}

// ============================================
// 📑 NAVEGAÇÃO DE TABS
// ============================================

function showTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    const titles = {
        free: '🆓 Jogos Gratuitos',
        cheap: '💵 Jogos Baratos (até R$50)',
        medium: '💰 Jogos Médios (R$50-100)',
        expensive: '💎 Jogos Caros (R$100-200)',
        super: '👑 Jogos Premium (R$200+)',
        empresas: '🏢 Empresas de Jogos',
        'devs-cheap': '👨‍💻 Devs Baratos (R$1K-2K)',
        'devs-medium': '👨‍💻 Devs Médios (R$20K-40K)',
        'devs-expensive': '👨‍💻 Devs Caros (R$100K-200K)',
        'devs-premium': '👨‍💻 Devs Premium (R$500K-1M)',
        criar: '🛠️ Criar Seu Próprio Jogo',
        rebirth: '🔄 Rebirth',
        biblioteca: '📚 Minha Biblioteca'
    };
    document.getElementById('sectionTitle').textContent = titles[tab] || tab;
    renderGrid(tab);
}

// ============================================
// 🎯 HANDLERS DE EVENTOS
// ============================================

function handleBuy(id) {
    const result = purchaseItem(id);
    
    if (result.success) {
        playPlin();
        showNotif(
            result.item.type === 'empresa' ? '🏢 Empresa Adquirida!' : '🎮 Jogo Comprado!',
            `${result.item.name} (+R$${result.item.income.toFixed(2)}/s)`
        );
        updateUI();
        renderGrid(currentTab);
        saveGameData();
    } else {
        playError();
        showNotif('❌ Erro!', result.message, true);
    }
}

function handleBuyDev(id) {
    const result = purchaseDev(id);
    
    if (result.success) {
        playPlin();
        const bonusPercent = (result.dev.bonus * 100).toFixed(0);
        showNotif(
            '👨‍💻 Dev Contratado!',
            `${result.dev.name} (+${bonusPercent}% de renda)`
        );
        updateUI();
        renderGrid(currentTab);
        saveGameData();
    } else {
        playError();
        showNotif('❌ Erro!', result.message, true);
    }
}

function handleCreateGame() {
    const name = document.getElementById('gameName').value.trim();
    const genre = document.getElementById('gameGenre').value;
    const icon = document.getElementById('gameIcon').value;

    const result = createNewGame(name, genre, icon);

    if (result.success) {
        playSuccess();
        showNotif('🎉 Jogo Criado!', `${result.game.name} agora gera R$20/s!`);
        document.getElementById('gameName').value = '';
        updateUI();
        renderMyGames();
        saveGameData();
    } else {
        playError();
        showNotif('❌ Erro!', result.message, true);
    }
}

function handleUpgrade(id) {
    const result = upgradeCreatedGame(id);

    if (result.success) {
        playSuccess();
        showNotif('⬆️ Upgrade Realizado!', `${result.game.name} agora gera R$${result.newIncome}/s!`);
        updateUI();
        if (currentTab === 'criar') {
            renderMyGames();
        } else {
            renderGrid(currentTab);
        }
        saveGameData();
    } else {
        playError();
        showNotif('❌ Erro!', result.message, true);
    }
}

function handleRebirth() {
    const requirement = getNextRebirthRequirement();
    const nextRebirth = state.rebirths + 1;
    const newBonus = nextRebirth * REBIRTH_BONUS * 100;
    
    if (confirm(`🔄 REBIRTH ${nextRebirth}\n\n⚠️ Você irá perder:\n- Todo seu dinheiro\n- Todos os jogos\n- Todas as empresas\n- Todos os devs\n- Todos os jogos criados\n\n✨ Você ganhará:\n- +50% de bônus permanente de renda\n- Total: +${newBonus}% de renda\n\nDeseja continuar?`)) {
        
        const result = doRebirth();
        
        if (result.success) {
            playRebirth();
            showNotif('🔄 REBIRTH!', `Você agora tem +${(result.newBonus * 100).toFixed(0)}% de renda permanente!`);
            updateUI();
            renderGrid('free');
            
            // Voltar para aba de jogos grátis
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelector('.tab').classList.add('active');
            document.getElementById('sectionTitle').textContent = '🆓 Jogos Gratuitos';
            
            saveGameData();
        } else {
            playError();
            showNotif('❌ Erro!', result.message, true);
        }
    }
}

function handleSave() {
    if (saveGameData()) {
        const indicator = document.getElementById('saveIndicator');
        indicator.classList.add('show');
        playPlin();
        setTimeout(() => indicator.classList.remove('show'), 2000);
    }
}

function handleReset() {
    if (confirm('⚠️ Tem certeza que deseja resetar TODO o progresso?\n\nIsso irá apagar TUDO, incluindo rebirths!')) {
        resetGameData();
        updateUI();
        renderGrid(currentTab);
        showNotif('🔄 Jogo Resetado!', 'Começando do zero!');
    }
}

// ============================================
// 🔔 NOTIFICAÇÕES
// ============================================

function showNotif(title, text, isError = false) {
    const notif = document.getElementById('notif');
    const overlay = document.getElementById('overlay');
    notif.querySelector('h3').textContent = title;
    notif.querySelector('p').textContent = text;
    notif.querySelector('.icon').textContent = isError ? '❌' : '✅';
    notif.style.background = isError
        ? 'linear-gradient(135deg, #aa3333, #dd5555)'
        : 'linear-gradient(135deg, #00aa55, #00dd77)';
    overlay.classList.add('show');
    notif.classList.add('show');
    setTimeout(() => {
        overlay.classList.remove('show');
        notif.classList.remove('show');
    }, 1500);
}

function floatText(text, element) {
    const rect = element.getBoundingClientRect();
    const float = document.createElement('div');
    float.className = 'float-income';
    float.textContent = text;
    float.style.left = rect.left + rect.width / 2 + 'px';
    float.style.top = rect.top + 'px';
    document.body.appendChild(float);
    setTimeout(() => float.remove(), 1500);
}

// ============================================
// ⏰ LOOPS E INICIALIZAÇÃO
// ============================================

function startIncomeLoop() {
    setInterval(() => {
        const total = calcTotalIncome();

        if (total > 0) {
            state.balance += total;
            state.totalEarned += total;
            updateUI();

            if (Math.random() < 0.2) {
                const el = document.querySelector('.stat-box');
                if (el) floatText(`+R$${formatNumber(total)}`, el);
            }
        }
    }, 1000);
}

function startAutoSave() {
    setInterval(() => {
        if (state.owned.length > 0 || state.ownedCompanies.length > 0 || state.createdGames.length > 0 || ownedDevs.length > 0 || state.rebirths > 0) {
            saveGameData();
        }
    }, 30000);
}

function initGame() {
    const loaded = loadGameData();
    
    updateUI();
    renderGrid('free');

    startIncomeLoop();
    startAutoSave();

    document.getElementById('overlay').onclick = () => {
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('notif').classList.remove('show');
    };

    if (loaded && (state.owned.length > 0 || state.ownedCompanies.length > 0 || state.createdGames.length > 0 || ownedDevs.length > 0 || state.rebirths > 0)) {
        setTimeout(() => {
            showNotif('💾 Progresso Carregado!', `Bem-vindo de volta! (${state.rebirths} rebirths)`);
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', initGame);