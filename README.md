# 💰 USDT/BRL Converter PWA

Um conversor de moedas moderno, rápido e focado em privacidade para converter USDT (Tether) para BRL (Real Brasileiro) em tempo real, utilizando taxas do mercado cripto.

![USDT Converter Preview](https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/usdt.svg)

## 🚀 Funcionalidades

- **Taxas em Tempo Real**: Busca cotações atualizadas a cada 30 segundos via Brapi API.
- **Precisão Cripto**: Prioriza o `regularMarketPrice` (taxa de corretoras como Binance) para garantir centavos precisos na conversão.
- **PWA (Progressive Web App)**: Pode ser instalado no celular ou desktop e funciona offline (usando a última cotação em cache).
- **Design Moderno**: Interface escura (Dark Mode) com estética premium e animações suaves.
- **Conversão Bidirecional**: Converta de USDT para BRL ou de BRL para USDT instantaneamente.

## 🛠️ Tecnologias

- **Frontend**: HTML5 Semântico, Vanilla CSS, JavaScript (ES6+ Modules).
- **Backend**: Netlify Functions (Node.js) para chamadas de API seguras.
- **API**: [Brapi.dev](https://brapi.dev/) para dados de mercado.
- **PWA**: Service Workers e Web Manifest.

## 📦 Como Rodar Localmente

1. **Clone o repositório (Privado)**:
   ```bash
   git clone https://github.com/SEU_USUARIO/usdt-converter.git
   cd usdt-converter
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as credenciais**:
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   BRAPI_TOKEN=seu_token_aqui
   ```

4. **Inicie o servidor de desenvolvimento**:
   Necessário ter o [Netlify CLI](https://docs.netlify.com/cli/get-started/) instalado.
   ```bash
   netlify dev
   ```
   Acesse em `http://localhost:8888`.

## 🌐 Deploy (Opcional)

Este projeto foi desenvolvido para ser hospedado via **Netlify**, utilizando **Netlify Functions** para garantir a segurança da chave de API. No entanto, ele pode ser adaptado para qualquer plataforma que suporte funções serverless.

> [!TIP]
> Para usar como portfólio no GitHub, você não precisa divulgar o link do site no "About" do repositório. O código por si só já demonstra suas habilidades com **JavaScript Moderno (ES6)**, **manipulação de APIs**, **PWAs** e **estilização avançada**.

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE). Sinta-se à vontade para usar, modificar e distribuir o código para fins de aprendizado ou portfólio.

