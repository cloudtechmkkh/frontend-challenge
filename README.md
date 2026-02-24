# frontend-challenge

採用課題として作成したページ管理アプリケーションのフロントエンド実装です。

## 📋 プロジェクト概要

このプロジェクトは、ページの作成・編集・削除機能を持つシンプルなCMSのフロントエンド部分です。サイドバーで全ページを一覧表示し、メインエリアでタイトルと本文の編集が可能です。

## ✨ 主な機能

- **ページ一覧表示**: サイドバーに全ページをリスト表示
- **ページ作成**: 「+」ボタンから新規ページを作成し、作成後は該当ページにリダイレクト
- **ページ削除**: 各ページの削除アイコン（ゴミ箱）から削除
- **ページ編集**: タイトルと本文をメインエリアで編集し、保存後は該当ページにリダイレクト
- **バリデーション**: 
  - タイトル: 1〜50文字
  - 本文: 10〜2000文字
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- **モバイルメニュー**: md未満でハンバーガーメニュー表示、md以上で非表示

## 🛠️ 技術スタック

### フロントエンド (`frontend/`)
- **フレームワーク**: Next.js 16.1.6 (App Router)
- **言語**: TypeScript 5
- **UIライブラリ**: 
  - React 19.2.3
  - Material-UI 7 (アイコン・Tooltip)
  - shadcn/ui (Sheet コンポーネント)
  - Tailwind CSS 4
  - Lucide React (アイコン)
- **バリデーション**: Zod 4
- **テスト**: Vitest + Testing Library
- **状態管理**: React Server Actions + `useActionState`

### バックエンド (`recruit-frontend/`)
- **フレームワーク**: NestJS
- **データベース**: SQLite (TypeORM)
- **API**: RESTful API

## 🚀 セットアップ & 実行方法

### 前提条件
- Node.js 20以上
- npm または yarn

### 1. バックエンドAPIの起動

```bash
cd recruit-frontend
npm install
npm run start:dev
```

APIは `http://localhost:3001` で起動します。

### 2. フロントエンドの起動

```bash
cd frontend
npm install
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

### 3. テストの実行

```bash
cd frontend
npm run test
```

## 📐 設計・実装のポイント

### アーキテクチャ
- **Server Components優先**: データ取得はServer Componentsで実行し、パフォーマンスを最適化
- **Server Actions**: フォーム送信にServer Actionsを活用し、クライアントサイドのJavaScriptを最小化
  - 保存成功時は`redirect()`で自動リダイレクト
  - リダイレクト例外はcatchで検知して再throwし、Next.jsが処理
- **コンポーネント分割**: 再利用可能な粒度でコンポーネントを設計（`Sidebar`, `SidebarItem`, `Main`, `Icons`, `MobileNav`）

### バリデーション戦略
- **クライアント・サーバー両方でバリデーション**: Zodスキーマを共有し、二重チェック
- **ユーザーフレンドリーなエラー表示**: フィールドごとにエラーメッセージを表示

### スタイリング
- **Tailwind CSS**: ユーティリティファーストで保守性の高いスタイル
- **デザイン仕様準拠**: Noto Sans JPフォント、指定されたカラーパレット(`#F5F8FA`, `#9CD5FF`等)を使用
- **レスポンシブ対応**: `grid`レイアウトでブレークポイント対応

### コード品質
- **TypeScript**: 型安全性を確保
- **ユニットテスト**: MainForm コンポーネントの基本機能・条件分岐を網羅したテストを実装（Vitest + Testing Library）
- **ESLint**: Next.js推奨設定でコード品質を維持

## 🎨 UI/UX の工夫

- **即座のフィードバック**: 保存やエラー時に状態を明確に表示
- **直感的な操作**: ボタンにTooltipを追加し、操作意図を明示
- **アクセシビリティ**: セマンティックHTMLとARIA属性の適切な使用

## 📂 ディレクトリ構成

```
frontend/
├── src/
│   ├── app/
│   │   ├── (dashboard)/       # メインページグループ
│   │   └── layout.tsx          # ルートレイアウト
│   ├── components/
│   │   ├── Main.tsx            # メインエリアフォーム
│   │   ├── Sidebar.tsx         # サイドバー
│   │   ├── SidebarItem.tsx     # サイドバー項目
│   │   ├── Icons.tsx           # アイコンボタン
│   │   ├── mobile-nav.tsx      # モバイル用ハンバーガーメニュー
│   │   ├── ui/                 # shadcn/uiコンポーネント
│   │   └── __tests__/          # テストファイル
│   └── lib/
│       ├── contents.ts         # API連携ロジック（Server Actions）
│       └── validations/        # Zodスキーマ
└── public/img/icon/            # アイコン画像

recruit-frontend/               # バックエンドAPI（提供済み）
```

## 🔍 追加実装した機能

課題要件に加えて、以下を追加実装しました：

1. **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
2. **モバイルナビゲーション**: md未満でハンバーガーメニュー表示、md以上で非表示（shadcn/ui Sheet使用）
3. **自動リダイレクト**: 新規作成・編集成功時に該当ページに自動リダイレクト
4. **エラーハンドリング**: 
   - バリデーションエラー時はフィールドごとにメッセージ表示
   - ネットワークエラーのキャッチと適切なエラー通知
   - Server ActionsのNEXT_REDIRECT例外を適切に処理
5. **アクセシビリティ**: キーボード操作、セマンティックHTML、Tooltip追加

## 📝 今後の改善案

- ページのドラッグ&ドロップによる並び替え
- マークダウンエディタの統合
- ページ検索機能
- ダークモード対応
- E2Eテストの追加（Playwright等）

## 📄 ライセンス

This project is for recruitment assessment purposes.
