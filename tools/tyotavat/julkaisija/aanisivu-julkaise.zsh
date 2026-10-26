#!/bin/zsh
# Julkaisee /Users/Shared/Claude/aanisivu-sivusto → Cloudflare Pages matkakirja-aanet (Julkaisija 10.10.2026).
# Suoja ensin: julkaisu keskeytyy, ellei Access-sovellus (vain omistajan sähköposti) ole voimassa
# sekä pää- että *.matkakirja-aanet.pages.dev-osoitteille. Julkaisun jälkeen tarkistetaan, että
# kirjautumaton pyyntö saa 302:n Accessiin sekä pääosoitteessa että julkaisun omassa osoitteessa.
set -eu
source ~/.zshrc >/dev/null 2>&1
P=matkakirja-aanet; SUB=$P.pages.dev; S=/Users/Shared/Claude/aanisivu-sivusto
A=https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID
H=(-H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")
curl -s "${H[@]}" "$A/access/apps" | python3 -I -c "
import json,sys
a=[x for x in json.load(sys.stdin)['result'] if x.get('domain')=='$SUB']
assert a, 'Access-sovellus puuttuu'
d={x['uri'] for x in a[0].get('destinations',[])}
assert {'$SUB','*.$SUB'} <= d, d
print('Access ok:', sorted(d))" || { echo "KESKEYTETTY: Access-suoja puuttuu, ei julkaista" >&2; exit 4; }
[ -f $S/index.html ] || { echo "index.html puuttuu" >&2; exit 2; }
export CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID WRANGLER_SEND_METRICS=false CI=true
L=$(mktemp -t aanisivu-julkaise)
npx -y wrangler@4.125.0 pages deploy $S --project-name $P --branch main --commit-dirty=true > $L 2>&1 || { tail -20 $L >&2; exit 5; }
U=$(grep -oE "https://[a-z0-9]+\.$P\.pages\.dev" $L | tail -1)
echo "julkaistu: https://$SUB/ (julkaisun osoite ${U:-?})"
sleep 5
vika=0
for u in https://$SUB/ https://$SUB/index.html ${U:+$U/}; do
  k=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$u")
  case "$k" in "302 https://"*cloudflareaccess.com*) echo "suojattu: $u";; *) echo "SUOJAAMATON: $u → $k" >&2; vika=1;; esac
done
rm -f $L
exit $vika
