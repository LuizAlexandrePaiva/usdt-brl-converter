import { state, subscribe, fetchRate } from './api.js';
import { recomputeValues } from './converter.js';

const UPDATE_INTERVAL = 30;
let countdownTimer;
let currentSeconds = UPDATE_INTERVAL;

const elements = {
    loading: document.getElementById('loading-state'),
    error: document.getElementById('error-state'),
    display: document.getElementById('rate-display'),
    currentRate: document.getElementById('current-rate'),
    dailyChange: document.getElementById('daily-change'),
    lastUpdate: document.getElementById('last-update'),
    statusDot: document.querySelector('.status-dot'),
    progressBar: document.getElementById('progress-bar'),
    countdown: document.getElementById('countdown'),
    retryBtn: document.getElementById('retry-btn')
};

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    }).format(value);
}

function formatTime(date) {
    return date.toLocaleTimeString('pt-BR', { hour12: false });
}

function updateUI(state) {
    if (state.isFetching) {
        elements.statusDot.classList.add('fetching');
    } else {
        elements.statusDot.classList.remove('fetching');
    }

    if (state.error) {
        elements.loading.classList.add('hidden');
        elements.display.classList.add('hidden');
        elements.error.classList.remove('hidden');
        return;
    }

    if (state.bidPrice !== null) {
        elements.loading.classList.add('hidden');
        elements.error.classList.add('hidden');
        elements.display.classList.remove('hidden');

        const newFormattedRate = formatCurrency(state.bidPrice);
        if (elements.currentRate.textContent !== newFormattedRate) {
            elements.currentRate.textContent = newFormattedRate;

            elements.currentRate.classList.add('flash');
            setTimeout(() => elements.currentRate.classList.remove('flash'), 300);

            recomputeValues();
        }

        const change = state.percentageChange;
        const sign = change > 0 ? '+' : '';
        elements.dailyChange.textContent = `${sign}${change.toFixed(2).replace('.', ',')}% hoje`;
        elements.dailyChange.className = `rate-change ${change >= 0 ? 'positive' : 'negative'}`;

        if (state.lastUpdate) {
            elements.lastUpdate.textContent = `atualizado às ${formatTime(state.lastUpdate)}`;
        }

        resetProgressBar();
    }
}

function resetProgressBar() {
    currentSeconds = UPDATE_INTERVAL;
    updateProgressVisuals();

    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
        currentSeconds--;
        updateProgressVisuals();

        if (currentSeconds <= 0) {
            clearInterval(countdownTimer);
            fetchRate();
        }
    }, 1000);
}

function updateProgressVisuals() {
    const percentage = (currentSeconds / UPDATE_INTERVAL) * 100;
    elements.progressBar.style.transform = `scaleX(${percentage / 100})`;
    elements.countdown.textContent = currentSeconds;

    // The user requested the progress bar to stay the same color and not change to warning/danger
    elements.progressBar.className = 'progress-bar';
}

elements.retryBtn.addEventListener('click', fetchRate);
subscribe(updateUI);
resetProgressBar();
fetchRate();

window.addEventListener('online', () => {
    document.getElementById('offline-banner').classList.add('hidden');
    fetchRate();
});
window.addEventListener('offline', () => {
    document.getElementById('offline-banner').classList.remove('hidden');
});
