# -*- coding: utf-8 -*-
import re, json, sys, os, html
sys.path.insert(0, os.path.dirname(__file__))
from art1 import A1
from art2 import A2
ROOT = os.path.expanduser('~/mnt/corp-site')
TODAY = '2026-11-05'; JP = '2026年11月5日'
def rd(p): return open(os.path.join(ROOT,p),encoding='utf-8').read()
def title_of(p):
    s = rd('column/%s/index.html'%p)
    return re.search(r'<title>(.*?) \| LnX合同会社</title>', s).group(1)
def build(A):
    t = rd('column/%s/index.html'%A['tpl'])
    full = A['title'] + ' | LnX合同会社'
    url = 'https://lnx.co.jp/column/%s/%s/' % (A['cat'], A['slug'])
    d = A['desc']
    t = re.sub(r'<title>.*?</title>', '<title>%s</title>'%full, t, 1)
    t = re.sub(r'<link rel="canonical" href="[^"]*"/>', '<link rel="canonical" href="%s"/>'%url, t, 1)
    t = re.sub(r'(<meta property="og:title" content=")[^"]*', r'\g<1>'+full, t, 1)
    t = re.sub(r'(<meta property="og:description" content=")[^"]*', lambda m: m.group(1)+d, t, 1)
    t = re.sub(r'(<meta property="og:url" content=")[^"]*', lambda m: m.group(1)+url, t, 1)
    t = re.sub(r'(<meta name="twitter:title" content=")[^"]*', r'\g<1>'+full, t, 1)
    t = re.sub(r'(<meta name="twitter:description" content=")[^"]*', lambda m: m.group(1)+d, t, 1)
    t = re.sub(r'<meta content="[^"]*" name="description"\s*/?>', '<meta content="%s" name="description"/>'%d, t, 1)
    assert d in t.split('</head>')[0], 'meta desc not replaced'
    # JSON-LD
    blocks = re.findall(r'<script type="application/ld+json">(.*?)</script>', t, re.S)
    objs = [json.loads(b) for b in blocks]
    out = []
    for o in objs:
        if o['@type']=='Article':
            o['headline']=A['headline']; o['description']=d; o['url']=url
            o['datePublished']=TODAY; o['dateModified']=TODAY
            if 'mainEntityOfPage' in o:
                m=o['mainEntityOfPage']
                if isinstance(m,dict): m['@id']=url
                else: o['mainEntityOfPage']=url
        elif o['@type']=='BreadcrumbList':
            it=o['itemListElement']
            it[2]['name']=A['catname']; it[2]['item']='https://lnx.co.jp/column/%s/'%A['cat']
            it[3]['name']=A['headline']; it[3]['item']=url
        elif o['@type']=='FAQPage':
            o['mainEntity']=[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in A['faq']]
        out.append(o)
    first = t.index('<script type="application/ld+json">'); end = t.index('</head>')
    ld = ''.join('<script type="application/ld+json">%s</script>'%json.dumps(o,ensure_ascii=False,indent=2) for o in out)
    t = t[:first] + ld + t[end:]
    # hero
    hs = t.index('<section class="article-hero">'); he = t.index('</section>', hs)+len('</section>')
    hero = '''<section class="article-hero">
<div class="article-wrap">
<nav class="article-breadcrumb" aria-label="パンくずリスト">
<a href="../../../">TOP</a>
<span class="sep">/</span>
<a href="../../../column/">コラム</a>
<span class="sep">/</span>
<a href="../../../column/%s/">%s</a>
<span class="sep">/</span>
<span class="cur">%s</span>
</nav>
<p class="article-hero__kicker"><span></span>%s</p>
<h1 class="article-hero__title">%s</h1>
<div class="article-hero__meta">
<time datetime="%s">%s</time>
%s
</div>
</div>
</section>''' % (A['cat'],A['catname'],A['headline'],A['catname'],A['h1'],TODAY,JP,''.join('<span class="article-hero__tag">%s</span>'%x for x in A['tags']))
    t = t[:hs]+hero+t[he:]
    # body
    body = A['body']
    h2s = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body)
    h2s_toc = [(i,x) for i,x in h2s]
    toc = '<nav aria-label="目次" class="toc">\n<p class="toc__title">目次</p>\n<ol>\n%s\n</ol>\n</nav>' % ''.join('<li><a href="#%s">%s</a></li>'%(i,x) for i,x in h2s_toc)
    body = body.replace('{{TOC}}', toc)
    faq = '<h2 id="faq">よくある質問</h2>\n<div class="article-faq">\n' + '\n'.join('<details class="article-faq__item"><summary><span class="faq-q-badge">Q</span>%s</summary><div class="article-faq__body"><p>%s</p></div></details>'%(q,a) for q,a in A['faq']) + '\n</div>\n'
    rel = ''.join('<li style="border: 1px solid rgba(15,23,42,.08); border-radius: 12px; padding: 14px 16px; background: rgba(255,255,255,.96);"><a href="https://lnx.co.jp/column/%s/" style="font-size: 14px; font-weight: 700; color: rgba(15,23,42,.80); text-decoration: none;">→ %s</a></li>\n'%(p,title_of(p)) for p in A['related'])
    relb = '''<!-- 関連記事 -->
<div style="border-top: 1px solid rgba(15,23,42,.10); padding-top: 32px; margin-top: 40px;">
<p style="font-size: 13px; font-weight: 800; letter-spacing: .12em; color: var(--soft); margin-bottom: 14px;">関連記事</p>
<ul style="display: grid; gap: 10px; padding: 0; list-style: none; margin: 0;">
%s</ul>
</div>
<!-- 著者 -->
<div class="article-author">
<div class="article-author__icon">🧑‍💻</div>
<div>
<p class="article-author__name">LnX合同会社 編集部</p>
<p class="article-author__bio">中小企業向けのWeb集客・広告運用・SNS運用・AI活用を一気通貫で支援。現場の実務知見をもとに、実践的な情報を発信しています。</p>
</div>
</div>
''' % rel
    bs = t.index('<div class="lead-box">'); be = t.index('</article>')
    t = t[:bs] + body.strip()+'\n\n'+faq+relb + t[be:]
    d_ = os.path.join(ROOT,'column',A['cat'],A['slug']); os.makedirs(d_,exist_ok=True)
    open(os.path.join(d_,'index.html'),'w',encoding='utf-8').write(t)
    print('wrote', d_, len(t))
for A in (A1,A2): build(A)
