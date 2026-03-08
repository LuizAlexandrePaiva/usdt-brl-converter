# 💰 USDT/BRL Converter PWA

A modern, fast, and privacy-focused currency converter designed to provide real-time USDT (Tether) to BRL (Brazilian Real) conversion rates with premium aesthetics and high precision.

![Project Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-Vanilla_JS_|_Netlify_Functions-blue?style=for-the-badge)

---

## 🚀 Key Features

- **Real-Time Data**: Fetches the latest cryptocurrency market rates every 30 seconds via Brapi API.
- **Crypto-Centric Accuracy**: Prioritizes `regularMarketPrice` from major exchanges (like Binance) to ensure decimal precision.
- **PWA (Progressive Web App)**: Installable on mobile and desktop. Works offline using the last cached rate.
- **Premium Dark UI**: High-end aesthetic with glassmorphism, smooth animations, and responsive design.
- **Bi-directional Conversion**: Instantly switch between USDT to BRL and BRL to USDT.

## 🛠️ Technology Stack

- **Frontend**: 
  - Semantic HTML5
  - Modern Vanilla CSS (Custom properties, Flexbox/Grid)
  - ES6+ JavaScript Modules
- **Backend (Serverless)**: 
  - Netlify Functions (Node.js) to securely handle API requests and protect keys.
- **API Integration**: 
  - [Brapi.dev](https://brapi.dev/) for reliable market data.
- **Capabilities**:
  - Service Workers for offline support.
  - Web App Manifest for native installation.

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) (for local development)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LuizAlexandrePaiva/usdt-brl-converter.git
   cd usdt-brl-converter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   BRAPI_TOKEN=your_brapi_api_token
   ```

4. **Run Locally**:
   ```bash
   netlify dev
   ```
   Open `http://localhost:8888` in your browser.

## 🏗️ Architecture Note

The project utilizes **Netlify Functions** as a proxy layer. This design choice:
1.  **Protects the API Token**: Sensitive credentials are never exposed to the client-side.
2.  **Prevents CORS Issues**: Centralizes API communication through a serverless environment.
3.  **Lightweight Frontend**: Keeps the client-side bundle minimal and fast.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed by [Luiz]

