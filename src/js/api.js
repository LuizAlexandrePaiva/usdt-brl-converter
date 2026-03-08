export let state = {
    bidPrice: null,
    percentageChange: null,
    lastUpdate: null,
    isFetching: false,
    error: null
};

const listeners = [];

export function subscribe(listener) {
    listeners.push(listener);
}

function notify() {
    listeners.forEach(listener => listener(state));
}

export async function fetchRate() {
    if (state.isFetching) return;
    state.isFetching = true;
    notify();

    try {
        const response = await fetch('/.netlify/functions/usdt-rate');
        if (!response.ok) throw new Error('Falha na API');

        const data = await response.json();

        let coinData = null;
        if (data.currency && data.currency.length > 0) {
            coinData = data.currency[0];
        } else if (data.coins && data.coins.length > 0) {
            coinData = data.coins[0];
        } else {
            throw new Error('Formato inválido retornado pela API');
        }

        // Garantindo que bidPriceStr / changeStr tenha valor ou utilize fallback default para evitar NaN
        const bidPriceStr = coinData.regularMarketPrice || coinData.currencyRateFromUSD || coinData.bidPrice || coinData.bidCoin;
        // Na rota v2/crypto a variação vem como regularMarketChangePercent (ex: 0.241)
        const changeStr = coinData.regularMarketChangePercent || coinData.percentageChange || 0;

        const newBid = parseFloat(bidPriceStr);
        const newChange = parseFloat(changeStr);

        if (isNaN(newBid)) throw new Error("Valor extraido NaN");

        localStorage.setItem('usdt_last_rate', newBid);
        localStorage.setItem('usdt_last_change', newChange);
        localStorage.setItem('usdt_last_update', Date.now());

        state = {
            bidPrice: newBid,
            percentageChange: newChange,
            lastUpdate: new Date(),
            isFetching: false,
            error: null
        };

        const offlineBanner = document.getElementById('offline-banner');
        if (offlineBanner) offlineBanner.classList.add('hidden');

    } catch (error) {
        const cachedRate = localStorage.getItem('usdt_last_rate');
        if (cachedRate) {
            state = {
                bidPrice: parseFloat(cachedRate),
                percentageChange: parseFloat(localStorage.getItem('usdt_last_change') || 0),
                lastUpdate: new Date(parseInt(localStorage.getItem('usdt_last_update'))),
                isFetching: false,
                error: null
            };
            if (!navigator.onLine) {
                document.getElementById('offline-banner').classList.remove('hidden');
            }
        } else {
            state.isFetching = false;
            state.error = error.message;
        }
    }

    notify();
}
