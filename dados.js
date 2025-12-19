// ============================================
// 🎮 DADOS DOS JOGOS E SISTEMA DE VALORES
// ============================================

// Estado do jogo
let state = {
    balance: 0,
    owned: [],
    ownedCompanies: [],
    createdGames: [],
    totalEarned: 0,
    nextGameId: 1000
};

// Níveis para jogos criados (custo de criar: R$ 1.000.000)
const gameLevels = [
    { level: 1, income: 20, upgradeCost: 0 },
    { level: 2, income: 25, upgradeCost: 500000 },
    { level: 3, income: 35, upgradeCost: 1000000 },
    { level: 4, income: 50, upgradeCost: 2000000 },
    { level: 5, income: 75, upgradeCost: 4000000 },
    { level: 6, income: 110, upgradeCost: 8000000 },
    { level: 7, income: 160, upgradeCost: 15000000 },
    { level: 8, income: 230, upgradeCost: 30000000 },
    { level: 9, income: 320, upgradeCost: 60000000 },
    { level: 10, income: 500, upgradeCost: 100000000 }
];

// Custo para criar um jogo
const CREATE_GAME_COST = 1000000;

// ============================================
// 🆓 JOGOS GRATUITOS - 4 jogos (Renda: R$ 0.10 - 0.15/s)
// ============================================
const freeGames = [
    { id: 1, name: "CS2", genre: "FPS Tático", price: 0, icon: "💣", income: 0.15 },
    { id: 2, name: "Fortnite", genre: "Battle Royale", price: 0, icon: "🔫", income: 0.12 },
    { id: 3, name: "Rocket League", genre: "Esportes", price: 0, icon: "🚗", income: 0.10 },
    { id: 4, name: "Valorant", genre: "FPS Tático", price: 0, icon: "🎯", income: 0.14 }
];

// ============================================
// 💵 JOGOS BARATOS - 10 jogos até R$50 (Renda: R$ 0.50 - 2.00/s)
// ============================================
const cheapGames = [
    { id: 10, name: "Among Us", genre: "Party Game", price: 10.99, icon: "🚀", income: 0.50 },
    { id: 11, name: "Stardew Valley", genre: "Simulação", price: 24.99, icon: "🌾", income: 1.00 },
    { id: 12, name: "Hollow Knight", genre: "Metroidvania", price: 27.99, icon: "🦋", income: 1.20, discount: "-30%" },
    { id: 13, name: "Terraria", genre: "Sandbox", price: 19.99, icon: "⛏️", income: 0.80 },
    { id: 14, name: "Undertale", genre: "RPG", price: 21.99, icon: "💀", income: 0.90 },
    { id: 15, name: "Celeste", genre: "Plataforma", price: 35.99, icon: "🍓", income: 1.50 },
    { id: 16, name: "Cuphead", genre: "Run & Gun", price: 37.99, icon: "☕", income: 1.60 },
    { id: 17, name: "Dead Cells", genre: "Roguelike", price: 44.99, icon: "🗡️", income: 1.80 },
    { id: 18, name: "Hades", genre: "Roguelike", price: 46.99, icon: "🔥", income: 1.90 },
    { id: 19, name: "Shovel Knight", genre: "Plataforma", price: 29.99, icon: "⚒️", income: 1.10 }
];

// ============================================
// 💰 JOGOS MÉDIOS - 10 jogos R$50 a R$100 (Renda: R$ 2.50 - 5.00/s)
// ============================================
const mediumGames = [
    { id: 20, name: "Minecraft", genre: "Sandbox", price: 79.99, icon: "🧱", income: 4.00 },
    { id: 21, name: "GTA V", genre: "Ação/Aventura", price: 59.99, icon: "🚗", income: 3.00, discount: "-40%" },
    { id: 22, name: "The Witcher 3", genre: "RPG", price: 79.99, icon: "🐺", income: 4.00, discount: "-50%" },
    { id: 23, name: "Dark Souls 3", genre: "RPG Ação", price: 89.99, icon: "🌑", income: 4.50 },
    { id: 24, name: "RE4 Remake", genre: "Terror", price: 99.99, icon: "🧟", income: 5.00 },
    { id: 25, name: "It Takes Two", genre: "Co-op", price: 89.99, icon: "💑", income: 4.50 },
    { id: 26, name: "Portal 2", genre: "Puzzle", price: 54.99, icon: "🌀", income: 2.75 },
    { id: 27, name: "Sekiro", genre: "Ação", price: 99.99, icon: "🥷", income: 5.00 },
    { id: 28, name: "Disco Elysium", genre: "RPG", price: 69.99, icon: "🕵️", income: 3.50 },
    { id: 29, name: "Outer Wilds", genre: "Aventura", price: 59.99, icon: "🌌", income: 3.00 }
];

// ============================================
// 💎 JOGOS CAROS - 10 jogos R$100 a R$200 (Renda: R$ 5.00 - 10.00/s)
// ============================================
const expensiveGames = [
    { id: 30, name: "EA FC 24", genre: "Esportes", price: 149.99, icon: "⚽", income: 7.50 },
    { id: 31, name: "COD MW3", genre: "FPS", price: 169.99, icon: "🎖️", income: 8.50 },
    { id: 32, name: "Spider-Man 2", genre: "Ação", price: 179.99, icon: "🕷️", income: 9.00 },
    { id: 33, name: "Hogwarts Legacy", genre: "RPG", price: 149.99, icon: "🧙", income: 7.50, discount: "-20%" },
    { id: 34, name: "Starfield", genre: "RPG Espacial", price: 169.99, icon: "🚀", income: 8.50 },
    { id: 35, name: "Diablo IV", genre: "RPG Ação", price: 159.99, icon: "😈", income: 8.00 },
    { id: 36, name: "Baldur's Gate 3", genre: "RPG Tático", price: 149.99, icon: "🐉", income: 7.50 },
    { id: 37, name: "Alan Wake 2", genre: "Terror", price: 159.99, icon: "🔦", income: 8.00 },
    { id: 38, name: "Lies of P", genre: "Soulslike", price: 139.99, icon: "🤥", income: 7.00 },
    { id: 39, name: "Armored Core 6", genre: "Ação Mecha", price: 189.99, icon: "🤖", income: 9.50 }
];

// ============================================
// 👑 JOGOS PREMIUM - 10 jogos R$200+ (Renda: R$ 10.00 - 20.00/s)
// ============================================
const superGames = [
    { id: 40, name: "Cyberpunk 2077 Ultimate", genre: "RPG", price: 249.99, icon: "🌃", income: 12.50 },
    { id: 41, name: "Red Dead Redemption 2", genre: "Ação/Aventura", price: 199.99, icon: "🤠", income: 10.00 },
    { id: 42, name: "Elden Ring Deluxe", genre: "RPG Ação", price: 279.99, icon: "💍", income: 14.00 },
    { id: 43, name: "God of War Ragnarök", genre: "Ação", price: 249.99, icon: "🪓", income: 12.50 },
    { id: 44, name: "The Last of Us Part II", genre: "Ação/Aventura", price: 229.99, icon: "🍄", income: 11.50 },
    { id: 45, name: "Final Fantasy XVI", genre: "RPG", price: 259.99, icon: "⚔️", income: 13.00 },
    { id: 46, name: "Horizon Forbidden West", genre: "RPG Ação", price: 249.99, icon: "🦖", income: 12.50 },
    { id: 47, name: "Death Stranding DC", genre: "Ação", price: 199.99, icon: "📦", income: 10.00 },
    { id: 48, name: "Ghost of Tsushima", genre: "Ação", price: 269.99, icon: "⛩️", income: 13.50 },
    { id: 49, name: "FF7 Rebirth", genre: "RPG", price: 299.99, icon: "🌟", income: 15.00 }
];

// ============================================
// 🏢 EMPRESAS - 10 empresas (Renda: R$ 25.00 - 1000.00/s)
// ============================================
const companies = [
    { id: 100, name: "Unity", genre: "Engine de Jogos", price: 15000, icon: "🔧", income: 25.00, type: "empresa" },
    { id: 101, name: "Epic Games", genre: "Fortnite/Unreal", price: 50000, icon: "🎮", income: 80.00, type: "empresa" },
    { id: 102, name: "Valve", genre: "Steam/CS2", price: 100000, icon: "🚂", income: 180.00, type: "empresa" },
    { id: 103, name: "Ubisoft", genre: "Assassin's Creed", price: 75000, icon: "🗼", income: 130.00, type: "empresa" },
    { id: 104, name: "EA Sports", genre: "FIFA/Madden", price: 120000, icon: "⚽", income: 220.00, type: "empresa" },
    { id: 105, name: "Rockstar Games", genre: "GTA/RDR", price: 200000, icon: "⭐", income: 350.00, type: "empresa" },
    { id: 106, name: "Nintendo", genre: "Mario/Zelda", price: 300000, icon: "🍄", income: 500.00, type: "empresa" },
    { id: 107, name: "Sony PlayStation", genre: "Console/Exclusivos", price: 400000, icon: "🎯", income: 650.00, type: "empresa" },
    { id: 108, name: "Microsoft Gaming", genre: "Xbox/Bethesda", price: 500000, icon: "🟢", income: 800.00, type: "empresa" },
    { id: 109, name: "Tencent", genre: "Investidora Global", price: 750000, icon: "🐧", income: 1000.00, type: "empresa" }
];

// Objeto com todas as categorias
const games = {
    free: freeGames,
    cheap: cheapGames,
    medium: mediumGames,
    expensive: expensiveGames,
    super: superGames,
    empresas: companies
};

// ============================================
// 💰 FUNÇÕES DE CÁLCULO DE RENDA
// ============================================

// Calcular renda total de jogos comprados
function calcGamesIncome() {
    return state.owned.reduce((sum, g) => sum + g.income, 0);
}

// Calcular renda total de empresas
function calcCompaniesIncome() {
    return state.ownedCompanies.reduce((sum, c) => sum + c.income, 0);
}

// Calcular renda total de jogos criados
function calcMyGamesIncome() {
    return state.createdGames.reduce((sum, g) => {
        const levelData = gameLevels[g.level - 1];
        return sum + (levelData ? levelData.income : 20);
    }, 0);
}

// Calcular renda total por segundo
function calcTotalIncome() {
    return calcGamesIncome() + calcCompaniesIncome() + calcMyGamesIncome();
}

// ============================================
// 🛒 FUNÇÕES DE COMPRA
// ============================================

// Comprar jogo ou empresa
function purchaseItem(id) {
    let item = null;
    
    // Procurar item em todas as categorias
    for (const cat in games) {
        const found = games[cat].find(g => g.id === id);
        if (found) {
            item = found;
            break;
        }
    }
    
    if (!item) return { success: false, message: 'Item não encontrado' };
    
    const isEmpresa = item.type === 'empresa';
    const list = isEmpresa ? state.ownedCompanies : state.owned;
    
    // Verificar se já possui
    if (list.some(x => x.id === item.id)) {
        return { success: false, message: 'Você já possui este item' };
    }
    
    // Verificar saldo
    if (state.balance < item.price) {
        return { success: false, message: 'Saldo insuficiente' };
    }
    
    // Realizar compra
    state.balance -= item.price;
    list.push({...item});
    
    return { 
        success: true, 
        message: isEmpresa ? 'Empresa adquirida!' : 'Jogo comprado!',
        item: item
    };
}

// Criar novo jogo
function createNewGame(name, genre, icon) {
    if (state.balance < CREATE_GAME_COST) {
        return { success: false, message: 'Você precisa de R$ 1.000.000' };
    }
    
    state.balance -= CREATE_GAME_COST;
    
    const newGame = {
        id: state.nextGameId++,
        name: name || 'Meu Jogo',
        genre: genre,
        icon: icon,
        level: 1
    };
    
    state.createdGames.push(newGame);
    
    return { 
        success: true, 
        message: `${newGame.name} criado com sucesso!`,
        game: newGame
    };
}

// Fazer upgrade de jogo criado
function upgradeCreatedGame(id) {
    const game = state.createdGames.find(g => g.id === id);
    
    if (!game) {
        return { success: false, message: 'Jogo não encontrado' };
    }
    
    const nextLevel = gameLevels[game.level];
    
    if (!nextLevel) {
        return { success: false, message: 'Nível máximo atingido!' };
    }
    
    if (state.balance < nextLevel.upgradeCost) {
        return { success: false, message: `Você precisa de R$ ${formatNumber(nextLevel.upgradeCost)}` };
    }
    
    state.balance -= nextLevel.upgradeCost;
    game.level++;
    
    return { 
        success: true, 
        message: `${game.name} agora é Nv.${game.level}!`,
        game: game,
        newIncome: nextLevel.income
    };
}

// Adicionar dinheiro
function addMoney(amount = 100) {
    state.balance += amount;
    return state.balance;
}

// ============================================
// 💾 FUNÇÕES DE SAVE/LOAD
// ============================================

// Salvar jogo
function saveGameData() {
    try {
        localStorage.setItem('gameTycoonSave', JSON.stringify(state));
        return true;
    } catch (e) {
        console.error('Erro ao salvar:', e);
        return false;
    }
}

// Carregar jogo
function loadGameData() {
    try {
        const saved = localStorage.getItem('gameTycoonSave');
        if (saved) {
            state = JSON.parse(saved);
            return true;
        }
    } catch (e) {
        console.error('Erro ao carregar:', e);
    }
    return false;
}

// Resetar jogo
function resetGameData() {
    localStorage.removeItem('gameTycoonSave');
    state = {
        balance: 0,
        owned: [],
        ownedCompanies: [],
        createdGames: [],
        totalEarned: 0,
        nextGameId: 1000
    };
}

// ============================================
// 🔢 FUNÇÕES UTILITÁRIAS
// ============================================

// Formatar números grandes
function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toFixed(2);
}

// Verificar se possui item
function isItemOwned(id) {
    return state.owned.some(g => g.id === id) || 
           state.ownedCompanies.some(c => c.id === id);
}

// Obter renda de jogo criado por nível
function getCreatedGameIncome(level) {
    const levelData = gameLevels[level - 1];
    return levelData ? levelData.income : 20;
}

// Obter custo de upgrade
function getUpgradeCost(level) {
    const nextLevel = gameLevels[level];
    return nextLevel ? nextLevel.upgradeCost : null;
}