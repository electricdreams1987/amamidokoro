# 東京甘味処マップ

東京の甘味処を、特徴、営業時間、画像候補、地図リンクから探せるWebアプリです。

## 技術スタック

- Next.js
- TypeScript
- Tailwind CSS
- Vercel

## 開発

npm install
npm run dev

## ビルド

npm run build

## 画像運用

外部画像の直リンクは禁止です。
公式許諾画像、自前撮影画像、商用利用可能素材を `public/images/shops/` に保存して使用します。
画像未取得の店舗はプレースホルダーを表示します。

## 地図運用

初期版ではGoogle Maps APIを使いません。
簡易マップUIとGoogle Maps外部リンクで実装します。
