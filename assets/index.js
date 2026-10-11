const tempoPrincipal = document.querySelector('#tempo-principal');
const milesimosEl = document.querySelector('#milesimos');
const btnToggle = document.querySelector('#iniciar');
const btnToggleLabel = btnToggle.querySelector('span');
const btnZerar = document.querySelector('#zerar');

let emExecucao = false;
let tempoAcumuladoMs = 0;
let inicioUltimoCiclo = 0;
let animationFrameId = null;

function formatarTempo(msTotal) {
    const totalCentisegundos = Math.floor(msTotal / 10);
    const centisegundos = totalCentisegundos % 100;

    const totalSegundos = Math.floor(totalCentisegundos / 100);
    const segundos = totalSegundos % 60;
    const minutos = Math.floor(totalSegundos / 60) % 60;
    const horas = Math.floor(totalSegundos / 3600);

    const hh = String(horas).padStart(2, '0');
    const mm = String(minutos).padStart(2, '0');
    const ss = String(segundos).padStart(2, '0');
    const cc = String(centisegundos).padStart(2, '0');

    return {
        principal: `${hh}:${mm}:${ss}`,
        centisegundos: `.${cc}`
    };
}

function atualizarDisplay(msTotal) {
    const { principal, centisegundos } = formatarTempo(msTotal);
    tempoPrincipal.textContent = principal;
    milesimosEl.textContent = centisegundos;
}

function loop() {
    if (!emExecucao) return;
    const agora = performance.now();
    const tempoAtual = tempoAcumuladoMs + (agora - inicioUltimoCiclo);
    atualizarDisplay(tempoAtual);
    animationFrameId = requestAnimationFrame(loop);
}

function iniciarCronometro() {
    emExecucao = true;
    inicioUltimoCiclo = performance.now();

    btnToggle.dataset.running = 'true';
    btnToggle.classList.remove('btn-start');
    btnToggle.classList.add('btn-pause');
    btnToggleLabel.textContent = 'Pausar';

    btnZerar.disabled = false;
    animationFrameId = requestAnimationFrame(loop);
}

function pausarCronometro() {
    if (!emExecucao) return;
    emExecucao = false;
    tempoAcumuladoMs += performance.now() - inicioUltimoCiclo;
    cancelAnimationFrame(animationFrameId);
    atualizarDisplay(tempoAcumuladoMs);

    btnToggle.dataset.running = 'false';
    btnToggle.classList.remove('btn-pause');
    btnToggle.classList.add('btn-start');
    btnToggleLabel.textContent = 'Iniciar';
}

function zerarCronometro() {
    emExecucao = false;
    tempoAcumuladoMs = 0;
    cancelAnimationFrame(animationFrameId);
    atualizarDisplay(0);

    btnToggle.dataset.running = 'false';
    btnToggle.classList.remove('btn-pause');
    btnToggle.classList.add('btn-start');
    btnToggleLabel.textContent = 'Iniciar';

    btnZerar.disabled = true;
}

btnToggle.addEventListener('click', () => {
    if (emExecucao) {
        pausarCronometro();
    } else {
        iniciarCronometro();
    }
});

btnZerar.addEventListener('click', zerarCronometro);

atualizarDisplay(0);


