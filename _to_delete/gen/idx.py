# -*- coding: utf-8 -*-
import re
def card(cat, slug, tag, title, desc):
    return '''          <a class="article-card" href="https://lnx.co.jp/column/%s/%s/">
            <div class="article-card__head"><span class="article-card__tag">%s</span><p class="article-card__title">%s</p></div>
            <div class="article-card__body"><p class="article-card__desc">%s</p><span class="article-card__arrow">記事を読む →</span></div>
          </a>

''' % (cat, slug, tag, title, desc)
C1 = card('analytics','gtm-preview-not-connecting','計測・GA4','GTMのプレビューが接続できない原因と直し方｜Tag Assistantで確認する順番',
 'Googleタグマネージャーのプレビューで「接続済み」にならないときの原因を、コンテナコードの設置・ブラウザ側・サイト側に分けて解説。公式ヘルプに沿った10分チェックと、接続後にタグが動かないときの見方、相談の判断目安までまとめています。')
C2 = card('web-marketing','website-renewal-inquiries-dropped','Webマーケ戦略','ホームページのリニューアル後に問い合わせが減った原因と確認手順',
 'リニューアル後に問い合わせが減ったとき、「検索流入が減った」「流入は同じで減った」「数えられていない」の3パターンで切り分ける手順を解説。URL変更・リダイレクト・フォーム導線・計測タグの確認点と、直す順番、元に戻す判断の目安までまとめています。')
def rw(p, f):
    s = open(p, encoding='utf-8').read(); s2 = f(s); open(p,'w',encoding='utf-8').write(s2)
# category: analytics (append at end of grid)
def a_cat(s):
    i = s.index('ga4-search-console-link-guide/">'); j = s.index('</a>', i)+4
    s = s[:j] + '\n\n' + C1.rstrip('\n') + s[j:]
    return s.replace('記事 26本','記事 27本',1)
rw('column/analytics/index.html', a_cat)
def w_cat(s):
    i = s.index('<a class="article-card" href='); i = s.rfind('\n', 0, i)+1
    s = s[:i] + C2 + s[i:]
    return s.replace('記事 57本','記事 58本',1)
rw('column/web-marketing/index.html', w_cat)
def top(s):
    s = s.replace('298本','300本')
    # web-marketing section
    k = s.index('<h2 class="column-section__title">Webマーケ戦略</h2>')
    s = s[:k] + s[k:].replace('57本','58本',1)
    g = s.index('<div class="article-grid">', k); i = s.index('<a class="article-card"', g); i = s.rfind('\n',0,i)+1
    s = s[:i] + C2 + s[i:]
    k = s.index('<h2 class="column-section__title">計測・GA4</h2>')
    s = s[:k] + s[k:].replace('26本','27本',1)
    i = s.index('ga4-search-console-link-guide/">', k); j = s.index('</a>', i)+4
    s = s[:j] + '\n\n' + C1.rstrip('\n') + s[j:]
    return s
rw('column/index.html', top)
def sm(s):
    add = ''.join('  <url>\n    <loc>https://lnx.co.jp/column/%s/%s/</loc>\n    <lastmod>2026-11-05</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n'%(c,sl) for c,sl in [('analytics','gtm-preview-not-connecting'),('web-marketing','website-renewal-inquiries-dropped')])
    return s.replace('</urlset>', add+'</urlset>')
rw('sitemap.xml', sm)
print('done')
