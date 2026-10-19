# TCG GATE JAPAN — ECサイト デザインプロトタイプ　NORMAL（G案：FLIP）

紺・グレー・くすんだ金。ヘッダーの「買う／売る」で全カードが裏返り買取価格に。最新弾タイルは自動で表裏を切替

`index.html` をブラウザで開くと全ページを行き来できます（サーバー不要）。
カート・お気に入り・売却リスト・言語設定はブラウザ内（localStorage）に保存されるデモ動作です。

## 商品画像の入れ方（3サイト共通）

`assets/images/` に、下の商品IDと同じ名前のJPGを置くと、仮のカード画像が自動で写真に切り替わります（縦長 63:88、630×880px以上推奨）。

| ファイル名 | 商品 |
|---|---|
| m1.jpg | メガリザードンYex |
| m2.jpg | メガリザードンXex |
| m3.jpg | ロケット団のミュウツーex |
| m4.jpg | ブラッキーex |
| m5.jpg | ピカチュウex |
| m6.jpg | メガゲンガーex |
| m7.jpg | リーリエのピッピex |
| m8.jpg | ゼクロムex |
| m9.jpg | レシラムex |
| m10.jpg | パラダイスリゾート |
| p4.jpg | リザードンVMAX PSA10 |
| p7.jpg | 旧裏 リザードン |
| p8.jpg | ミミッキュ HR PSA10 |
| p9.jpg | ブースターex PSA10 |

使える写真は、TCG GATEが自店で撮影したもの、または利用許諾を得ている素材のみです。他店サイトや通販サイトの画像は使用しないでください。

## 商品データについて

商品名は実際の品ぞろえを参考にしたサンプル、価格・在庫・買取価格は仮の値です（assets/data.js）。リザードンVMAX・ミミッキュ・ブースターex（PSA10）、旧裏リザードン、買取価格表の4件は既存サイトのデータです。公開前に実在庫・実売価格へ差し替えてください。

## ページ一覧

| ファイル | ページ | 既存サイトでの位置づけ |
|---|---|---|
| index.html | トップ | トップ |
| buy.html | シングル販売（一覧） | 買いたい／カテゴリー／最新弾シリーズ |
| product.html?id=… | 商品詳細 | 商品詳細（PSA鑑定品はスラブ表示） |
| sell.html | 買取トップ | 売りたい（買取方法・買取の流れ） |
| price.html | 買取価格表 | 買取価格表 |
| shops.html | 店舗一覧 | 店舗 |
| cart.html | カート | ヘッダーのカート |
| contact.html?type=… | お問い合わせ・各種申込 | 問い合わせ／宅配キット／LINE査定／出張買取 |
| faq.html | よくある質問 | GUIDE > よくある質問 |
| legal.html | 利用規約・特商法・プライバシー | GUIDE |
| company.html | 企業情報・採用情報 | ABOUT |

## 遷移マップ（ボタン → 遷移先）

**ヘッダー（全ページ共通）**
- ロゴ → index.html
- トップ／買いたい／売りたい／店舗 → index.html／buy.html／sell.html／shops.html
- 検索（Enter） → buy.html?q=入力語（一覧を絞り込み表示）
- JP／EN → 表示言語を切替（ナビ・見出し・商品名など）
- カート → 右からカートドロワー → 「レジに進む」cart.html#checkout／「カートを見る」cart.html
- スマホ：メニューボタン → 全画面メニュー

**トップ（index.html）**
- 01 SELL 売りたい → sell.html
- 02 BUY 買いたい → buy.html
- ヒーローのカード3枚 → product.html?id=p5／p1／p4
- 最新弾シリーズ（M5〜H2） → buy.html?set=M5 など
- 新着シングルのカード → product.html?id=…／「＋」→ カートに追加
- 買取価格表を見る → price.html／買取について → sell.html
- 買取方法 01店頭 → shops.html／02宅配 → contact.html?type=kit／03LINE → contact.html?type=line／04出張 → contact.html?type=visit
- カテゴリー（PSA10〜BOX） → buy.html?cat=psa10 など
- 店舗（AKIHABARA等） → shops.html#akihabara など
- LINEで査定を始める → contact.html?type=line

**買いたい（buy.html）**
- カテゴリー／シリーズのチップ → その場で絞り込み（URLも ?cat= ?set= に更新）
- 並び替え・在庫ありのみ → その場で反映
- 商品カード → product.html?id=…／「＋」→ カートに追加

**商品詳細（product.html）**
- パンくず → index.html／buy.html／buy.html?cat=…
- カートに入れる → カートに追加（数量指定可）
- お気に入りに追加 → 保存（再訪時も保持）
- この商品について問い合わせる → contact.html?type=item&id=…（商品名を自動入力）
- 鑑定済カードの状態について → faq.html#grade
- 関連する商品 → product.html?id=…

**売りたい（sell.html）**
- 買取価格表を見る → price.html
- 無料宅配キットを申し込む → contact.html?type=kit
- 買取方法4種 → shops.html／contact.html?type=kit／type=line／type=visit
- LINEで査定を始める → contact.html?type=line

**買取価格表（price.html）**
- 検索・区分チップ → その場で絞り込み
- 売却リストに追加 → 下部バーに枚数・見込み額を合計
- 宅配キットを申し込む → contact.html?type=kit&sell=…（売却リストを自動入力）
- LINEで送る → contact.html?type=line

**店舗一覧（shops.html）**
- 地図を見る → Googleマップ（新しいタブ）／電話する → tel:リンク／店頭買取について → sell.html#methods

**カート（cart.html）**
- 数量 −／＋、削除 → その場で反映
- レジに進む → 本番ではShopifyチェックアウトへ（デモではメッセージ表示）

**フッター（全ページ共通）**
- SHOP：トップ／シングル販売／最新弾（buy.html?set=M5）／カテゴリー（buy.html#cats）
- BUY-BACK：買取トップ／買取方法（sell.html#methods）／買取の流れ（sell.html#flow）／買取価格表
- ABOUT：店舗一覧／企業情報／採用情報（company.html#recruit）／お問い合わせ
- GUIDE：利用規約（legal.html#terms）／特商法（#tokusho）／プライバシー（#privacy）／よくある質問

## デザイン仕様

- カラー：Ink #0E0E10／Paper #FFFFFF／Crimson #D7192A（＋面用の Mist #F2F1EE）
  色は商品カードに任せ、UIは白黒＋差し色1色に限定
- フォント：Unbounded（英字・数字）／Zen Kaku Gothic New（和文）
- 主なモーション：見出しのせり上がり、ホロ光沢のテキスト、カードの扇展開、
  シリーズ型番の袋文字マーキー、ホロ反射ホバー、商品詳細のカード傾き、数字のカウントアップ、
  スクロール表示、カートドロワー、売却スタンプ（OSの「視差効果を減らす」設定時は停止）

## 公開前に確認・差し替えが必要な項目


- 商品画像：すべて色付きの仮カード。撮影写真に差し替え（PSA品はスラブ写真）
- `[金額]`（送料無料ライン）・`[時刻]`（当日発送の締め）・発送休業日。カートの計算は仮で¥20,000（assets/data.js の freeShippingLine）
- 「100万点+」の買取実績：根拠データの確認（景品表示法）。根拠がなければ削除
- 住所・電話番号・古物商許可番号：既存サイトの値はダミーに見えるため要確認
  （既存フッターの福岡県許可番号が8件あり、福岡の店舗数2と合わない）
- 運営会社名（既存フッターの © Simpleasy Marketing Inc. を運営会社名に変更するか）
- LINE公式アカウントのURL、決済方法、返品条件、利用規約・プライバシーポリシー本文
- 英語版：メガガルゴexの正式英語名（[EN TBC]）

## Shopifyへの移行メモ

- assets/data.js の products → Shopify商品（状態・レアリティ・型番・収録弾はメタフィールド）
- cats／sets → コレクション（buy.html?cat= / ?set= はコレクションページに相当）
- buyback（買取価格表）→ メタオブジェクトまたは別ページ
- カート・チェックアウト → Shopify標準（Ajax Cart API でドロワーを再現可能）
- contact.html → Shopify標準フォームまたはフォームアプリ
