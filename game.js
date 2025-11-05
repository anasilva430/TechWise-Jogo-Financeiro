// Variáveis de Estado
let state = {
    cash: 10000,
    debt: 0,
    year: 1,
    month: 0,
    currentDecision: 1,
    startTime: 0,
    aluno: "",
    turma: ""
};


// Configuração do EmailJS 
(function() {
    emailjs.init("d9d86G7bDE1WQ8eDy"); 
})();

// Estrutura das Decisões (TODAS as 20 Decisões)
const decisions = [
    // Decisão 1
    {
        id: 1,
        scenario: "Precisas de 50000 € para stock e marketing. O banco oferece um empréstimo de 1 ano (12 meses) a 8% ao ano, em regime de **Juro Antecipado**.",
        choices: [
            { text: "Aceitar (Calcular C' e Taxa Real)", action: 'acceptLoan1' },
            { text: "Recusar e operar com o capital atual", action: 'refuseLoan' }
        ]
    },
    // Decisão 2
    {
        id: 2,
        scenario: "Tens um excedente de 10000 € na tesouraria (Assumindo que sobraram 10000 € iniciais ou que a decisão 1 foi recusada). Podes aplicar a 4% em **Juro Simples** por 6 meses.",
        choices: [
            { text: "Aplicar o dinheiro (Juro Simples)", action: 'investSimp2' },
            { text: "Deixar o dinheiro parado", action: 'nextDecision' }
        ]
    },
    // Decisão 3
    {
        id: 3,
        scenario: "Vendeste 15000 € em faturas a 60 dias. Precisas de liquidez imediata e decides descontar a 7% (ano comercial, 360 dias). Calcula o **Desconto Comercial**.",
        choices: [
            { text: "Descontar a fatura", action: 'discountInvoice3' },
            { text: "Aguardar os 60 dias (Recebe o nominal)", action: 'waitInvoice3' }
        ]
    },
    // Decisão 4
    {
       id: 4,
       scenario: "A TechWise precisa de 1900 € para pagar uma fatura urgente.", // Cenário simplificado
       choices: [
           { text: "Usar saldo para pagar (Se OK)", action: 'mixedLoanLogic4' },
           { text: "Pedir Empréstimo de 2000 € (Juro Antecipado)", action: 'urgentLoan4' },
        { text: "Falhar o Pagamento (Penalidade)", action: 'failPayment4' }
       ]
   },    
   // Decisão 5
    {
        id: 5,
        scenario: "Podes comprar uma máquina de embalar por 4000 € para automatizar o stock. Isto não gera juro, mas pode reduzir os custos futuros (500 € em 6 meses).",
        choices: [
            { text: "Comprar a máquina (Reduz 4000 € Tesouraria)", action: 'buyMachine5' },
            { text: "Não Comprar", action: 'nextDecision' }
        ]
    },
    // Decisão 6 (Verifica Conhecimento e Taxa Real)
    {
        id: 6,
        scenario: "Analisa o empréstimo urgente da Decisão 4 (2000 € a 12% por 30 dias, Juro Antecipado). Qual é a **Taxa Real anual** deste empréstimo?",
        choices: [
            { text: "A: 12% (Taxa Nominal)", action: 'checkRateA6' },
            { text: "B: 13.64% (Taxa Real)", action: 'checkRateB6' },
            { text: "C: 10.71% (Taxa Real)", action: 'checkRateC6' }
        ]
    },
    // Decisão 7 (Renegociação de Dívida)
    {
        id: 7,
        scenario: "Se tens dívidas, o banco permite pagar 25000 € da dívida nominal agora, evitando juros adicionais equivalentes a 3 meses.",
        choices: [
            { text: "Pagar 25000 € da Dívida (se tiver saldo)", action: 'payDebt7' },
            { text: "Não pagar / Não é aplicável", action: 'nextDecision' }
        ]
    },
    // Decisão 8 (Novo Investimento em Dias - Ano Civil)
    {
        id: 8,
        scenario: "Tens um excedente de 8000 € na tesouraria. Investir a 5.5% por 90 dias (Ano Civil, 365 dias). Qual o Juro que vais obter?",
        choices: [
            { text: "Investir 8000 €", action: 'investDays8' },
            { text: "Deixar o dinheiro parado", action: 'nextDecision' }
        ]
    },
    // Decisão 9 (Comparação: Pronto vs. Crédito)
    {
        id: 9,
        scenario: "Precisas de 3 novos computadores (3000 €). Podes pagar a pronto (3000 €) ou usar um crédito a 12 meses com 4% de juro simples.",
        choices: [
            { text: "Pagar a Pronto (3000 €)", action: 'payCash9' },
            { text: "Pagar a Crédito (Cálculo do C_n)", action: 'payCredit9' }
        ]
    },
    // Decisão 10 (Alocação de Lucros)
    {
        id: 10,
        scenario: "Recebeste 15000 € em lucros. O que fazer com 10000 €?",
        choices: [
            { text: "Opção A: Investir 10000 € a 2% por 2 anos (Juro Simples)", action: 'allocateInvest10' },
            { text: "Opção B: Pagar dívida (se houver) de 10000 €", action: 'allocatePayDebt10' }
        ]
    },
    // Decisão 11 (Vencimento da Dívida Inicial)
    {
        id: 11,
        scenario: "Passou 1 ano (12 meses do empréstimo inicial). O banco exige o pagamento total da dívida nominal de 50000 € (se tiver sido contraída na Decisão 1).",
        choices: [
            { text: "Pagar Dívida (se houver saldo)", action: 'payPrincipal11' },
            { text: "Não pagar / Não é aplicável", action: 'failPrincipal11' }
        ]
    },
    // Decisão 12 (Investimento de Curto Prazo)
    {
        id: 12,
        scenario: "Tens 7000 € livres. Investir a 4% por 4 meses (Juro Simples).",
        choices: [
            { text: "Investir os 7000 €", action: 'investShort12' },
            { text: "Manter em caixa", action: 'nextDecision' }
        ]
    },
    // Decisão 13 (Desconto Racional vs. Comercial - Escolha Teórica)
    {
        id: 13,
        scenario: "Vais descontar uma letra de 10000 € a 120 dias a 9%. Qual método dá mais Valor Atual à sua empresa?",
        choices: [
            { text: "Desconto Racional (Por Dentro)", action: 'chooseRational13' },
            { text: "Desconto Comercial (Por Fora)", action: 'chooseCommercial13' }
        ]
    },
    // Decisão 14 (Ajuste de Tempo e Juros)
    {
        id: 14,
        scenario: "O saldo de caixa atual (o valor no ecrã) foi aplicado a 3% por 1 ano. Calcule o Juro Simples obtido e some à tesouraria. Avança 12 meses.",
        choices: [
            { text: "Calcular e Receber Juros", action: 'calculateCashInterest14' }
        ]
    },
    // Decisão 15 (Empréstimo de Alto Risco - Juro Antecipado)
    {
        id: 15,
        scenario: "A TechWise precisa de 15000 € extra por 6 meses, mas só consegue um empréstimo de alto risco a 15% (Juro Antecipado).",
        choices: [
            { text: "Aceitar (Calcular C' e Dívida)", action: 'acceptHighRisk15' },
            { text: "Recusar e avançar", action: 'nextDecision' }
        ]
    },
    // Decisão 16 (Investimento de Longo Prazo)
    {
        id: 16,
        scenario: "Investir 5000 € a 5% por 3 anos (Juro Simples). O lucro só entra no final do jogo (decisão 20).",
        choices: [
            { text: "Fazer o investimento (Reduz Tesouraria)", action: 'investLong16' },
            { text: "Não investir", action: 'nextDecision' }
        ]
    },
    // Decisão 17 (Cálculo de Prazo)
    {
        id: 17,
        scenario: "Se investiste 20000 € a 4%, quantos meses seriam necessários para obter 800 € de juro simples?",
        choices: [
            { text: "A: 10 meses", action: 'checkTimeA17' },
            { text: "B: 12 meses", action: 'checkTimeB17' },
            { text: "C: 1 ano e 3 meses", action: 'checkTimeC17' }
        ]
    },
    // Decisão 18 (Penalidade por Má Gestão)
    {
        id: 18,
        scenario: "Má gestão do Stock obriga a uma despesa não planeada de 1500 € (sai da tesouraria).",
        choices: [
            { text: "Aceitar o custo", action: 'applyPenalty18' }
        ]
    },
    // Decisão 19 (Oportunidade de Lucro Extra)
    {
        id: 19,
        scenario: "Aparece um cliente que paga 5000 € a pronto (entrada imediata na Tesouraria).",
        choices: [
            { text: "Aceitar a encomenda", action: 'acceptBonus19' }
        ]
    },
    // Decisão 20 (Fim do Jogo / Colheita)
    {
        id: 20,
        scenario: "Fim da Jornada. Liquide todas as dívidas pendentes (se houver), some o lucro de investimentos de longo prazo, e conte as poupanças da máquina de embalar (se comprada).",
        choices: [
            { text: "Finalizar e Calcular Saldo Líquido", action: 'finalCalculation20' }
        ]
    }
]; // <--- APENAS UM FECHO DE ARRAY AQUI


// --- Funções de Lógica Financeira ---

// Função para calcular Juro Simples (em Anos)
function calculateJuroSimples(C, n, i) {
    return C * n * i;
}

// Função para calcular Juro Antecipado (em meses)
function calculateJuroAntecipado(C, n_months, i) {
    return (C * n_months * i) / 12;
}

// Função para calcular Desconto Comercial (em dias)
function calculateDescontoComercial(C, n_days, i, base_days = 360) {
    return (C * n_days * i) / base_days;
}

// --- Funções de Ação do Jogo (Actions) ---

// Decisão 1: Aceitar Empréstimo (Juro Antecipado)
function acceptLoan1() {
    const C = 50000;
    const n_months = 12;
    const i = 0.08;
    
    // Cálculo do Juro Antecipado (Juro total sobre o Nominal)
    const J = calculateJuroAntecipado(C, n_months, i); // 50000 * 12 * 0.08 / 12 = 4000 €
    
    // Capital Efetivamente Recebido (C')
    const C_received = C - J; // 50000 - 4000 = 46000 €
    
    // Cálculo da Taxa Real (i')
    const i_real = i / (1 - i); // 0.08 / 0.92 = 0.08695
    
    state.cash += C_received;
    state.debt += C;
    state.month += n_months;

    alert(`ACEITE: Pagaste 4000 € de juros antecipados. Recebeste ${C_received.toFixed(2)} €.\n Taxa Real paga: ${(i_real * 100).toFixed(2)}% (vs 8% nominal)!`);
    nextDecision();
}

// Decisão 1: Recusar Empréstimo
function refuseLoan() {
    state.month += 1;
    alert("RECUSA: Manténs o teu capital atual, mas o crescimento será mais lento.");
    nextDecision();
}

// Decisão 2: Investir (Juro Simples)
function investSimp2() {
    const C = 10000;
    const n_years = 6/12;
    const i = 0.04;

    const J = calculateJuroSimples(C, n_years, i); // 10000 * 0.5 * 0.04 = 200 €
    
    state.cash += J;
    state.month += 6;

    alert(`INVESTIMENTO: Ganhaste ${J.toFixed(2)} € de juros. Tesouraria atualizada.`);
    nextDecision();
}

// Decisão 3: Descontar Fatura (Desconto Comercial)
function discountInvoice3() {
    const C = 15000;
    const n_days = 60;
    const i = 0.07;
    
    // Desconto Comercial (Df)
    const Df = calculateDescontoComercial(C, n_days, i, 360); // 15000 * 60 * 0.07 / 360 = 175 €
    
    // Valor Líquido Recebido
    const V_liquid = C - Df;
    
    state.cash += V_liquid;
    state.month += 1; // Ação imediata, avança pouco tempo
    
    alert(`DESCONTO: Pagaste ${Df.toFixed(2)} € de desconto. Recebeste ${V_liquid.toFixed(2)} € hoje.`);
    nextDecision();
}

// Decisão 3: Aguardar Vencimento
function waitInvoice3() {
    const C = 15000;
    state.cash += C;
    state.month += 2; // Avança 60 dias (2 meses)

    alert(`AGUARDAR: Recebeste o valor nominal de ${C.toFixed(2)} € mas perdeste 2 meses de oportunidades.`);
    nextDecision();
}

// Decisão 4: Empréstimo Urgente (Juro Antecipado)
function mixedLoanLogic4() {
    const payment = 1900;
    
    // Se o saldo for suficiente para o pagamento, a melhor opção é pagar a pronto
    if (state.cash >= payment) {
        state.cash -= payment;
        state.month += 1;
        alert(`TESOURARIA OK: Tinhas ${payment} € suficientes. Pagamento efetuado a pronto e tesouraria ajustada.`);
        nextDecision();
    } else {
        // Se não tiver saldo, oferece a opção original (empréstimo de 2000 €)
        // Usamos urgentLoan4 (Juro Antecipado)
        urgentLoan4();
    }
}
function urgentLoan4() {
    const C = 2000;
    const n_days = 30;
    const i = 0.12;
    
    // Cálculo do Juro Antecipado (reutiliza a função de Desconto Comercial para calcular Juro em dias)
    const J = calculateDescontoComercial(C, n_days, i, 360); 
    const C_received = C - J; 

    state.cash += C_received;
    state.debt += C;
    state.month += 1;
    alert(`EMPRÉSTIMO URGENTE: Recebeste ${C_received.toFixed(2)} € (Juro de ${J.toFixed(2)} €). Dívida de 2000 € adicionada.`);
    nextDecision();
}

// Decisão 4: Falhar Pagamento
function failPayment4() {
    const penalty = 500; // Penalidade
    state.cash -= penalty;
    state.month += 1;
    alert(`FALHA: Pagamento falhado resultou numa penalidade imediata de ${penalty.toFixed(2)} €.`);
    nextDecision();
}

// Decisão 5: Compra de Ativos
function buyMachine5() {
    const cost = 4000;
    const future_saving = 500;
    if (state.cash < cost) {
        alert("FALHA: Não tens saldo suficiente para esta compra!");
        return nextDecision();
    }
    state.cash -= cost;
    state.month += 1;
    // O impacto da poupança será considerado no saldo final
    state.saved_costs = (state.saved_costs || 0) + future_saving; 
    alert(`COMPRA: Máquina adquirida por ${cost} €. Tesouraria ajustada. Prevemos poupar 500 €.`);
    nextDecision();
}

// Decisão 6: Checagem da Taxa Real (Correto é C: 13.64%)
function checkRateA6() {
    alert("ERRADO. A Taxa Real é sempre superior à Taxa Nominal quando o juro é antecipado. (12% ≠ 12%)");
    state.month += 1;
    nextDecision();
}

function checkRateB6() {
    const nominal = 0.12;
    const real = nominal / (1 - nominal); // 0.12 / 0.88 ≈ 0.13636
    alert(`CORRETO! A Taxa Real é ${(real * 100).toFixed(2)}%. Isto mostra o custo real do Juro Antecipado.`);
    state.month += 1;
    nextDecision();
}

function checkRateC6() {
    alert("ERRADO. Essa taxa é inferior à nominal. A Taxa Real é sempre superior à Taxa Nominal quando o juro é antecipado.");
    state.month += 1;
    nextDecision();
}

// Decisão 7: Renegociação de Dívida
function payDebt7() {
    const payment = 25000;
    if (state.debt === 0) {
        alert("INFO: Não tens dívidas nominais para pagar. Segue em frente.");
        return nextDecision();
    }
    if (state.cash < payment) {
        alert("FALHA: Tesouraria insuficiente para pagar a dívida!");
        return nextDecision();
    }
    
    // Assumimos que a poupança em juros é 1/4 do juro total anual da dívida original (50000 € a 8%)
    const original_debt_i = 0.08;
    const interest_saved = 50000 * original_debt_i * (3/12); // 1000 €
    
    state.cash -= payment;
    state.debt -= payment;
    state.cash += interest_saved; // A poupança é um ganho de tesouraria
    state.month += 1;

    alert(`PAGAMENTO EFETUADO: Reduziste a dívida nominal em ${payment} €. Recebeste ${interest_saved.toFixed(2)} € em poupança de juros.`);
    nextDecision();
}

// Decisão 8: Novo Investimento em Dias (Ano Civil)
function investDays8() {
    const C = 8000;
    const n_days = 90;
    const i = 0.055;
    
    // Cálculo do Juro Simples (Base 365)
    const J = calculateDescontoComercial(C, n_days, i, 365); // Reutilizamos a função para Juro em dias
    
    state.cash += J;
    state.month += 3; // Avança 90 dias
    alert(`INVESTIMENTO: O teu investimento rendeu ${J.toFixed(2)} € em juros em 90 dias.`);
    nextDecision();
}

// Decisão 9: Comparação Crédito vs. Pronto Pagamento
function payCash9() {
    const cost = 3000;
    if (state.cash < cost) {
         alert("FALHA: Não tens tesouraria. Vais ter de optar pelo crédito, se possível!");
         return nextDecision();
    }
    state.cash -= cost;
    state.month += 1;
    alert(`PRONTO PAGAMENTO: Pagaste 3000 € na hora. Não há juros.`);
    nextDecision();
}

function payCredit9() {
    const C = 3000;
    const n_months = 12;
    const i = 0.04;

    // Custo Total (Capital Acumulado)
    const J = calculateJuroAntecipado(C, n_months, i); // Assumimos que o juro simples total é diluído no pagamento nominal
    const Cn = C + J; // 3000 + 120 = 3120 €
    
    // A dívida nominal aumenta, mas a tesouraria fica intacta por agora.
    state.debt += Cn;
    state.month += 1;
    alert(`CRÉDITO: A dívida total (Capital Acumulado) é de ${Cn.toFixed(2)} €. Tesouraria intacta por enquanto.`);
    nextDecision();
}

// Decisão 10: Alocação de Lucros
function allocateInvest10() {
    const C = 10000;
    const n = 2;
    const i = 0.02;

    const J = calculateJuroSimples(C, n, i); // 10000 * 2 * 0.02 = 400 €
    state.cash += J; // O juro só entra no final do prazo
    state.month += 24; // Avança 2 anos
    
    alert(`INVESTIMENTO: Aplicaste 10000 € e ganhaste ${J.toFixed(2)} € em 2 anos.`);
    nextDecision();
}

function allocatePayDebt10() {
    const C = 10000;
    if (state.debt === 0) {
        alert("AVISO: Não havia dívida para pagar, o dinheiro ficou parado!");
        state.month += 1;
        return nextDecision();
    }
    
    state.debt -= C;
    state.cash -= C;
    state.month += 1;
    alert(`PAGAMENTO DE DÍVIDA: Reduziste a dívida nominal em ${C} €. Isto é uma boa gestão de risco.`);
    nextDecision();
}

// Variável Global para Investimento de Longo Prazo (Decisão 16)
let longTermInvestment = { principal: 0, profit: 0 }; 

// Decisão 11: Vencimento da Dívida Principal (50000 €)
function payPrincipal11() {
    const principal = 50000;
    if (state.debt >= principal) {
        if (state.cash >= principal) {
            state.cash -= principal;
            state.debt -= principal;
            alert(`PAGAMENTO EFETUADO: Dívida nominal de ${principal.toFixed(2)} € liquidada.`);
        } else {
            // Penalidade por não ter o principal na data
            const penalty = principal * 0.15;
            state.cash -= penalty;
            state.debt -= principal; // A dívida é liquidada, mas com penalidade na tesouraria
            alert(`FALHA CRÍTICA: Não conseguiste pagar o principal (${principal} €). Penalização de 15% (${penalty.toFixed(2)} €) aplicada ao teu saldo.`);
        }
    } else {
        alert("INFO: Não havia dívida principal para pagar. Tesouraria segura.");
    }
    state.month += 1;
    nextDecision();
}

function failPrincipal11() {
    // Mesma lógica de penalidade se houver dívida
    payPrincipal11(); 
}

// Decisão 12: Investimento de Curto Prazo (4 meses)
function investShort12() {
    const C = 7000;
    const n_months = 4;
    const i = 0.04;
    
    // Calcula Juro
    const J = calculateJuroAntecipado(C, n_months, i); 

    if (state.cash < C) {
        alert("FALHA: Não tens 7000 € para investir.");
        return nextDecision();
    }
    
    state.cash += J; // O juro entra diretamente
    state.month += n_months;
    alert(`INVESTIMENTO: Ganhaste ${J.toFixed(2)} € de juros em 4 meses.`);
    nextDecision();
}

// Decisão 13: Desconto Racional vs. Comercial (Responde Certa)
function chooseRational13() {
    alert("ERRADO! O **Desconto Comercial (Por Fora)**, apesar de menos 'verdadeiro', sempre resulta num **menor desconto** para a empresa, logo num **maior valor atual** recebido.");
    state.month += 1;
    nextDecision();
}

function chooseCommercial13() {
    alert("CORRETO! O Desconto Comercial (Por Fora) incide sobre o Nominal, mas na prática, no Juro Simples, é o que garante o maior Valor Líquido para o beneficiário.");
    state.month += 1;
    nextDecision();
}

// Decisão 14: Ajuste de Tempo e Juros sobre Saldo de Caixa Atual
function calculateCashInterest14() {
    const C = state.cash; // O saldo atual
    const n = 1;
    const i = 0.03;

    if (C <= 0) {
        alert("Não há capital para render juros! Avança 12 meses sem ganho.");
    } else {
        const J = calculateJuroSimples(C, n, i);
        state.cash += J;
        alert(`GANHO: O teu saldo de ${C.toFixed(2)} € rendeu ${J.toFixed(2)} € de juros em 1 ano.`);
    }
    
    state.year += 1;
    state.month = 0; // Reinicia o mês, avança o ano
    nextDecision();
}

// Decisão 15: Empréstimo de Alto Risco (Juro Antecipado)
function acceptHighRisk15() {
    const C = 15000;
    const n_months = 6;
    const i = 0.15; // 15%

    const J = calculateJuroAntecipado(C, n_months, i); // 15000 * 6 * 0.15 / 12 = 1125 €
    const C_received = C - J; // 15000 - 1125 = 13875 €
    const i_real = i / (1 - i); // 0.15 / 0.85 ≈ 0.17647 (17.65%)
    
    state.cash += C_received;
    state.debt += C;
    state.month += n_months;

    alert(`ACEITE ARRISCADO: Recebeste ${C_received.toFixed(2)} €.\n A Taxa Real é de ${(i_real * 100).toFixed(2)}%.\n Dívida nominal aumenta em ${C.toFixed(2)} €.`);
    nextDecision();
}

// Decisão 16: Investimento de Longo Prazo
function investLong16() {
    const C = 5000;
    const n = 3;
    const i = 0.05;
    
    if (state.cash < C) {
        alert("FALHA: Não tens 5000 € para este investimento. Avança sem investir.");
        return nextDecision();
    }
    
    const J = calculateJuroSimples(C, n, i); // 5000 * 3 * 0.05 = 750 €
    
    state.cash -= C; // O capital sai de tesouraria
    longTermInvestment.principal += C;
    longTermInvestment.profit += J;
    state.month += 1;
    
    alert(`INVESTIMENTO LP: Retiraste 5000 € da tesouraria. Lucro de ${J.toFixed(2)} € guardado para a Decisão 20.`);
    nextDecision();
}

// Decisão 17: Cálculo de Prazo (Resposta Correta: B: 12 meses)
function checkTimeA17() {
    alert("ERRADO. O cálculo correto é 12 meses.");
    state.month += 1;
    nextDecision();
}

function checkTimeB17() {
    // J = 20000 * n * 0.04 / 12. 800 = 800n. n=12.
    alert("CORRETO! Seriam necessários 12 meses (1 ano).");
    state.month += 1;
    nextDecision();
}

function checkTimeC17() {
    alert("ERRADO. O cálculo correto é 12 meses.");
    state.month += 1;
    nextDecision();
}

// Decisão 18: Penalidade por Má Gestão
function applyPenalty18() {
    const penalty = 1500;
    state.cash -= penalty;
    state.month += 1;
    alert(`PENALIDADE: 1500 € saem da tesouraria devido à má gestão de stock.`);
    nextDecision();
}

// Decisão 19: Oportunidade de Lucro Extra
function acceptBonus19() {
    const bonus = 5000;
    state.cash += bonus;
    state.month += 1;
    alert(`BÓNUS: Recebeste 5000 € de lucro extra a pronto!`);
    nextDecision();
}

// Decisão 20: Fim do Jogo / Colheita
function finalCalculation20() {
    
    // Liquida dívidas pendentes (Alto Risco)
    if (state.debt > 0) {
        if (state.cash >= state.debt) {
            state.cash -= state.debt;
            alert(`DÍVIDAS PENDENTES: ${state.debt.toFixed(2)} € pagos.`);
            state.debt = 0;
        } else {
            // Penalidade por falhar pagamento final
            const penalty = state.debt * 0.50; 
            state.cash -= penalty;
            alert(`FALHA FINAL: Tesouraria insuficiente. Penalização de 50% sobre a dívida pendente (${penalty.toFixed(2)} €).`);
            state.debt = 0;
        }
    }
    
    // Adiciona lucro de longo prazo (Decisão 16)
    state.cash += longTermInvestment.principal + longTermInvestment.profit; 
    
    // Adiciona poupança da máquina (Decisão 5 - se for comprada)
    if (state.saved_costs) {
        state.cash += state.saved_costs;
    }
    
    alert(`CÁLCULOS FINAIS CONCLUÍDOS! O teu capital foi ajustado. Clica em 'Submeter Resultados' para finalizar.`);
    
    // AVANÇA O ESTADO PARA QUE displayDecision CHAME endGame()
    state.currentDecision++; 
    
    // Chama displayDecision para que a lógica de controlo finalize o jogo
    displayDecision(); 
}


// --- Funções de Controlo do Jogo ---

const actionMap = {
    'acceptLoan1': acceptLoan1,
    'refuseLoan': refuseLoan,
    'investSimp2': investSimp2,
    'nextDecision': () => { state.month += 1; nextDecision(); },
    'discountInvoice3': discountInvoice3,
    'waitInvoice3': waitInvoice3,
    'mixedLoanLogic4' : mixedLoanLogic4,
    'urgentLoan4': urgentLoan4,
    'failPayment4': failPayment4,
    'buyMachine5': buyMachine5,
    'checkRateA6': checkRateA6,
    'checkRateB6': checkRateB6,
    'checkRateC6': checkRateC6,
    'payDebt7': payDebt7,
    'investDays8': investDays8,
    'payCash9': payCash9,
    'payCredit9': payCredit9,
    'allocateInvest10': allocateInvest10,
    'allocatePayDebt10': allocatePayDebt10,
    'payPrincipal11': payPrincipal11,
    'failPrincipal11': failPrincipal11,
    'investShort12': investShort12,
    'chooseRational13': chooseRational13,
    'chooseCommercial13': chooseCommercial13,
    'calculateCashInterest14': calculateCashInterest14,
    'acceptHighRisk15': acceptHighRisk15,
    'investLong16': investLong16,
    'checkTimeA17': checkTimeA17,
    'checkTimeB17': checkTimeB17,
    'checkTimeC17': checkTimeC17,
    'applyPenalty18': applyPenalty18,
    'acceptBonus19': acceptBonus19,
    'finalCalculation20': finalCalculation20 // Ação final
};

function updateUI() {
    document.getElementById('cash').textContent = state.cash.toFixed(2);
    document.getElementById('debt').textContent = state.debt.toFixed(2);
    document.getElementById('year').textContent = state.year;
    document.getElementById('month').textContent = state.month;
    document.getElementById('decision-number').textContent = state.currentDecision;
}

function displayDecision() {
    if (state.currentDecision > 20) {
        return endGame();
    }

    const current = decisions.find(d => d.id === state.currentDecision);
    if (!current) {
        return endGame();
    }

    // Atualiza o cenário
    document.getElementById('current-decision').innerHTML = `<p>${current.scenario}</p>`;

    // Cria os botões
    const buttonsContainer = document.getElementById('buttons-container');
    buttonsContainer.innerHTML = '';
    
    current.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => {
            const action = actionMap[choice.action];
            if (action) {
                action();
            } else {
                alert("Ação não implementada! Próxima decisão.");
                state.month += 1;
                nextDecision();
            }
        };
        buttonsContainer.appendChild(button);
    });

    updateUI();
}

function nextDecision() {
    state.currentDecision++;

    // Lógica para avançar o ano (simplificado)
    if (state.month >= 12) {
        state.year++;
        state.month -= 12;
    }

    // Verifica se a dívida inicial precisa ser paga (após 12 meses)
    if (state.debt > 0 && state.month >= 12) {
        const principal = 50000; // Assumindo a dívida do exemplo 1
        if (state.cash >= principal) {
            state.cash -= principal;
            state.debt -= principal;
            alert(`DÍVIDA PRINCIPAL LIQUIDADA: Pagaste ${principal.toFixed(2)} € da dívida nominal. Tesouraria ajustada.`);
        } else {
            alert("AVISO: Falhaste o pagamento da dívida principal! Aplica-se uma penalidade!");
            state.cash -= 10000; // Penalidade pesada
        }
    }

    displayDecision();
}

// NOVA FUNÇÃO DE CONTROLO INICIAL
function readUserInfoAndStartGame() {
    const alunoName = document.getElementById('aluno-name').value;
    const turmaId = document.getElementById('turma-id').value;

    if (!alunoName || !turmaId) {
        alert("Por favor, preenche o teu nome e a tua turma antes de começar!");
        return;
    }

    // Armazena a informação no estado do jogo
    state.aluno = alunoName;
    state.turma = turmaId;
    
    // Inicia o jogo
    startGame();
}

// ATUALIZAÇÃO DA FUNÇÃO startGame para remover a chamada anterior
function startGame() {
    state.startTime = Date.now();
    document.getElementById('capa-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Atualiza o estado inicial (para ser consistente)
    updateUI(); 
    
    displayDecision();
}


// --- NOVA FUNÇÃO: Conversão de Segundos para Minutos e Segundos Sobrantes ---
function convertSecondsToMinutes(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(0); // Arredonda os segundos
    
    // Confirma que a string está em Português de Portugal
    let result = "";
    if (minutes > 0) {
        result += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
    if (seconds > 0 || minutes === 0) {
        if (minutes > 0) result += " e ";
        result += `${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }
    return result;
}



function endGame() {
// Certifique-se de que a Decisão 20 chama a lógica final
    if (state.currentDecision === 21) {
        finalCalculation20(); // Chama a lógica de liquidação/lucro final
    }
    
// Calcula o tempo total em segundos (com precisão)
    const totalTimeSeconds = (Date.now() - state.startTime) / 1000;
    
    // Converte para o formato de minutos/segundos em PT
    const formattedTime = convertSecondsToMinutes(totalTimeSeconds);
    
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');

    document.getElementById('final-cash').textContent = state.cash.toFixed(2);
    // Usa o tempo formatado aqui
    document.getElementById('game-time').textContent = formattedTime; 

    // Prepara os dados para o envio (ainda em segundos para análise, mas com a string formatada)
    state.totalTimeSeconds = totalTimeSeconds.toFixed(2);
    state.totalTimeFormatted = formattedTime;
}

function sendResults() {
    const templateParams = {
        aluno: state.aluno,
        turma: state.turma,
        capital_final: state.cash.toFixed(2),
        // Envia o tempo formatado para o email
        tempo_total: state.totalTimeFormatted, 
        destinatario: "ana.silva.430@aemlaranjeira.pt" // Usado no TO do Template
    };
    
    
    emailjs.send('service_wi13tin', 'template_km9qrq9', templateParams)
        .then(function(response) {
            alert('Resultado submetido com sucesso! Código: ' + response.status);
            
            // Exibe a simulação/resumo após o envio
            alert(`Simulação de envio para ${templateParams.aluno}:\nCapital Final: ${templateParams.capital_final} €\nTempo: ${templateParams.tempo_total}\nDESTINATÁRIO: ${templateParams.destinatario}`);
            
        }, function(error) {
            alert('Falha ao submeter o resultado. Verifica a consola e as configurações do EmailJS.');
            
            // Exibe a simulação/resumo após o erro
            alert(`Falha no envio (Simulação) para ${templateParams.aluno}:\nCapital Final: ${templateParams.capital_final} €\nTempo: ${templateParams.tempo_total}\nDESTINATÁRIO: ${templateParams.destinatario}`);
        });
    
    // ATENÇÃO: NENHUM CÓDIGO FORA DESTA FUNÇÃO (E FORA DO } DESTE BLOCO) DEVE EXISTIR NO FIM DO FICHEIRO.

}



