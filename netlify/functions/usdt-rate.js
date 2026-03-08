exports.handler = async () => {
    try {
        const token = process.env.BRAPI_TOKEN;
        if (!token) {
            console.error("BRAPI_TOKEN is not defined in environment variables");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: true, message: "Token de API não configurado no servidor." })
            };
        }

        // Usando o endpoint de crypto, e o fetch nativo do Node 18+ (sem axios).
        // Isso resolve o problema de dependências no deploy Drag and Drop.
        const response = await fetch(`https://brapi.dev/api/v2/crypto?coin=USDT&currency=BRL&token=${token}`);

        if (!response.ok) {
            const errText = await response.text();
            console.error("Brapi Error Response Data:", errText);
            console.error("Brapi Error Response Status:", response.status);
            throw new Error(`Brapi API error: ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error("Erro na chamada à Brapi:", error.message);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: true, message: "Erro ao buscar cotação." })
        };
    }
};
