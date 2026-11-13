#!/bin/sh
# TOPページ用のCSS結合版（assets/css/top.bundle.css）を作り直す。
# 元のCSSは編集用としてそのまま残し、TOP（index.html）だけが結合版を読む。
# 元ファイルを変更したコミットでは .git/hooks/pre-commit がこのスクリプトを自動で実行する。
# 手動で直した場合も、このスクリプトを実行してから一緒にコミットすること。
set -e
cd "$(git rev-parse --show-toplevel)"
OUT=assets/css/top.bundle.css
{
  echo "@charset \"utf-8\";"
  echo "/* 自動生成ファイル：直接編集しないこと（元ファイルを直して tools/build-top-css.sh を実行） */"
  for f in styles site-v4 top-bg03 top-rope top-motion top-adpick top-renewal; do
    echo ""
    echo "/* ===== $f.css ===== */"
    sed "/^@charset/d" "assets/css/$f.css"
    echo ""
  done
} > "$OUT.tmp"
mv -f "$OUT.tmp" "$OUT"
V=$(git hash-object "$OUT" | cut -c1-8)
sed -i "s#assets/css/top\.bundle\.css?v=[0-9a-z]*#assets/css/top.bundle.css?v=$V#" index.html
echo "built $OUT v=$V"
