# KWスプレッドシート 消化ステータス台帳

このファイルはスケジュールタスク `corp-site-daily-article` の作業記録です。
**サイトのコンテンツではありません。**デプロイ対象から外して問題ありません（.gitignore推奨）。

- 最終更新：2026-09-26（運用方式変更：スプシBは完了、スプシ①に切替）
- ステータスの定義
  - `作成済み` … そのKWの検索意図を主題として扱う記事が存在する
  - `要リライト` … 記事はあるが、実在他社の社名比較表が無く「会社/おすすめ/比較」系の検索意図を満たしていない
  - `一部カバー` … 近い記事はあるが主題がずれている。新規作成の候補
  - `未着手` … 該当記事なし
- **正となるのは常に実際の `column/` 配下の記事。**このファイルは毎回の突合を速くするための補助。
- 記事を作成・リライトしたら、その回の最後にこのファイルの該当行を必ず更新すること。

---

## スプシA：AIO/LLMO/SEO顕在KW（全45行）

作成済み19／要リライト0／一部カバー8／未着手18

| 行 | 検索キーワード | ステータス | 該当記事 | メモ |
|---|---|---|---|---|
| 1 | AIO対策 | 作成済み | column/seo/aio-taisaku-guide/ | |
| 2 | AIO対策 会社 | 作成済み | column/seo/aio-company-selection/ | 2026-09-21におすすめ6選へリライト |
| 3 | AIO対策 おすすめ | 作成済み | column/seo/aio-company-selection/ | 同記事がおすすめ形式でカバー |
| 4 | AIO対策 比較 | 作成済み | column/seo/aio-service-comparison/ | 2026-09-22に「おすすめ5社」へリライト。社名比較表＋個別セクション追加 |
| 5 | AIO対策 コンサル | 作成済み | column/seo/aio-consulting-guide/ | 2026-09-23に新規作成。支援内容6項目・コンサルと運用代行の境界線・費用相場3パターン・内製外注判断軸 |
| 6 | AIO対策 運用代行 | 作成済み | column/seo/aio-unyo-daiko-guide/ | 2026-09-26に新規作成。業務範囲7項目・導入フロー・料金体系3パターン・向いている会社/向かない会社 |
| 7 | AIO対策 外注 | 作成済み | column/seo/aio-inhouse-vs-outsource/ | |
| 8 | AIO対策 費用 | 作成済み | column/seo/aio-llmo-cost/ | |
| 9 | AIO対策 相場 | 作成済み | column/seo/aio-llmo-cost/ | |
| 10 | AIO対策 料金 | 作成済み | column/seo/aio-llmo-cost/ | |
| 11 | AIO コンサル 費用 | 一部カバー | column/seo/aio-llmo-cost/ | 2026-09-23作成のaio-consulting-guideで費用相場3パターンの概要はカバーしたが、コンサル費用に特化した深掘り記事はまだ無い |
| 12 | LLMO対策 | 作成済み | column/web-marketing/ai-search-llmo-guide/ | |
| 13 | LLMO対策 会社 | 作成済み | column/seo/aio-company-selection/ | |
| 14 | LLMO対策 おすすめ | 作成済み | column/seo/aio-company-selection/ | |
| 15 | LLMO対策 比較 | 作成済み | column/seo/aio-service-comparison/ | 同記事がコンサル型／ツール型／運用型の3分類＋社名比較表でカバー |
| 16 | LLMO対策 コンサル | 未着手 | | |
| 17 | LLMO対策 運用代行 | 未着手 | | |
| 18 | LLMO対策 外注 | 作成済み | column/seo/aio-inhouse-vs-outsource/ | |
| 19 | LLMO対策 費用 | 作成済み | column/seo/aio-llmo-cost/ | |
| 20 | LLMO対策 相場 | 作成済み | column/seo/aio-llmo-cost/ | |
| 21 | GEO対策 | 未着手 | | GEOを主題にした記事なし |
| 22 | GEO対策 会社 | 未着手 | | 社名リスト必要 |
| 23 | GEO対策 おすすめ | 未着手 | | 社名リスト必要 |
| 24 | GEO対策 コンサル | 未着手 | | |
| 25 | GEO対策 費用 | 未着手 | | GEO表記の費用記事なし |
| 26 | AI検索 対策 | 作成済み | column/web-marketing/ai-search-llmo-guide/ | |
| 27 | AI検索 最適化 | 一部カバー | column/web-marketing/ai-search-llmo-guide/ | |
| 28 | AI検索 対策 会社 | 未着手 | | 社名リスト必要 |
| 29 | AI検索 コンサル | 未着手 | | |
| 30 | AI検索 対策 費用 | 一部カバー | column/seo/aio-llmo-cost/ | AI検索対策の表記なし |
| 31 | ChatGPT SEO対策 | 未着手 | | |
| 32 | ChatGPT 検索 対策 | 未着手 | | |
| 33 | ChatGPT 表示 対策 | 未着手 | | |
| 34 | ChatGPT 引用 対策 | 一部カバー | column/seo/check-ai-citation/ | 既存は確認方法。引用される対策は未 |
| 35 | ChatGPT おすすめ 表示 会社 | 一部カバー | column/seo/ai-recommended-marketing-companies/ | 既存は調査結果。表示させる方法は未 |
| 36 | AI Overview 対策 | 未着手 | | |
| 37 | Google AIモード 対策 | 一部カバー | column/seo/google-vs-ai-search-comparison/ | 既存は調査。対策は未 |
| 38 | AIO LLMO 違い | 一部カバー | column/seo/aio-taisaku-guide/ | 違いを主題にした記事なし |
| 39 | AIO GEO 違い | 未着手 | | |
| 40 | LLMO SEO 違い | 未着手 | | |
| 41 | AIO SEO 違い | 作成済み | column/seo/aio-taisaku-guide/ | |
| 42 | AIO対策 ツール | 未着手 | | ツール比較記事なし |
| 43 | LLMO対策 ツール | 未着手 | | ツール比較記事なし |
| 44 | AIO対策 東京 | 未着手 | | 地域KWの記事なし |
| 45 | LLMO対策 東京 | 未着手 | | 地域KWの記事なし |

---

## スプシB：広告運用代行KW（全39行）※2026-09-26 ユーザー判断により完了・追跡終了

作成済み24／要リライト0／一部カバー4／未着手11

| 行 | 検索キーワード | ステータス | 該当記事 | メモ |
|---|---|---|---|---|
| 1 | 広告運用代行 | 作成済み | column/advertising/ad-agency-comparison-guide/ | |
| 2 | 広告運用代行 おすすめ | 作成済み | column/advertising/ad-agency-recommended/ | 2026-09-22に新規作成。社名比較表6社＋個別セクション |
| 3 | 広告運用代行 会社 | 作成済み | column/advertising/ad-agency-recommended/ | 実名リストの検索意図は新記事でカバー。comparison-guideは「とは」軸で維持 |
| 4 | 広告運用代行 比較 | 作成済み | column/advertising/ad-agency-recommended/ | 同上。費用・最低予算・対応媒体・支援範囲の4軸比較表あり |
| 5 | 広告運用代行 安い | 作成済み | column/advertising/cheap-ad-agency-comparison/ | 2026-09-23にリライト。実在6社（グラタス・アドバインド・カルテット・ジャックアンドビーンズ・クロスバズ・LnX）の社名比較表＋個別セクションを追加 |
| 6 | 広告運用代行 少額 | 作成済み | column/advertising/small-budget-ad-outsourcing/ | |
| 7 | 広告運用代行 中小企業 | 作成済み | column/advertising/ad-agency-sme-recommended/ | 2026-09-26に新規作成。ASUE・ヴァンテージマネジメント・グラッドキューブ・ジオコード・プライムナンバーズ＋LnXの社名比較表＋個別セクション |
| 8 | 広告運用代行 費用 | 作成済み | column/advertising/ad-agency-cost-guide/ | 2026-09-26に新規作成（費用/相場/手数料をまとめて消化） |
| 9 | 広告運用代行 相場 | 作成済み | column/advertising/ad-agency-cost-guide/ | 2026-09-26に新規作成（8行目と同記事） |
| 10 | 広告運用代行 手数料 | 作成済み | column/advertising/ad-agency-cost-guide/ | 2026-09-26に新規作成（8行目と同記事） |
| 11 | 広告運用 外注 費用 | 作成済み | column/advertising/ad-inhouse-breakeven/ | |
| 12 | 広告運用代行 選び方 | 作成済み | column/web-marketing/how-to-choose-ad-agency/ | |
| 13 | 広告運用代行 メリット デメリット | 作成済み | column/advertising/outsource-ad-merit-demerit/ | |
| 14 | 広告代理店 運用 手数料 | 作成済み | column/advertising/ad-agency-cost-guide/ | 2026-09-26に新規作成。8〜10行目と同記事で消化（同一検索意図と判断） |
| 15 | 広告運用 代理店 乗り換え | 作成済み | column/advertising/ad-agency-switch-timing/ | |
| 16 | Web広告 運用代行 | 作成済み | column/advertising/web-ad-outsourcing-guide/ | 2026-09-26に新規作成。対応媒体の全体像・業務範囲6項目・依頼の流れ |
| 17 | Web広告 運用代行 おすすめ | 作成済み | column/advertising/web-ad-agency-recommended/ | 2026-09-26に新規作成。アユダンテ・オプト・CyberACE・ソウルドアウト・デジタリフト＋LnXの社名比較表 |
| 18 | Web広告 運用代行 費用 | 一部カバー | column/advertising/ad-agency-comparison-guide/ | |
| 19 | Web広告 代理店 おすすめ | 作成済み | column/advertising/web-ad-agency-recommended/ | 2026-09-26に新規作成。17行目と同記事（表記違いのみ） |
| 20 | インターネット広告 代理店 おすすめ | 作成済み | column/advertising/web-ad-agency-recommended/ | 2026-09-26に新規作成。17行目と同記事（表記違いのみ） |
| 21 | Meta広告 運用代行 | 作成済み | column/advertising/meta-ads-outsourcing-scope/ | 2026-09-26に新規作成。業務範囲6項目・依頼の流れ・自社運用との判断軸 |
| 22 | Meta広告 運用代行 おすすめ | 作成済み | column/advertising/meta-ads-agency-recommended/ | 2026-09-26に新規作成。アノマリーマーケティング・Shinker・デジマール・バリューエージェント・Five＋LnXの社名比較表 |
| 23 | Meta広告 代理店 おすすめ | 作成済み | column/advertising/meta-ads-agency-recommended/ | 2026-09-26に新規作成。22行目と同記事（表記違いのみ） |
| 24 | Meta広告 運用代行 費用 | 作成済み | column/advertising/meta-ads-cost/ | |
| 25 | Instagram広告 運用代行 | 一部カバー | column/advertising/instagram-ads-cost/ | 費用軸のみ。運用代行は未 |
| 26 | Facebook広告 運用代行 | 未着手 | | |
| 27 | リスティング広告 運用代行 | 一部カバー | column/advertising/listing-ads-cost/ | 費用軸のみ。支援内容は未 |
| 28 | リスティング広告 運用代行 おすすめ | 未着手 | | 社名リスト必要 |
| 29 | リスティング広告 代理店 おすすめ | 未着手 | | 社名リスト必要 |
| 30 | リスティング広告 運用代行 費用 | 作成済み | column/advertising/listing-ads-cost/ | |
| 31 | リスティング広告 運用代行 少額 | 一部カバー | column/advertising/small-budget-ad-outsourcing/ | 媒体別では未 |
| 32 | Google広告 運用代行 | 未着手 | | |
| 33 | Google広告 代理店 おすすめ | 未着手 | | 社名リスト必要 |
| 34 | Google広告 運用代行 費用 | 未着手 | | |
| 35 | SNS広告 運用代行 | 未着手 | | |
| 36 | SNS広告 運用代行 おすすめ | 未着手 | | 社名リスト必要 |
| 37 | SNS広告 運用代行 費用 | 未着手 | | |
| 38 | 広告運用代行 東京 | 未着手 | | 地域KWの記事なし |
| 39 | Web広告 代理店 東京 | 未着手 | | 地域KWの記事なし |

---

## スプシ①：広告運用代行シート（Google Keyword Plannerベース・新規追加 2026-09-26）

URL: https://docs.google.com/spreadsheets/d/1YPnb1N7CUmTAVhDuK-HosQ4Incg72eFLPNZ5SN7Kds4/edit?gid=1668076685

- スプシBに代わり、こちらを広告運用代行カテゴリのKWソースとする。
- 列構成：No / キーワード / 月間平均検索ボリューム / 広告競合性 / 入札単価（低） / 入札単価（高） / 検索意図 / 優先度 / 推奨ページ／コンテンツ
- 「推奨ページ／コンテンツ」列が「専用LP」「サービスLP」となっている行も、LPは作らずコラム記事に置き換えて対応する（2026-09-26にユーザーと合意）。
- 会社比較が必要な記事は、実際に検索して上位記事の掲載社数・詳細度を確認し、それと同等以上の粒度（目安10〜15社、全社に個別セクション）で作成する（2026-09-26にユーザーと合意。当初6社で作成し「勝てる記事になっていない」と指摘を受けて方針変更）。
- 記事内の「LnX支援実績」（result-figure）に使う画像・実績数値は、必ず画像マスタ（https://docs.google.com/spreadsheets/d/1Gjlh1yBbngSgDcFKbglPKeEMKo2LlneK9Z39r7Vfvzg/edit?gid=1145944281 の「05_画像マスタ」シートのみ。同ブック内の他シートは古い情報のため絶対に参照しない）で画像ファイル・事例名・実績数値を確認してから使う。その記事のテーマに合う実在の事例が画像マスタにない場合は、無理に他媒体の事例を流用したり数値を創作したりせず、result-figureセクション自体を省略する（2026-09-26にユーザー指摘：Facebook広告記事にリスティング広告の実績が誤って使われていた等のミスがあり方針を明文化。TikTok/LINE記事は該当事例なしのためresult-figureを削除、Facebook記事はwork20.webp／人材紹介META広告事例に差し替え、Google/Yahoo記事は「リスティング広告全般に共通する話」という表現に修正して媒体名を過大に断定しないよう調整）。

上から10行の判定結果：

| 行 | キーワード | 判定 | 該当記事 | メモ |
|---|---|---|---|---|
| 1 | リスティング広告 代行 | 新規作成 | column/advertising/listing-ads-agency-recommended/ | 2026-09-26作成。実在13社（ADrim・アナグラム・オンジン・カルテットコミュニケーションズ・グラッドキューブ・クロスバズ・ジオコード・ジャックアンドビーンズ・StockSun・デジタルトレンズ・マイスタースタジオ・メディックス）＋LnXの社名比較表＋個別セクション |
| 2 | リスティング広告 運用代行 | 新規作成 | column/advertising/listing-ads-agency-recommended/ | 1行目と同記事で消化（同一検索意図） |
| 3 | web広告 運用代行 | 作業不要 | column/advertising/web-ad-outsourcing-guide/ | 2026-09-26作成済み（本タスク着手前に別件で対応済み） |
| 4 | 広告運用代行 | 作業不要 | ad-lp／column/advertising/ad-agency-comparison-guide/ | 既存のサービスLPと解説記事でカバー済み |
| 5 | Meta広告 運用代行 | 作業不要 | column/advertising/meta-ads-outsourcing-scope/ | 2026-09-26作成済み（本タスク着手前に別件で対応済み） |
| 6 | SNS広告 運用代行 | 新規作成 | column/advertising/sns-ads-agency-recommended/ | 2026-09-26作成、同日ユーザー指摘で12社に拡充。実在12社（ADrim・CyberACE・Union・オプト・ガイアックス・グラッドキューブ・デジタリフト・デジタルアイデンティティ・ニュートラルワークス・フルスピード・プロモスト・ライトアップ）＋LnXの社名比較表 |
| 7 | Google広告 運用代行 | 新規作成 | column/advertising/google-ads-agency-recommended/ | 2026-09-26作成。実在13社＋LnXの社名比較表（リスティング記事と一部会社が重複、Google広告特化の切り口で再構成）。同日、タイトルの社数表記バグ（13選→正しくは14選）を発見・修正 |
| 8 | Instagram広告 運用代行 | 新規作成 | column/advertising/instagram-ads-agency-recommended/ | 2026-09-26作成、同日ユーザー指摘で11社に拡充。実在11社（ASUE・アナグラム・Five・サイバーホルン・Shinker・グラッドキューブ・pamxy・バリューエージェント・ユニアド・ユナイテッドアニマルズ・デジマール）＋LnXの社名比較表 |
| 9 | 広告運用代行 相場 | 作業不要 | column/advertising/ad-agency-cost-guide/ | 2026-09-26作成済み（本タスク着手前に別件で対応済み） |
| 10 | 広告運用代行 費用 | 作業不要 | column/advertising/ad-agency-cost-guide/ | 同上 |

上から10行はすべて判定・対応完了。

11〜30行目（優先度B・C）の判定結果：

| 行 | キーワード | 判定 | 該当記事 | メモ |
|---|---|---|---|---|
| 11 | 広告運用 インハウス支援 | 作業不要 | column/advertising/ad-inhouse-breakeven/ | 内製化と外注の損益分岐点記事で「インハウス支援」の検索意図をカバー済みと判断 |
| 12 | TikTok広告 運用代行 | 新規作成 | column/advertising/tiktok-ads-agency-recommended/ | 2026-09-26作成。実在14社（アナグラム・アンドゼン・ウィニングフィールド・オーリーズ・サイバーホルン・デジマール・ニュートラルワークス・フルスピード・メディアエイド・COUNTER・pamxy・StockSun・THECOO・Yaaha）＋LnXの社名比較表 |
| 13 | 広告運用 外注 | 作業不要 | column/advertising/outsource-ad-merit-demerit/ | 外注のメリット・デメリット記事で検索意図をカバー済みと判断 |
| 14 | 広告運用代行 フリーランス | 新規作成 | column/advertising/ad-agency-vs-freelance/ | 2026-09-26作成。会社比較ではなく「フリーランスvs代理店」の5軸比較＋リスク対策ガイド記事（推奨コンテンツ欄の指示どおり） |
| 15 | Facebook広告 運用代行 | 新規作成 | column/advertising/facebook-ads-agency-recommended/ | 2026-09-26作成。実在14社（ニュートラルワークス・ダブルループ・TONOSAMA・フルスピード・オルグロー・カルテットコミュニケーションズ・デジタルアスリート・キーワードマーケティング・Union・プライムナンバーズ・アイズ・ブランディングテクノロジー・ストラテジックマーケティング・LIFE PEPPER）＋LnXの社名比較表。既存のMeta/Instagram記事とは会社の重複なし |
| 16 | LINE広告 運用代行 | 新規作成 | column/advertising/line-ads-agency-recommended/ | 2026-09-26作成。実在13社（グラッドキューブ・ユニアド・ArtsWeb・アナグラム・Lifunext・タガタメ・プライムナンバーズ・キーワードマーケティング・ユニークワン・D2CR・ASUE・デジタルアスリート・フルスピード）＋LnXの社名比較表。LINE公式アカウント運用のみの会社は除外し「LINE広告（有料広告）」明記の会社のみ採用 |
| 17 | Yahoo広告 運用代行 | 新規作成 | column/advertising/yahoo-ads-agency-recommended/ | 2026-09-26作成。実在14社（デジタルアスリート・GMOコマース・デジタルアイデンティティ・ユニアド・デジマール・いつも・Lifunext・ソウルドアウト・アナグラム・カルテットコミュニケーションズ・グラッドキューブ・ジオコード・メディックス・StockSun）＋LnXの社名比較表。リスティング記事と6社重複（再利用可の方針どおり）、8社は新規 |
| 18 | 広告代理店 | 作業不要 | ー | シート側メモで優先度C・「狙わない（参考値）」指定。対応見送り |
| 19 | 広告運用 | 作業不要 | ー | シート側メモで優先度C・ピラー記事候補だが中長期扱い。今回は対応見送り |
| 20 | リスティング広告 代理店 | 作業不要 | column/advertising/listing-ads-agency-recommended/ | シート側メモで優先度C・「中長期で狙う（LP強化後）」指定。既存のリスティング比較記事で当面カバーと判断 |
| 21 | Google広告 代理店 | 作業不要 | column/advertising/google-ads-agency-recommended/ | 同上。既存のGoogle広告比較記事で当面カバーと判断 |
| 22 | web広告 代理店 | 作業不要 | column/advertising/web-ad-agency-recommended/ | シート側メモで優先度C・「中長期で狙う」指定。既存記事で当面カバーと判断 |
| 23 | 広告運用代行 手数料 | 作業不要 | ー | シート側メモで「KPで結果なし（類似語に統合）→参考扱い」指定 |
| 24 | 広告運用代行 少額 | 作業不要 | column/advertising/small-budget-ad-outsourcing/ | 同上。既存の少額予算向け記事で類似語をカバー |
| 25 | 広告運用代行 成果報酬 | 作業不要 | ー | シート側メモで「KPで結果なし（類似語に統合）→参考扱い」指定 |
| 26 | 広告運用代行 おすすめ | 作業不要 | column/advertising/ad-agency-recommended/ | 同上。既存の総合おすすめ記事で類似語をカバー |
| 27 | 広告運用代行 比較 | 作業不要 | column/advertising/ad-agency-comparison-guide/ | 同上。既存の比較ガイド記事で類似語をカバー |
| 28 | 運用型広告 代行 | 作業不要 | ー | シート側メモで「KPで結果なし（類似語に統合）→参考扱い」指定 |
| 29 | 広告運用代行 中小企業 | 作業不要 | column/advertising/ad-agency-sme-recommended/ | 同上。既存の中小企業向け記事で類似語をカバー |
| 30 | クリニック 広告運用 | 作業不要 | ー | シート側メモで「KPで結果なし（類似語に統合）→参考扱い」指定。業種特化の需要が確認できないため対応見送り |

スプシ①（全30行）の判定・対応が完了。新規作成7本（リスティング・SNS・Google・Instagram・TikTok・Facebook・LINE・Yahoo・フリーランスvs代理店＝実質9記事、うち一部は同一記事で複数行を消化）、作業不要19行（既存記事でカバー済み、またはシート側で優先度C＝中長期/参考扱いに指定）。

## 次に着手する順番（2026-09-26 スプシ①全30行完了後）

スプシ①（広告運用代行シート）は全30行の判定・対応が完了。次回はスプシAの残タスクを上から順に対応する。

1. スプシA 11行目「AIO コンサル 費用」（一部カバー・新規：コンサル費用に特化した深掘り記事、またはaio-llmo-costに章追加）
2. スプシA 16〜17行目「LLMO対策 コンサル／運用代行」（未着手・新規。aio-consulting-guideと同型でLLMO表記に寄せる）
3. スプシA 21〜25行目「GEO対策」系（未着手・新規。GEO表記での言い換え記事群）

## 記事フォーマットの決定事項（2026-09-21にユーザーと合意）

- タイトルは「◯◯おすすめN選｜…」の形にする
- 比較表に加えて、**1社ずつH3の個別セクション**を置く（公式サイトリンク＋特徴2段落＋highlight-cardで「向いているケース／注意点」）
- 各社の**コーポレートサイトURLとサービスページURLの両方**を載せる
- 実装の見本：`column/seo/aio-company-selection/`
