import { state } from './api.js';

const brlInput = document.getElementById('brl-input');
const usdtInput = document.getElementById('usdt-input');
const swapBtn = document.getElementById('swap-btn');
const brlGroup = document.querySelector('.input-group:nth-child(1)');
const usdtGroup = document.querySelector('.input-group:nth-child(3)');

let activeInput = 'brl';
let isSwapped = false;

function formatNumber(value) {
    if (!value) return '';
    return value.replace(/\./g, '').replace(',', '.');
}

function updateConversion(source) {
    if (!state.bidPrice) return;

    if (source === 'brl') {
        const brlVal = parseFloat(formatNumber(brlInput.value));
        if (isNaN(brlVal)) {
            usdtInput.value = '';
        } else {
            usdtInput.value = (brlVal / state.bidPrice).toFixed(2).replace('.', ',');
        }
    } else if (source === 'usdt') {
        const usdtVal = parseFloat(formatNumber(usdtInput.value));
        if (isNaN(usdtVal)) {
            brlInput.value = '';
        } else {
            const val = (usdtVal * state.bidPrice).toFixed(2);
            brlInput.value = val.replace('.', ',');
        }
    }
}

brlInput.addEventListener('input', () => {
    activeInput = 'brl';
    updateConversion('brl');
});

usdtInput.addEventListener('input', () => {
    activeInput = 'usdt';
    updateConversion('usdt');
});

[brlInput, usdtInput].forEach(input => {
    input.addEventListener('keydown', (e) => {
        // If user types dot, replace with comma for better locale input
        if (e.key === '.') {
            e.preventDefault();
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const val = input.value;
            input.value = val.substring(0, start) + ',' + val.substring(end);
            input.setSelectionRange(start + 1, start + 1);
            input.dispatchEvent(new Event('input'));
        }
    });
});

swapBtn.addEventListener('click', () => {
    isSwapped = !isSwapped;
    swapBtn.classList.toggle('rotated', isSwapped);

    if (isSwapped) {
        brlGroup.style.order = 3;
        usdtGroup.style.order = 1;
    } else {
        brlGroup.style.order = 1;
        usdtGroup.style.order = 3;
    }
});

export function recomputeValues() {
    updateConversion(activeInput);
}
