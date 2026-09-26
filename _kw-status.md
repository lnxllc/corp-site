# KWスプレッドシート 消化ステータス台帳

このファイルはスケジュールタスク `corp-site-daily-article` の作業記録です。
**サイトのコンテンツではありません。**デプロイ対象から外して問題ありません（.gitignore推奨）。

- 最終更新：2026-09-26
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

## スプシB：広告運用代行KW（全39行）

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

## 次に着手する順番（2026-09-26 追加分反映後）

1. スプシA 11行目「AIO コンサル 費用」（一部カバー・新規：コンサル費用に特化した深掘り記事、またはaio-llmo-costに章追加）
2. スプシB 18行目「Web広告 運用代行 費用」（一部カバー。8〜10行目のad-agency-cost-guideに統合済みと見なせるか要確認。統合できなければ新規）
3. スプシA 16〜17行目「LLMO対策 コンサル／運用代行」（未着手・新規。aio-consulting-guideと同型でLLMO表記に寄せる）
4. スプシB 25行目「Instagram広告 運用代行」（一部カバー・新規：instagram-ads-costは費用軸のみのため支援範囲記事を検討）
5. スプシB 27行目「リスティング広告 運用代行」（一部カバー・新規：listing-ads-costは費用軸のみのため支援範囲記事を検討）
6. スプシA 21〜25行目「GEO対策」系（未着手・新規。GEO表記での言い換え記事群）
7. スプシB 28〜29行目「リスティング広告 運用代行／代理店 おすすめ」（未着手・新規：社名比較記事）
8. スプシB 32〜34行目「Google広告 運用代行」系（未着手・新規）

## 記事フォーマットの決定事項（2026-09-21にユーザーと合意）

- タイトルは「◯◯おすすめN選｜…」の形にする
- 比較表に加えて、**1社ずつH3の個別セクション**を置く（公式サイトリンク＋特徴2段落＋highlight-cardで「向いているケース／注意点」）
- 各社の**コーポレートサイトURLとサービスページURLの両方**を載せる
- 実装の見本：`column/seo/aio-company-selection/`
