# PTCGWebTraining — 前端

簡介
- PTCG (Pokemon TCG) 練習用前端專案，包含卡牌搜尋、Deck 建構與清單管理功能。
- 技術棧（範例）：React、Vite（或 CRA）、SCSS Modules、Axios、ESLint。

快速開始（Windows / PowerShell）
1. 取出專案並安裝 package.json 內的依賴
```powershell
cd c:\Users\eason\OneDrive\Desktop\git\PTCGWebTraining
npm install
```

2. 啟動開發伺服器
```powershell
npm run dev   # 或 npm start，視 package.json scripts 而定
```

必要與建議的額外套件（若 package.json 未包含）
- 執行上面 `npm install` 若已包含即可；若第一次下載後編輯器或建置報錯，可額外安裝下列常見套件：

執行範例（生產與執行相關）
```powershell
npm install axios react-router-dom sass
```

執行範例（開發/型別/建置相關）
```powershell
npm install -D typescript vite eslint eslint-plugin-import @eslint/js @types/react @types/react-dom @types/react-router-dom
```

- 說明：
  - axios：API 請求
  - react-router-dom：路由
  - sass：支援 .scss 檔案
  - typescript / @types/*：若專案包含 .ts/.tsx，建議安裝
  - vite：若專案使用 Vite，放在 devDependencies
  - eslint / eslint-plugin-import / @eslint/js：專案 ESLint 設定會用到

設定別名與 SCSS 型別
- 若使用「@」路徑別名，請確認 tsconfig.json 或 jsconfig.json 已設定：
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": { "@/*": ["*"] }
  },
  "include": ["src"]
}
```
- 若使用 Vite，請在 vite.config.ts 中加入 alias：
```ts
resolve: { alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }] }
```
- TypeScript 接受 SCSS module（建立 `src/global.d.ts`）：
```ts
declare module '*.module.scss';
declare module '*.module.css';
declare module '*.scss';
declare module '*.css';
```

專案結構概要
```
PTCGWebTraining/
├─ public/
│  └─ assets/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ pages/
│  ├─ styles/
│  └─ global.d.ts
├─ package.json
└─ tsconfig.json (或 jsconfig.json)
```
