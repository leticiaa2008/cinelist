# CineList 🎬
**Aluno 21 — Resenhas e Catálogo de Filmes Independentes**

Projeto inicial React + Vite + Capacitor preparado para a Atividade 16 — Personalização Nativa: Ícones e Splash Screens.

## Identidade visual
- Paleta: vinho escuro, preto e dourado.
- `assets/icon.png`: 1024 × 1024 px, fundo opaco.
- `assets/splash.png`: 2732 × 2732 px, logotipo centralizado.
- `capacitor.config.ts`: Splash Screen configurada.

## Requisitos
Instale Node.js 22 LTS e Android Studio com Android SDK.

## Como executar pela primeira vez
Abra o terminal dentro desta pasta (mesmo nível de `package.json`) e execute:

```bash
npm install
npm run build
npx capacitor-assets generate --android
npx cap add android
npx cap sync android
npx cap open android
```

**Importante:** `npx cap add android` cria a pasta nativa `android/`. Execute apenas uma vez. Se a pasta já existir, pule esse comando.

## Testar no navegador
```bash
npm run dev
```
Abra o endereço local mostrado pelo Vite.

## GitHub Actions
O workflow já está em `.github/workflows/android-build.yml`. Depois de gerar a pasta `android/`, faça commit dela junto com os demais arquivos e envie para a branch `main` ou `master`. O GitHub Actions compilará o APK em cada push.

Para baixar: GitHub → repositório → Actions → execução concluída → Artifacts → `meu-aplicativo-apk`.

## Observação
A pasta `android/` não é incluída neste ZIP porque é gerada pela ferramenta oficial do Capacitor no computador, usando o Android SDK. O comando `npx cap add android` cria a estrutura nativa correta para seu ambiente.
