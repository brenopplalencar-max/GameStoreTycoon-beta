// ============================================
// 👨‍💻 SISTEMA DE DESENVOLVEDORES
// ============================================

// Desenvolvedores contratados
let ownedDevs = [];

// ============================================
// 💵 DEVS BARATOS - 10 devs (R$ 1.000 - 2.000) Bônus: +5% a +15%
// ============================================
const cheapDevs = [
    { id: 200, name: "João Iniciante", skill: "HTML/CSS", price: 1000, icon: "👶", bonus: 0.05, bonusType: "percent" },
    { id: 201, name: "Maria Estagiária", skill: "JavaScript", price: 1200, icon: "👩‍🎓", bonus: 0.06, bonusType: "percent" },
    { id: 202, name: "Pedro Júnior", skill: "Python", price: 1300, icon: "🧑‍💻", bonus: 0.07, bonusType: "percent" },
    { id: 203, name: "Ana Trainee", skill: "React", price: 1400, icon: "👩‍💻", bonus: 0.08, bonusType: "percent" },
    { id: 204, name: "Lucas Aprendiz", skill: "Node.js", price: 1500, icon: "📚", bonus: 0.09, bonusType: "percent" },
    { id: 205, name: "Carla Novata", skill: "Unity", price: 1600, icon: "🎮", bonus: 0.10, bonusType: "percent" },
    { id: 206, name: "Bruno Freelancer", skill: "PHP", price: 1700, icon: "💼", bonus: 0.11, bonusType: "percent" },
    { id: 207, name: "Fernanda Dev", skill: "Java", price: 1800, icon: "☕", bonus: 0.12, bonusType: "percent" },
    { id: 208, name: "Ricardo Code", skill: "C#", price: 1900, icon: "🔷", bonus: 0.13, bonusType: "percent" },
    { id: 209, name: "Juliana Script", skill: "TypeScript", price: 2000, icon: "📝", bonus: 0.15, bonusType: "percent" }
];

// ============================================
// 💰 DEVS MÉDIOS - 20 devs (R$ 20.000 - 40.000) Bônus: +20% a +50%
// ============================================
const mediumDevs = [
    { id: 210, name: "Carlos Pleno", skill: "Full Stack", price: 20000, icon: "🖥️", bonus: 0.20, bonusType: "percent" },
    { id: 211, name: "Beatriz Senior", skill: "Backend", price: 22000, icon: "⚙️", bonus: 0.22, bonusType: "percent" },
    { id: 212, name: "Diego Expert", skill: "Frontend", price: 24000, icon: "🎨", bonus: 0.24, bonusType: "percent" },
    { id: 213, name: "Larissa Pro", skill: "Mobile", price: 25000, icon: "📱", bonus: 0.25, bonusType: "percent" },
    { id: 214, name: "Thiago Ninja", skill: "DevOps", price: 26000, icon: "🥷", bonus: 0.26, bonusType: "percent" },
    { id: 215, name: "Camila Hacker", skill: "Security", price: 27000, icon: "🔐", bonus: 0.27, bonusType: "percent" },
    { id: 216, name: "Rafael Wizard", skill: "AI/ML", price: 28000, icon: "🧙", bonus: 0.28, bonusType: "percent" },
    { id: 217, name: "Patrícia Tech", skill: "Cloud", price: 29000, icon: "☁️", bonus: 0.29, bonusType: "percent" },
    { id: 218, name: "Gustavo Master", skill: "Database", price: 30000, icon: "🗄️", bonus: 0.30, bonusType: "percent" },
    { id: 219, name: "Amanda Guru", skill: "Blockchain", price: 31000, icon: "⛓️", bonus: 0.31, bonusType: "percent" },
    { id: 220, name: "Vinícius Sage", skill: "Game Dev", price: 32000, icon: "🕹️", bonus: 0.32, bonusType: "percent" },
    { id: 221, name: "Isabela Crack", skill: "Unreal", price: 33000, icon: "🎯", bonus: 0.33, bonusType: "percent" },
    { id: 222, name: "Henrique Boss", skill: "Graphics", price: 34000, icon: "🖼️", bonus: 0.34, bonusType: "percent" },
    { id: 223, name: "Natália Queen", skill: "Audio", price: 35000, icon: "🎵", bonus: 0.35, bonusType: "percent" },
    { id: 224, name: "Felipe King", skill: "Physics", price: 36000, icon: "⚡", bonus: 0.36, bonusType: "percent" },
    { id: 225, name: "Mariana Ace", skill: "Animation", price: 37000, icon: "🎬", bonus: 0.37, bonusType: "percent" },
    { id: 226, name: "Eduardo Star", skill: "Networking", price: 38000, icon: "🌐", bonus: 0.38, bonusType: "percent" },
    { id: 227, name: "Gabriela Prime", skill: "VR/AR", price: 39000, icon: "🥽", bonus: 0.40, bonusType: "percent" },
    { id: 228, name: "André Elite", skill: "Optimization", price: 39500, icon: "🚀", bonus: 0.45, bonusType: "percent" },
    { id: 229, name: "Vanessa Ultra", skill: "Architecture", price: 40000, icon: "🏛️", bonus: 0.50, bonusType: "percent" }
];

// ============================================
// 💎 DEVS CAROS - 5 devs (R$ 100.000 - 200.000) Bônus: +60% a +100%
// ============================================
const expensiveDevs = [
    { id: 230, name: "Dr. Tech", skill: "Tech Lead", price: 100000, icon: "🎓", bonus: 0.60, bonusType: "percent" },
    { id: 231, name: "Mestre Code", skill: "Principal Dev", price: 125000, icon: "🏆", bonus: 0.70, bonusType: "percent" },
    { id: 232, name: "Arquiteto Supreme", skill: "Solution Architect", price: 150000, icon: "🏗️", bonus: 0.80, bonusType: "percent" },
    { id: 233, name: "Gênio Digital", skill: "CTO Level", price: 175000, icon: "🧠", bonus: 0.90, bonusType: "percent" },
    { id: 234, name: "Lenda Dev", skill: "Founder Level", price: 200000, icon: "👑", bonus: 1.00, bonusType: "percent" }
];

// ============================================
// 👑 DEVS PREMIUM - 5 devs (R$ 500.000 - 1.000.000) Bônus: +120% a +200%
// ============================================
const premiumDevs = [
    { id: 235, name: "John Carmack Jr.", skill: "Engine Master", price: 500000, icon: "🔥", bonus: 1.20, bonusType: "percent" },
    { id: 236, name: "Hideo Kojima 2.0", skill: "Creative Genius", price: 600000, icon: "🎭", bonus: 1.40, bonusType: "percent" },
    { id: 237, name: "Gabe Newell Clone", skill: "Business + Dev", price: 750000, icon: "🚂", bonus: 1.60, bonusType: "percent" },
    { id: 238, name: "Miyamoto Discípulo", skill: "Game Design God", price: 850000, icon: "⭐", bonus: 1.80, bonusType: "percent" },
    { id: 239, name: "Notch Reborn", skill: "Indie Legend", price: 1000000, icon: "💎", bonus: 2.00, bonusType: "percent" }
];

// Objeto com todas as categorias de devs
const devs = {
    cheap: cheapDevs,
    medium: mediumDevs,
    expensive: expensiveDevs,
    premium: premiumDevs
};

// ============================================
// 💰 FUNÇÕES DE DESENVOLVEDORES
// ============================================

// Calcular bônus total dos devs (em porcentagem)
function calcDevsBonus() {
    return ownedDevs.reduce((sum, d) => sum + d.bonus, 0);
}

// Comprar desenvolvedor
function purchaseDev(id) {
    let dev = null;
    
    // Procurar dev em todas as categorias
    for (const cat in devs) {
        const found = devs[cat].find(d => d.id === id);
        if (found) {
            dev = found;
            break;
        }
    }
    
    if (!dev) return { success: false, message: 'Dev não encontrado' };
    
    // Verificar se já possui
    if (ownedDevs.some(d => d.id === dev.id)) {
        return { success: false, message: 'Você já contratou este dev' };
    }
    
    // Verificar saldo
    if (state.balance < dev.price) {
        return { success: false, message: 'Saldo insuficiente' };
    }
    
    // Realizar contratação
    state.balance -= dev.price;
    ownedDevs.push({...dev});
    
    return { 
        success: true, 
        message: 'Desenvolvedor contratado!',
        dev: dev
    };
}

// Verificar se possui dev
function isDevOwned(id) {
    return ownedDevs.some(d => d.id === id);
}